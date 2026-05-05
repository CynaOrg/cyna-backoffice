# CYNA Back-Office — Rapport d'Audit Complet

**Date** : 2026-05-05
**Périmètre** : Back-office CYNA (Angular 21) + API gateway/microservices (NestJS) consommés
**Auteur** : Audit automatisé via 9 agents spécialisés (7 QA + 1 code review + 1 security)
**Statut** : Findings consolidés, vérifiés indépendamment, prêts pour correction

---

## Sommaire

1. [Résumé exécutif](#1-résumé-exécutif)
2. [Méthodologie](#2-méthodologie)
3. [Findings sécurité (CRITICAL/HIGH/LOW)](#3-findings-sécurité)
4. [Bugs systémiques (P0)](#4-bugs-systémiques-p0)
5. [Bugs par module](#5-bugs-par-module)
   - [Auth & Account](#51-auth--account)
   - [Products](#52-products)
   - [Categories](#53-categories)
   - [Orders](#54-orders)
   - [Subscriptions](#55-subscriptions)
   - [Customers](#56-customers)
   - [Admins](#57-admins)
   - [Content (CMS)](#58-content-cms)
   - [Messages](#59-messages)
   - [Analytics](#510-analytics)
   - [Dashboard](#511-dashboard)
6. [Bugs transverses (services, core, shared)](#6-bugs-transverses)
7. [Cohérence Front ↔ Back (DTOs)](#7-cohérence-front--back-dtos)
8. [Plan de correction recommandé](#8-plan-de-correction-recommandé)
9. [Annexes](#9-annexes)

---

## 1. Résumé exécutif

### Compte global

| Sévérité | Compte | Impact |
|----------|--------|--------|
| 🚨 **CRITICAL sécurité** | **3** | Privilege escalation, 2FA bypass possible, default credentials |
| ⚠️ **HIGH sécurité** | **6** | CSV injection, JWT non révoqué, vulns deps, etc. |
| 🔴 **P0 fonctionnel** | **14** | Modules entiers cassés |
| 🟠 **P1 fonctionnel** | **27** | UX cassée, données manquantes, fuites mémoire |
| 🟡 **P2 fonctionnel** | **23** | i18n, code mort, mauvais codes HTTP |
| 📌 **LOW sécurité** | **5** | Cookie heuristique, Swagger défaut, PII dans logs |

**Total** : ~78 findings

### Trois problèmes systémiques qui amplifient tous les autres

1. **`NotificationService` est entièrement vide** (no-op) ET `ToastContainerComponent` n'est jamais monté → **aucun feedback utilisateur** sur 100% des actions back-office. Conséquence directe : tous les bugs API (400/409/500) sont silencieux pour l'admin.
2. **`TransformInterceptor` ne reconnaît pas le format de pagination `{data, total, page, limit, totalPages}`** utilisé par plusieurs microservices → enveloppe doublé `{data: {data: [], total, ...}, meta}`. Cause racine de plusieurs listes vides et du crash customer-detail.
3. **Backend non aligné avec le front sur l'autorisation** : le front protège tout par `superAdminGuard`, mais le back utilise seulement `JwtAdminAuthGuard` sur la majorité des endpoints `/admin/*` → un admin "commercial" peut tout faire via curl direct.

### Top 5 corrections à prioriser

1. 🚨 **Aligner `SuperAdminGuard` côté back** sur catalog/orders/subscriptions/analytics/content controllers
2. 🚨 **Remplacer `Math.random()` par `crypto.randomInt()`** pour la génération du code 2FA + ajouter compteur de tentatives
3. 🚨 **Supprimer les fallbacks de credentials** dans `admin-seed.service.ts` + rotation immédiate du password en prod si appliqué
4. 🔴 **Implémenter `NotificationService` + monter `<app-toast-container />`** + HTTP interceptor qui pousse un toast sur tout 4xx/5xx → débloque 80% des frustrations utilisateur
5. 🔴 **Corriger `TransformInterceptor`** pour reconnaître le format `{data, total, page, limit, totalPages}` → résout plusieurs bugs en un (customer-detail crash, orders du client vide, etc.)

---

## 2. Méthodologie

### Équipe d'audit

9 agents spécialisés ont travaillé en parallèle ou en série :

| # | Agent | Mode | Scope |
|---|-------|------|-------|
| 1 | Code review statique | Lecture code Angular | Tous les modules `features/` |
| 2 | API endpoints audit | curl + jq + login 2FA réel | Tous les endpoints admin |
| 3 | Cohérence DTO front↔back | Lecture code | Front services vs back controllers |
| 4 | UI Auth & Account | Playwright MCP | Login, 2FA, logout, guards |
| 5 | UI Products (le plus critique) | Playwright MCP | CRUD physical/SaaS/license |
| 6 | UI Categories+Orders+Subs+Customers | Playwright MCP | Tests fonctionnels |
| 7 | UI Admins+Content+Messages+Analytics+Dashboard | Playwright MCP | Tests fonctionnels |
| 8 | Code reviewer (vérification) | Lecture code | Validation des findings |
| 9 | Security auditor | OWASP Top 10 | Sécurité complète |

### Environnement testé

- Back-office Angular sur `http://localhost:4200`
- API gateway sur `http://localhost:3000/api/v1`
- Microservices NestJS via RabbitMQ (auth, catalog, order, payment, user, notification, content, analytics)
- PostgreSQL 16 + Redis (cache)
- Login super-admin réel : `admin@cyna.io` / `Admin1234!!!` + 2FA récupéré en DB

### Vérification croisée

Les 64 bugs fonctionnels remontés par les 7 agents QA ont été **vérifiés indépendamment** par un 8e agent code-reviewer :
- 25/29 bugs P0/P1 critiques **CONFIRMÉS** code-en-main
- 3 nuances de priorité
- 1 faux positif (#18 top-products `[]` → 500 selon DTO statique, à retester runtime)
- + plusieurs bugs additionnels détectés (cause racine `TransformInterceptor`, etc.)

Le 9e agent security-auditor a découvert **3 critiques + 6 high non remontés** par l'audit fonctionnel.

---

## 3. Findings sécurité

### 🚨 CRITICAL

#### CRITICAL-1 — Privilege escalation : la majorité des endpoints `/admin/*` sont accessibles à un admin "commercial"

- **OWASP** : A01:2021 - Broken Access Control
- **CVSS estimé** : 8.1 (High)
- **Localisation** :
  - `cyna-api/apps/api-gateway/src/catalog/catalog-admin.controller.ts:34` — `@UseGuards(JwtAdminAuthGuard)` au niveau classe
  - `cyna-api/apps/api-gateway/src/orders/order-admin.controller.ts:47`
  - `cyna-api/apps/api-gateway/src/subscriptions/subscription-admin.controller.ts:141`
  - `cyna-api/apps/api-gateway/src/analytics/analytics-admin.controller.ts:10`
  - `cyna-api/apps/api-gateway/src/content/content-admin.controller.ts:28`
- **Description** : Le frontend protège quasi tout par `superAdminGuard` (cf. `app.routes.ts:34, 49, 58, 67…`) mais le backend n'utilise que `JwtAdminAuthGuard`. Un admin avec rôle `commercial` peut donc, en appelant directement l'API :
  - Créer / modifier / supprimer n'importe quel produit, service, licence
  - Modifier les prix et stocks
  - Lister/voir TOUTES les commandes (factures, données clients) et abonnements
  - Voir TOUTES les KPIs financières/MRR via `/admin/analytics/*`
- **Impact** : Un commercial compromis (phishing, leak password) peut détruire le catalogue, fuiter toutes les données financières, modifier les prix.
- **Fix** : Soit aligner le backend (`@UseGuards(SuperAdminGuard)` au niveau classe sur les controllers concernés), soit créer un `RoleGuard` granulaire et l'appliquer méthode par méthode. **Le frontend gating ne remplace JAMAIS l'autorisation backend.**

#### CRITICAL-2 — Code 2FA généré avec `Math.random()` (PRNG non cryptographique) + pas de compteur de tentatives

- **OWASP** : A02:2021 - Cryptographic Failures + A07:2021 - Identification and Authentication Failures
- **CVSS estimé** : 7.5 (High)
- **Localisation** : `cyna-api/apps/auth-service/src/services/two-factor.service.ts:19-21`
  ```ts
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  ```
- **Description** : `Math.random()` dans Node.js (V8) n'est PAS cryptographiquement sûr. Avec un seed récupérable (timing, fuites d'autres outputs `Math.random` dans la même session), un attaquant peut prédire le prochain code 2FA. Couplé au manque de compteur d'échecs sur `validateCode()` (ligne 40-61) : seul le throttler API limite à 5 req/min/IP. Avec un botnet → 1M codes possibles, fenêtre 5 minutes.
- **Impact** : Bypass 2FA admin si l'attaquant a déjà le mot de passe (data breach, phishing).
- **Fix** :
  1. Remplacer par `crypto.randomInt(100000, 1000000).toString()` (`import * as crypto from 'crypto'`)
  2. Ajouter `attempts: number` sur l'entité `Admin2FACode`, l'incrémenter à chaque appel échoué de `validateCode`, bloquer après 5 tentatives, supprimer le code
  3. Idéalement, rate-limit par adminId (pas seulement IP)

#### CRITICAL-3 — Default super-admin credentials hardcodées dans le code source

- **OWASP** : A07:2021 - Identification and Authentication Failures
- **CVSS estimé** : 7.2 (High) si `ADMIN_SEED_ENABLED=true` en prod sans override
- **Localisation** : `cyna-api/apps/auth-service/src/seeds/admin-seed.service.ts:30-33`
  ```ts
  const email = process.env.ADMIN_SEED_EMAIL || 'ilies.mahoudeau@icloud.com';
  const password = process.env.ADMIN_SEED_PASSWORD || 'Test1234!!!';
  ```
- **Description** : Si `ADMIN_SEED_ENABLED=true` est posé en prod (Railway dashboard) et `ADMIN_SEED_PASSWORD` n'est pas défini, le service crée un super-admin avec un mot de passe public connu. Le password apparaît aussi dans Git history.
- **Impact** : Compromission totale de la plateforme.
- **Fix** :
  1. Supprimer les fallbacks (`|| '...'`) ; logger une erreur fatale et `process.exit(1)` si les variables ne sont pas définies
  2. Rotate immédiatement le password de ce compte si déjà utilisé en prod
  3. Vérifier que `ADMIN_SEED_*` n'est pas dans le `.env` committé

### ⚠️ HIGH

#### HIGH-1 — CSV injection (formula injection) sur les exports analytics

- **OWASP** : A03:2021 - Injection · CVSS : 6.5
- **Localisation** : `cyna-api/apps/api-gateway/src/analytics/analytics-admin.controller.ts:83-120`
- **Description** : Les exports CSV (sales, orders, subscriptions) renvoient des données utilisateurs (noms d'entreprise, emails, descriptions) sans préfixe d'échappement. Si une valeur commence par `=`, `+`, `-`, `@`, Excel/LibreOffice exécutera la formule à l'ouverture (DDE, exfiltration, RCE Excel).
- **Impact** : Un client B2B malicieux qui s'inscrit avec `companyName = "=cmd|'/c calc'!A1"` puis qu'un admin exporte → RCE sur le poste de l'admin.
- **Fix** : Préfixer toute cellule commençant par `=`, `+`, `-`, `@` avec `'`.

#### HIGH-2 — JWT non révoqué après désactivation/suppression d'admin

- **OWASP** : A07:2021 · CVSS : 6.0
- **Localisation** : `cyna-api/apps/api-gateway/src/auth/guards/jwt-auth.guard.ts:35-50`
- **Description** : `JwtAuthGuard` valide uniquement la signature JWT — il ne vérifie ni `Admin.isActive` ni la suppression soft. Quand un super-admin désactive ou supprime un admin compromis, l'admin garde un access valide jusqu'à expiration du JWT (15 min par défaut).
- **Impact** : Fenêtre de 15 minutes pour un admin compromis/désactivé.
- **Fix** : Soit baisser la TTL à 5 min, soit ajouter une JTI + cache Redis "revoked", soit recharger l'admin dans le guard.

#### HIGH-3 — Vulnérabilités de dépendances connues

- **OWASP** : A06:2021 · CVSS cumulé : 7.5
- **Localisation** :
  - `cyna-api` — `npm audit` : 34 vulnérabilités (1 critical, 17 high, 15 moderate, 1 low)
  - `cyna-backoffice` — `npm audit` : 26 vulnérabilités (19 high, 7 moderate)
- **Détails** : undici (HTTP smuggling, CRLF injection), tar (path traversal), vite (path traversal arbitrary file read).
- **Fix** : `npm audit fix` puis tester. Pour breaking changes (bcrypt 6, uuid 14), planifier upgrade. Au minimum : undici ≥ 7.24, tar ≥ 7, vite ≥ 7.4.

#### HIGH-4 — Validation manquante sur les `productIds` de top-services / top-products

- **OWASP** : A04:2021 · CVSS : 5.3
- **Localisation** : `cyna-api/apps/content-service/src/services/top-products.service.ts:93-135`
- **Description** : `updateTopServices(dto)` enregistre `dto.productIds` sans vérifier que les UUIDs existent ou sont du bon `productType`. Le `resolveProductDetails` (ligne 137) avale les erreurs avec un try/catch silencieux.
- **Impact** : Défacement homepage, divulgation indirecte des produits supprimés (timing).
- **Fix** : Avant save, faire un `MESSAGE_PATTERNS.CATALOG.PRODUCTS_FIND_BY_IDS` et vérifier que tous existent + bon type.

#### HIGH-5 — NotificationService no-op masque les erreurs critiques côté admin

- **OWASP** : A09:2021 · CVSS : 5.0
- **Localisation** : `cyna-backoffice/src/app/core/services/notification.service.ts:14-18`
- **Description** : Toutes les méthodes du NotificationService sont vides — aucun toast n'est jamais affiché. L'`errorInterceptor` appelle `notifications.error('Access denied')` sur 403, mais rien n'apparaît à l'écran.
- **Impact** :
  1. Un admin ne sait pas qu'une opération sensible a échoué silencieusement
  2. Couvre des indicateurs d'attaques (403 systématiques)
  3. Un attaquant exploitant une session admin (XSS, supply-chain) ne déclenche aucun feedback visuel
- **Fix** : Implémenter réellement les méthodes (push dans `toasts` signal) — le `ToastContainerComponent` est déjà prêt à les afficher.

#### HIGH-6 — Pas de validation du `mimeType` côté `confirmUpload`

- **OWASP** : A04:2021 · CVSS : 5.0
- **Localisation** : `cyna-api/apps/catalog-service/src/dto/image/confirm-upload.dto.ts:38-40`
- **Description** : `RequestUploadUrlDto.contentType` est correctement contraint à `image/jpeg|png|webp`, MAIS `ConfirmUploadDto.mimeType` est seulement `@IsString()` sans `@IsIn(...)`.
- **Impact** : Stored XSS si `mimeType: text/html` est servi par l'app cliente sans Content-Type override.
- **Fix** : Ajouter `@IsIn(['image/jpeg', 'image/png', 'image/webp'])` sur `ConfirmUploadDto.mimeType`.

### 📌 LOW

| # | Titre | Localisation |
|---|-------|--------------|
| LOW-1 | Cookie `secure` flag dépend d'une heuristique fragile | `admin-auth.controller.ts:21-22` |
| LOW-2 | Swagger activé par défaut dans `.env.example` | `cyna-api/.env.example:11` |
| LOW-3 | Logs PII (emails admin) dans les logs structurés | `admin-auth.service.ts:77,150,218,276,423` |
| LOW-4 | Endpoints catalog admin sans `ParseUUIDPipe` (incohérence + 500) | `catalog-admin.controller.ts:127,137,146,…` |
| LOW-5 | `forgot-password` admin absent + pas de procédure documentée | `admin-auth.controller.ts` |

### ✅ Ce qui est bien fait (pour rappel rassurant)

- Bcrypt cost 12 ✓
- Refresh token HTTP-only + SameSite=Strict ✓
- ValidationPipe global avec `forbidNonWhitelisted` ✓
- Helmet + CORS configurés ✓
- Stripe webhook signature vérifiée + raw body préservé ✓
- Soft-delete admin (login bloqué après) ✓
- Aucun `localStorage`/`innerHTML` ✓
- Presigned URLs S3 scopées server-side (pas de SSRF) ✓
- Carrousel `@IsUrl()` rejette `javascript:` ✓
- API renvoie bien des entités sans `password_hash` ✓

---

## 4. Bugs systémiques (P0)

### SYS-1 — `NotificationService` no-op + `ToastContainerComponent` jamais monté

- **Fichiers** : `cyna-backoffice/src/app/core/services/notification.service.ts:14-18`, `app.html`, `admin-layout.component.ts`
- **Code actuel** :
  ```ts
  success(_message: string, _duration = 3000) {}
  error(_message: string, _duration = 5000) {}
  warning(_message: string, _duration = 4000) {}
  info(_message: string, _duration = 3000) {}
  dismiss() {}
  ```
- **Conséquence** : tous les `notifications.success(…)` et `notifications.error(…)` à travers tous les composants sont silencieux. Aucun feedback dans toute l'app.
- **Fix** : implémenter les méthodes (push dans signal `toasts`, auto-dismiss) + ajouter `<app-toast-container />` dans `admin-layout.component.ts`.

### SYS-2 — `TransformInterceptor` casse la pagination

- **Fichier** : `cyna-api/libs/common/src/interceptors/transform.interceptor.ts:42-67`
- **Description** : ne reconnaît pas le format `{data, total, page, limit, totalPages}` (utilisé par `order.service.ts:419-425` et probablement d'autres) → wrapping en `{data: {data: [], total, …}, meta}`.
- **Conséquence directe** : le front doit faire `r.data.data` partout. Cause racine de plusieurs listes vides et du crash customer-detail.
- **Fix** : détecter la forme `{data, total, page, limit, totalPages}` (5 clés caractéristiques) et la traiter comme déjà paginée. Alternative : aligner les microservices sur `{data, pagination: {…}}`.

### SYS-3 — Pas de `ParseUUIDPipe` sur la majorité des controllers admin

- **Fichiers** : `catalog-admin.controller.ts`, `user-admin.controller.ts`, `order-admin.controller.ts`, `subscription-admin.controller.ts`, `content-admin.controller.ts`, `admin-management.controller.ts`
- **Conséquence** : tout id mal formé déclenche **500** (devrait être 400). Pas exploitable en injection (TypeORM paramétré) mais fuite stack trace possible et bug fonctionnel.
- **Fix** : `@Param('id', ParseUUIDPipe)` partout.

### SYS-4 — Privilege escalation côté backend

Cf. CRITICAL-1 ci-dessus. Aligner `SuperAdminGuard` côté back avec ce que fait le front.

---

## 5. Bugs par module

### 5.1 Auth & Account

#### Cas qui marchent
- Login + 2FA + logout + guards fonctionnels
- Rate limiting backend actif (5 req/min)
- Refresh token en cookie HTTP-only + SameSite=Strict
- Cookie de session bien invalidé au logout

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| AUTH-1 | P1 | Page `/account` est un placeholder ("Coming soon") — impossible de modifier profil / password / 2FA | `features/account/account.component.ts:1-30` |
| AUTH-2 | P1 | Messages backend en anglais affichés bruts ("Invalid credentials") sur UI FR | `features/auth/login/login.component.ts:136` |
| AUTH-3 | P1 | 429 (rate-limit) affiché comme "Invalid credentials" — l'admin ne sait pas qu'il est bloqué | `login.component.ts` |
| AUTH-4 | P0 | `cooldownInterval` du verify-2fa **jamais clear sur destroy** → fuite mémoire | `features/auth/verify-2fa/verify-2fa.component.ts:118-244` |
| AUTH-5 | P1 | 401 systématique sur `/refresh-token` au boot quand pas de session — pollue la console | `core/auth/services/admin-auth.service.ts:103-105` |
| AUTH-6 | P1 | Pas d'indicateur de loading pendant submit login → doubles-clics → rate-limit prématuré | `login.component.ts` |
| AUTH-7 | P2 | Pas de toggle de langue FR/EN | global |
| AUTH-8 | P2 | Pas de lien "Mot de passe oublié" | `login.component.ts` |
| AUTH-9 | P1 | Refresh sur `/verify-2fa` perd le tempToken → redirection vers login sans message | `verify-2fa.component.ts:134-140` |

### 5.2 Products

> Module le plus critique selon l'utilisateur — confirmé : 13 bugs dont 5 P0.

#### Cas qui marchent
- Création valide retourne 201 et redirige vers la fiche détail
- Validation serveur OK (400 si prix négatif, nom > 200 chars, etc.) — mais silencieuse côté UI
- Caractères spéciaux, accents, apostrophes, emojis, multi-line — tous stockés correctement (UTF-8 OK)
- Format prix locale FR (`9 999 999,99 €`)
- Stock affiché avec progress bar et "En rupture" si quantity=0

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| PROD-1 | P0 | Liste affiche **SKU only**, pas le nom (front lit `nameFr`, API renvoie `name`) | `product-list.component.ts:380,409,412` ↔ `catalog-service/dto/product/product-response.dto.ts:42-58` |
| PROD-2 | P0 | Crash JS au filtre de recherche : `TypeError: Cannot read 'toLowerCase' of undefined` | `product-list.component.ts:647-648` |
| PROD-3 | P0 | Liste obsolète après create/delete (pas de re-fetch sur navigation) | `product-list.component.ts:608-622` |
| PROD-4 | P0 | Validation 400 silencieuse en create/edit (prix négatif, soumission vide) | `product-form.component.ts:743-771` |
| PROD-5 | P0 | GET `/products/:invalidUuid` → **500** (pas de `ParseUUIDPipe`) | `catalog-admin.controller.ts:127` |
| PROD-6 | P1 | Type par défaut en create est toujours "SaaS" même sur `/products/new` ou `/licences/new` → l'admin crée du mauvais type | `product-form.component.ts:634` |
| PROD-7 | P1 | Pas de garde route par productType : `/products/:id` accepte un id de SaaS et l'inverse | `app.routes.ts` |
| PROD-8 | P1 | Edit envoie le formulaire **complet** au lieu d'un delta → écrase potentiellement des champs | `product-form.component.ts:743-771` |
| PROD-9 | P1 | Pas d'upload d'image en **création** (uniquement en edit) | `product-form.component.ts` |
| PROD-10 | P1 | Hard delete au lieu de soft delete (la colonne `deleted_at` existe mais inutilisée) | `apps/catalog-service` |
| PROD-11 | P1 | Modale delete : `Êtes-vous sûr de vouloir supprimer {{name}} ?` — placeholder Angular **non interpolé** dans certains cas (template ou key i18n) | `product-list.component.ts:542`, `product-detail.component.ts:529` |
| PROD-12 | P2 | Pas de pagination ni filtres catégorie/status/prix (l'API les supporte) | `product-list.component.ts` |
| PROD-13 | P2 | Pluriel cassé : "1 résultats" | `product-list.component.ts:480-481` |
| PROD-14 | P2 | Empty state non type-aware ("Aucun produit" sur `/services` et `/licences`) | `product-list.component.ts` |
| PROD-15 | P2 | Asymétrie shape : POST/PATCH renvoie `{name}`, GET renvoie `{nameFr, nameEn}` — force un reload après save | `apps/catalog-service` |
| PROD-16 | P2 | `searchTimeout: any` non typé et jamais clear sur destroy | `product-list.component.ts:606` |

### 5.3 Categories

#### Cas qui marchent
- CRUD complet fonctionnel, reorder OK, modal de confirm OK
- Hiérarchie / displayOrder respectés
- DELETE 200 OK

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| CAT-1 | P1 | Soumission vide ou slug invalide → 400 silencieux (pas de validation client, pas de toast) | `category-list.component.ts:223-226,344-357` |
| CAT-2 | P1 | UUID invalide (`abc`) → **500** sur PATCH/DELETE | API gateway categories |
| CAT-3 | P1 | Vidage de description (`""`) ne se propage pas — impossible de "supprimer" une description | `category-list.component.ts:480-494` |
| CAT-4 | P2 | Pas de colonne "count produits" | `category-list.component.ts` |
| CAT-5 | P2 | Checkbox "Active" sans label `for=` → accessibilité | `category-list.component.ts:288` |

### 5.4 Orders

#### Cas qui marchent
- Liste, filtres (status/date/type), detail fonctionnels
- Update status + tracking + notes admin OK
- Format monétaire et date FR OK

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| ORD-1 | P1 | Colonne **Client = UUID brut** au lieu d'email/nom (back ne dénormalise pas) | `order-list.component.ts:145` |
| ORD-2 | P1 | Detail : section Client vide (`ID :: <uuid>` seulement) | `order-detail.component.ts` |
| ORD-3 | P0 | Recherche **sans debounce** (1 requête / touche) | `order-list.component.ts:31` |
| ORD-4 | P1 | GET `/orders/invalidId` → **500** (pas de `ParseUUIDPipe`) | `order-admin.controller.ts:70,86` |
| ORD-5 | P1 | `loading` jamais reset à `false` en cas d'erreur dans `loadOrder()` → spinner infini | `order-detail.component.ts:298-334` |
| ORD-6 | P2 | Pagination limit hardcodé `20`, pas de tri colonnes | `order-list.component.ts:171-176` |
| ORD-7 | P2 | `trackingUrl` validé `@IsUrl({ require_tld: true })` → refuse `localhost`/IPs | `update-order-status.dto.ts:29` |
| ORD-8 | P1 | Message d'erreur en anglais hardcodé `'Failed to load orders'` | `order-list.component.ts:217` |

### 5.5 Subscriptions

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| SUB-1 | P0 | PATCH `/subscriptions/:id/status` avec **action invalide** ou **id inconnu** → **500** (pas de validation enum, pas de 404) | `subscription-admin.controller.ts:89-93` |
| SUB-2 | P0 | Filtres + pagination silencieusement **ignorés** (mismatch `admin: true` vs `adminMode`) | `subscription-admin.controller.ts:155-158` ↔ `payment.controller.ts:64-69` |
| SUB-3 | P0 | Liste affiche **UUID userId / productId** au lieu de noms | `subscription-list.component.ts:103,106` |
| SUB-4 | P1 | Status `past_due`/`unpaid` → aucun bouton d'action | `subscription-list.component.ts:129-143` |
| SUB-5 | P1 | DTO accepte `pause` mais le contrôleur fait toujours `REACTIVATE` (mapping cassé) | `subscription-admin.controller.ts:184-188` |
| SUB-6 | P1 | Save modale Terms sans changement → erreur "TERMS_UPDATE_FAILED" trompeuse | `subscription-list.component.ts:338-360` |
| SUB-7 | P2 | `cancelAtPeriodEnd: false` envoyé en dur sur cancel — admin ne peut jamais annuler en fin de période | `subscription-admin.controller.ts:191` |

### 5.6 Customers

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| CUS-1 | P0 | Page detail crashe : `TypeError: newCollection[Symbol.iterator] is not a function` (shape orders mismatch — cf SYS-2) | `customer-detail.component.ts:227` |
| CUS-2 | P0 | Filtre `?status=inactive` → **400** (gateway DTO ne whiteliste pas) | `user-admin.controller.ts:30-49` ↔ `customer-list.component.ts:311` |
| CUS-3 | P1 | Historique commandes vide alors qu'il existe des commandes (cause = SYS-2) | `customer-detail.component.ts:225-237` |
| CUS-4 | P2 | Bouton "Modifier" pointe vers même URL que "Voir" (page edit n'existe pas) | `customer-list.component.ts:227-233` |
| CUS-5 | P2 | Toggle activation : badge statut ne se rafraîchit pas (UI désynchronisée) | `customer-detail.component.ts` |
| CUS-6 | P1 | `loadUser` ne reset pas `loading` à `false` en error | `customer-detail.component.ts:212-223` |

### 5.7 Admins

#### Cas qui marchent
- CRUD complet fonctionnel (create, edit, toggle active, delete avec soft-delete)
- Backend protège bien le "delete self" (400 avec `CANNOT_DELETE_SELF`)
- Email disabled en edit (bonne pratique)

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| ADM-1 | P1 | Bouton "Supprimer" affiché sur **son propre compte** (pas de garde-fou UI) | `admin-list.component.ts:120-124` |
| ADM-2 | P1 | Erreurs 409 (email déjà pris) et 400 (delete self) **non remontées** à l'utilisateur — modale se ferme silencieusement | `admin-list.component.ts:680-722` |
| ADM-3 | P1 | UUID invalide → 500 | `admin-management.controller.ts:89,105,122` |
| ADM-4 | P1 | `updateAdmin` envoie `firstName, lastName, role` mais PAS `isActive` → impossible de réactiver via le formulaire d'édition (uniquement via le toggle) | `admin-list.component.ts:680-701` |

### 5.8 Content (CMS)

> Module le plus impacté par les mismatchs front/back — 4 bugs P0.

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| CONT-1 | P0 | **Carrousel inutilisable** : 400 sur create/edit (mismatch `buttonText*`/`linkText*`) | `content.component.ts:583-593` ↔ `create-slide.dto.ts:30-42` |
| CONT-2 | P0 | **Top-products PATCH avec `productIds:[]` → 500** (impossible de vider la sélection) — *à retester runtime, code statique semble OK* | `top-products.service.ts:115-135` |
| CONT-3 | P0 | GET `/admin/content/{hero-text,top-services,top-products}` → **404** (routes absentes — back n'a que PATCH) | `content-admin.controller.ts:90-112` |
| CONT-4 | P1 | PATCH `/hero-text` exige `titleFr` + `subtitleFr` non-optionnels → update partiel impossible | `update-hero-text.dto.ts:6-22` |
| CONT-5 | P2 | Carrousel `linkUrl` exige une URL absolue (`@IsUrl()`) — frontend construit des liens relatifs | `create-slide.dto.ts` |
| CONT-6 | P1 | Pas de pagination dans `loadProducts(type)` du product-picker → si > 1000 produits, perf catastrophique | `product-picker.component.ts:283-296` |
| CONT-7 | P2 | `confirmLabel="Delete"` hardcodé en anglais dans la modale | `content.component.ts:535` |
| CONT-8 | P2 | Erreurs upload (mauvais type, fichier trop gros) affichent `CONTENT.UPLOAD_FAILED` au lieu de messages spécifiques | `content.component.ts:820,825` |

### 5.9 Messages

#### Cas qui marchent
- List, expand, mark as read, archive/restore, delete — tout fonctionne
- 2 onglets Boîte/Archivés avec compteurs

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| MSG-1 | P2 | Pas de bouton "Marquer comme non lu" (action inverse manquante) | `messages.component.ts` |
| MSG-2 | P2 | Pas d'UI pour `isProcessed` (champ existe en DB) | `messages.component.ts` |
| MSG-3 | P2 | Bouton confirmation "Delete" en anglais hardcodé | `messages.component.ts:241` |
| MSG-4 | P1 | Aucune indication "loading" pour `markRead`/`archive`/`restore` (pas d'optimistic update) | `messages.component.ts` |

### 5.10 Analytics

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| ANA-1 | P0 | Period=`today` → **500 sur 4 endpoints** (sales/sales-by-cat/sales-by-type/avg-cart-by-type) — `SalesPeriod` enum n'inclut pas `today` mais `DashboardPeriod` oui | `cyna-api/apps/analytics-service/src/dto/sales-query.dto.ts:3-8` |
| ANA-2 | P0 | Route `/analytics` sans `superAdminGuard` (incohérent avec les autres) — fuite de données aux comptes commercial | `app.routes.ts:202-206` |
| ANA-3 | P1 | Charts `salesChart`, etc. **jamais détruits** sur `ngOnDestroy` → fuite mémoire Chart.js | `analytics.component.ts:465-469` |
| ANA-4 | P1 | GET export CSV sans params → 500 (devrait être 400) | `analytics-admin.controller.ts:83-120` |
| ANA-5 | P2 | Messages d'erreur enum vides (`"period must be one of:"` sans valeurs) | `sales-query.dto.ts`, `dashboard-query.dto.ts` |
| ANA-6 | P2 | Date export accepte dates invalides | `export-query.dto.ts` |
| ANA-7 | P2 | `getDefaultDateFrom()` figé à l'instanciation → dates obsolètes si page reste ouverte plusieurs jours | `analytics.component.ts:917-923` |
| ANA-8 | P2 | `label: 'Revenue'` hardcodé en anglais (label Chart.js) | `analytics.component.ts:716` |

### 5.11 Dashboard

#### Cas qui marchent
- KPIs et widgets fonctionnels
- Toutes les requêtes back en 200

#### Bugs

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| DASH-1 | P1 | Recompte `unread messages` côté front en chargeant TOUTE la liste (devrait être un endpoint count dédié) | `dashboard.component.ts:391-394` |
| DASH-2 | P2 | Target revenue hardcodé à `100000 €` | `dashboard.component.ts:329` |
| DASH-3 | P1 | `avgCartValue` et `conversionRate` fetchés même quand pas affichés (super_admin) | `dashboard.component.ts:358-359` |

---

## 6. Bugs transverses

### Services & Core

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| TRA-1 | P0 | `NotificationService` méthodes vides | `core/services/notification.service.ts:14-18` |
| TRA-2 | P0 | `ToastContainerComponent` jamais monté nulle part | `shared/components/toast-container/`, `app.html` |
| TRA-3 | P1 | `error.interceptor.ts` ne gère ni 401 ni 4xx génériques (juste 0/403/500/503) — un 401 (token expiré) ne déclenche pas le refresh | `core/auth/interceptors/error.interceptor.ts:11-19` |
| TRA-4 | P1 | Messages d'erreur **hardcodés en anglais** dans error.interceptor (`'Unable to connect to server'`, `'Access denied'`, etc.) | `error.interceptor.ts:11-19` |
| TRA-5 | P1 | `auth.interceptor.ts` : pas de gestion de race condition si plusieurs requêtes simultanées font 401 — N refresh tokens en parallèle | `core/auth/interceptors/auth.interceptor.ts:32-44` |
| TRA-6 | P2 | `api.service.ts` n'expose aucun timeout/retry HTTP | `core/services/api.service.ts:24-71` |
| TRA-7 | P1 | `api.service.get<T>` unwrappe `r.data` → certains callers font des fallbacks (`Array.isArray(res) ? res : res?.data`). Inconsistance source de bugs. | `api.service.ts:24-28` |

### Shared components

| # | Sévérité | Bug | Fichier:ligne |
|---|----------|-----|---------------|
| SHD-1 | P0 | Pagination en anglais hardcodé (`Showing`, `Previous`, `Next`) | `shared/components/pagination/pagination.component.ts:9,18,42` |
| SHD-2 | P2 | Confirm modal defaults français hardcodés (`'Confirmer'`, `'Etes-vous sur ?'`) | `shared/components/confirm-modal/confirm-modal.component.ts:104-107` |
| SHD-3 | P1 | `image-upload.component.ts` : strings en français hardcodés (10 messages) | `shared/components/image-upload/image-upload.component.ts:55-148` |
| SHD-4 | P1 | `status-badge.component.ts` : fallback `status.replace(/_/g, ' ')` → texte brut comme "past due", "out of stock" non traduit | `shared/components/status-badge/status-badge.component.ts:20` |
| SHD-5 | P2 | `DataTableComponent` exporté mais **jamais importé/utilisé** — code mort | `shared/components/data-table/`, `shared/components/index.ts:6` |

---

## 7. Cohérence Front ↔ Back (DTOs)

**8 divergences P0 + 6 P1 + 5 P2** identifiées par l'agent dédié.

### Top mismatchs (P0)

| # | Endpoint | Bug |
|---|----------|-----|
| DTO-1 | `POST /admin/content/carousel` | Front envoie `buttonTextFr/En/buttonLink`, back attend `linkTextFr/En/linkUrl` → **400 silencieux** |
| DTO-2 | `GET /admin/content/{top-services,top-products,hero-text}` | Endpoints absents côté admin (PATCH only) → **404** silencieux |
| DTO-3 | `PATCH /admin/content/hero-text` | Back exige `titleFr`/`subtitleFr` non-optionnels → update partiel impossible |
| DTO-4 | `GET /admin/catalog/products` | Back retourne `name/primaryImageUrl`, front lit `nameFr/nameEn/images[]` → liste cassée |
| DTO-5 | `GET /admin/users?status=active` | Back DTO ne whiteliste pas `status` → 400 |
| DTO-6 | `GET /admin/payments/subscriptions` | Gateway envoie `{ admin: true }`, payment-service lit `adminMode` → filtres ignorés |
| DTO-7 | `GET /admin/users/:id/orders` | Back retourne `{data, total, page, limit, totalPages}`, front consume comme array → liste vide |

### Endpoints manquants côté API (front les appelle)

1. `GET /api/v1/admin/content/top-services` — back n'a que PATCH
2. `GET /api/v1/admin/content/top-products` — back n'a que PATCH
3. `GET /api/v1/admin/content/hero-text` — back n'a que PATCH

---

## 8. Plan de correction recommandé

### 🚨 Sprint 0 — Sécurité (à faire AVANT tout le reste, ~1 jour)

| Action | Fichier(s) |
|--------|-----------|
| Aligner `SuperAdminGuard` côté back sur catalog/orders/subscriptions/analytics/content controllers | `cyna-api/apps/api-gateway/src/{catalog,orders,subscriptions,analytics,content}/*-admin.controller.ts` |
| `crypto.randomInt(100000, 1000000)` + counter `attempts` pour le 2FA | `cyna-api/apps/auth-service/src/services/two-factor.service.ts:19-21,40-61` |
| Supprimer les fallbacks de seed + rotation password en prod si appliqué | `cyna-api/apps/auth-service/src/seeds/admin-seed.service.ts:30-33` |
| Échapper les CSV exports (préfixe `'` sur `=+-@`) | `cyna-api/apps/api-gateway/src/analytics/...` |
| `npm audit fix` sur les 2 repos | `cyna-api/`, `cyna-backoffice/` |
| `@IsIn(['image/jpeg','image/png','image/webp'])` sur `ConfirmUploadDto.mimeType` | `cyna-api/apps/catalog-service/src/dto/image/confirm-upload.dto.ts:38` |

### 🔴 Sprint 1 — Débloquer l'app (~2-3 jours)

1. **Implémenter `NotificationService`** + monter `<app-toast-container />` dans `admin-layout` + HTTP interceptor qui pousse un toast d'erreur sur tout 4xx/5xx
2. **Corriger `TransformInterceptor`** pour reconnaître `{data, total, page, limit, totalPages}` (cause racine de plusieurs bugs)
3. **Ajouter `ParseUUIDPipe`** dans tous les contrôleurs `@Param('id')` admin
4. **Aligner les noms de champs Carrousel** (choisir `linkText*`/`linkUrl` côté back ou front)
5. **Ajouter les `@Get('hero-text' | 'top-services' | 'top-products')`** dans `ContentAdminController`
6. **Rendre `UpdateHeroTextDto` entièrement optionnel** (`@IsOptional()` partout)

### 🔴 Sprint 2 — Corriger Products (le module le plus critique)

1. **`ProductListResponseDto` doit exposer `nameFr/nameEn` + `images[]`** côté admin (ou créer un `AdminProductListResponseDto`)
2. **Re-fetch sur navigation** dans `product-list.component.ts` (effect sur route changes)
3. **Nettoyer le payload** dans `product-form.onSubmit()` selon `productType`
4. **Pré-régler et verrouiller `productType`** selon la route
5. **Ajouter une garde route par productType** sur `/products/:id`, `/services/:id`, `/licences/:id`
6. **Soft delete** : utiliser `deleted_at` au lieu du hard delete
7. Ajouter `if (!product.name)` dans le filter pour éviter le crash
8. Ajouter `@IsEnum` à `UpdateSubscriptionStatusDto.action` + 404 propre côté `subscription-admin.controller`

### 🟠 Sprint 3 — Bugs résiduels

1. Customer-detail : utiliser `api.get<{data:Order[];total:number}>(...)` puis lire `.data`
2. Customer filter `status` → traduire `active/inactive` en `isActive=true/false` côté front + ajouter au DTO gateway
3. Subscriptions : renommer `admin` → `adminMode` dans `subscription-admin.controller.ts:155` + propager `query`
4. Analytics : ajouter `today` à l'enum `SalesPeriod`
5. Order/Subscription : dénormaliser `customerEmail`/`productName` dans les DTOs admin
6. Cleanup mémoire : `ngOnDestroy` qui clear l'interval cooldown 2FA + destroy les charts Analytics
7. Implémenter ou retirer `account.component.ts` (placeholder actuellement)
8. Pagination i18n : `Showing/Previous/Next` → clés FR
9. Recherche orders avec debounce
10. Validation client + toast sur catégories
11. Bouton "Marquer comme non lu" + UI `isProcessed` dans Messages

### 🟡 Sprint 4 — Nettoyage / Hygiène

- Strings i18n hardcodés (pagination, image-upload, confirm-modal, status-badge, error.interceptor)
- Code mort : `DataTableComponent`, `analytics.onPeriodChange`, `kpi-card.iconBgClass/iconClass`
- Messages d'erreur enum complets (analytics)
- Validation date format export
- Forgot password admin

---

## 9. Annexes

### Fichiers les plus impactés (à cibler en priorité)

**Front-office Angular** :
- `cyna-backoffice/src/app/core/services/notification.service.ts` ⭐ critique
- `cyna-backoffice/src/app/core/services/api.service.ts`
- `cyna-backoffice/src/app/core/auth/interceptors/error.interceptor.ts`
- `cyna-backoffice/src/app/features/products/product-list/product-list.component.ts`
- `cyna-backoffice/src/app/features/products/product-form/product-form.component.ts`
- `cyna-backoffice/src/app/features/customers/customer-detail/customer-detail.component.ts`
- `cyna-backoffice/src/app/features/analytics/analytics.component.ts`
- `cyna-backoffice/src/app/features/auth/verify-2fa/verify-2fa.component.ts`
- `cyna-backoffice/src/app/features/content/content.component.ts`
- `cyna-backoffice/src/app/app.routes.ts`
- `cyna-backoffice/src/app/shared/components/pagination/pagination.component.ts`

**Backend NestJS** :
- `cyna-api/libs/common/src/interceptors/transform.interceptor.ts` ⭐ critique
- `cyna-api/apps/api-gateway/src/catalog/catalog-admin.controller.ts`
- `cyna-api/apps/api-gateway/src/users/user-admin.controller.ts`
- `cyna-api/apps/api-gateway/src/subscriptions/subscription-admin.controller.ts`
- `cyna-api/apps/api-gateway/src/content/content-admin.controller.ts`
- `cyna-api/apps/api-gateway/src/content/dto/update-hero-text.dto.ts`
- `cyna-api/apps/api-gateway/src/content/dto/create-slide.dto.ts`
- `cyna-api/apps/payment-service/src/controllers/payment.controller.ts`
- `cyna-api/apps/analytics-service/src/dto/sales-query.dto.ts`
- `cyna-api/apps/catalog-service/src/dto/product/product-response.dto.ts`
- `cyna-api/apps/order-service/src/services/order.service.ts`
- `cyna-api/apps/auth-service/src/services/two-factor.service.ts` ⭐ sécurité
- `cyna-api/apps/auth-service/src/seeds/admin-seed.service.ts` ⭐ sécurité

### Conventions de l'audit

- **P0** : module entièrement cassé ou fonctionnalité bloquée
- **P1** : UX cassée, données incorrectes, fuite mémoire, mais l'app reste utilisable
- **P2** : i18n, code mort, mauvais codes HTTP, micro-UX
- **CRITICAL/HIGH/LOW** : sévérité OWASP/CVSS
- **SYS-N** : bug systémique transverse à plusieurs modules
- **PROD/CAT/ORD/SUB/CUS/ADM/CONT/MSG/ANA/DASH/AUTH** : préfixes par module
- **TRA/SHD/DTO** : préfixes par couche transverse

### Outils utilisés

- **Playwright MCP** pour les tests UI réels (clic, formulaire, screenshot, network monitoring)
- **curl + jq** pour les tests d'endpoints
- **psql via docker exec** pour vérifier la persistance et récupérer les codes 2FA
- **Lecture de code statique** pour la cohérence DTO et la sécurité

---

*Rapport généré le 2026-05-05 par audit automatisé multi-agents.*
*Pour toute question : revenir vers l'équipe d'audit.*
