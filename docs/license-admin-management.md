# Gestion Admin des Licences - Analyse et Recommandations

## Etat actuel

### Ce qui existe cote backend (cyna-api)

Le systeme de licences est **entierement fonctionnel cote utilisateur** :

| Endpoint                    | Methode | Guard          | Description                                      |
| --------------------------- | ------- | -------------- | ------------------------------------------------ |
| `/api/v1/licenses`          | GET     | `JwtAuthGuard` | L'utilisateur recupere ses propres licences      |
| `/api/v1/licenses/:id`      | GET     | `JwtAuthGuard` | Detail d'une licence (verification de propriete) |
| `/api/v1/licenses/activate` | POST    | Public         | Activation via token jetable envoye par email    |

### Flux de creation automatique

```
1. Client achete un produit de type "license"
2. Paiement Stripe reussi → webhook payment_intent.succeeded
3. Payment Service genere automatiquement :
   - Cle de licence : CYNA-XXXX-XXXX-XXXX-XXXX
   - Token d'activation (SHA-256, valide 30 jours)
4. Notification Service envoie un email avec :
   - La cle de licence
   - Un lien d'activation unique
5. Client clique sur le lien → licence activee
```

### Entite LicenseKey (Payment Service)

```
- id (UUID)
- licenseKey (format CYNA-XXXX-XXXX-XXXX-XXXX, unique)
- orderId (lien vers la commande)
- productId (lien vers le produit)
- userId (nullable - acheteurs anonymes possibles)
- email (proprietaire)
- status (active | revoked | expired)
- activatedAt (date d'activation)
- expiresAt (date d'expiration)
- productSnapshot (nom FR/EN + slug au moment de l'achat)
- activationTokenHash (SHA-256, consomme apres activation)
```

### Patterns RabbitMQ existants

```
MESSAGE_PATTERNS.PAYMENT.GET_USER_LICENSES   → { userId }
MESSAGE_PATTERNS.PAYMENT.GET_LICENSE_BY_ID   → { licenseId, userId }
MESSAGE_PATTERNS.PAYMENT.ACTIVATE_LICENSE    → { token }
EVENT_PATTERNS.PAYMENT.LICENSES_ISSUED       → fire-and-forget
```

---

## Ce qui ne fonctionne PAS cote admin

### Aucun endpoint admin n'existe

Il n'y a **aucun endpoint** protege par `JwtAdminAuthGuard` pour les licences. Contrairement aux commandes (`/admin/orders`), abonnements (`/admin/payments/subscriptions`) ou clients (`/admin/users`), les licences n'ont pas d'equivalent admin.

Concretement, un super_admin ne peut pas :

- **Lister toutes les licences** de tous les clients
- **Rechercher** une licence par cle, email ou statut
- **Voir le detail** d'une licence specifique
- **Revoquer** manuellement une licence
- **Verifier le statut** d'activation d'une licence

### Pourquoi ca ne fonctionne pas

1. **Pas de controller admin** : Le `LicenseController` n'expose que des routes user-level
2. **Pas de message patterns admin** : Il manque des patterns RabbitMQ comme `GET_ALL_LICENSES`, `REVOKE_LICENSE`, `GET_LICENSES_BY_STATUS`
3. **Pas de page backoffice** : Sans endpoints, impossible de creer l'interface admin
4. **Le service a deja les methodes** : `LicenseService` expose `findByEmail()`, `findByOrderId()`, `revokeAllForUser()`, `revokeByOrderId()` — mais elles ne sont accessibles que depuis d'autres services internes, pas depuis l'API Gateway

---

## Pourquoi ce serait utile pour l'admin

### 1. Support client

**Scenario** : Un client contacte le support car il a perdu sa cle de licence ou n'a pas recu l'email.

Aujourd'hui, l'admin doit aller directement en base de donnees pour retrouver la licence. Avec une page admin, il pourrait simplement rechercher par email ou par commande et renvoyer les informations au client.

### 2. Revocation manuelle

**Scenario** : Un client est en impaye, a commis une fraude, ou demande un remboursement.

Le systeme revoque automatiquement les licences quand un compte est supprime (`ACCOUNT_DELETED` event), mais il n'y a aucun moyen de revoquer une licence specifique sans supprimer le compte entier. L'admin a besoin d'un controle granulaire.

### 3. Visibilite et monitoring

**Scenario** : L'equipe veut savoir combien de licences sont actives, combien n'ont jamais ete activees (tokens expires), combien ont ete revoquees.

Ces metriques sont essentielles pour :

- Mesurer le taux d'activation des produits licence
- Identifier les clients qui n'activent pas leurs achats (potentiel probleme UX ou email)
- Suivre les revenus lies aux licences vs abonnements vs produits physiques

### 4. Audit et conformite

**Scenario** : Besoin de tracer qui a quelle licence, depuis quand, et avec quel statut.

Pour une plateforme de cybersecurite (SOC, EDR, XDR), la tracabilite des acces est critique. L'admin doit pouvoir auditer rapidement l'etat de toutes les licences delivrees.

### 5. Lien avec les commandes existantes

La page de detail d'une commande (`/orders/:id`) affiche les items commandes, mais ne montre pas les licences generees pour cette commande. L'admin voit qu'un client a achete un produit licence mais ne peut pas verifier si la cle a ete generee, envoyee et activee.

---

## Ce qu'il faudrait implementer

### Cote Backend (cyna-api)

1. **Nouveaux message patterns** dans `libs/common/src/rabbitmq/patterns.ts` :

   ```
   PAYMENT.GET_ALL_LICENSES       → liste paginee avec filtres (status, email, productId)
   PAYMENT.GET_LICENSE_DETAIL      → detail admin sans verification userId
   PAYMENT.REVOKE_LICENSE          → revocation manuelle par id
   PAYMENT.GET_LICENSE_STATS       → compteurs par statut
   ```

2. **Nouveaux handlers** dans `payment.controller.ts` pour ces patterns

3. **Nouveau controller admin** dans l'API Gateway :
   ```
   GET    /admin/payments/licenses          → liste avec filtres
   GET    /admin/payments/licenses/:id      → detail
   PATCH  /admin/payments/licenses/:id      → revoquer/reactiver
   GET    /admin/payments/licenses/stats    → statistiques
   ```
   Tous proteges par `JwtAdminAuthGuard` + `@Roles('super_admin')`

### Cote Backoffice (cyna-backoffice)

1. **Page liste** : tableau avec colonnes (cle, produit, client, statut, date activation, actions)
2. **Page detail** : informations completes + lien vers la commande associee
3. **Filtres** : par statut (active/revoked/expired), par email, par produit
4. **Actions** : revoquer / reactiver une licence
5. **Route** : `/licences-keys` (ou integre dans la page detail commande)

---

## Priorite

**Moyenne**. Le systeme fonctionne en autonome (creation + activation automatiques). L'ajout de la gestion admin est un confort d'administration et de support, pas un blocage fonctionnel. A prioriser si l'equipe recoit des demandes de support liees aux licences ou si un audit de conformite est necessaire.
