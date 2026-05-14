# CYNA — Back-office

Interface admin de la plateforme CYNA. SPA **Angular 21** réservée aux administrateurs (login avec 2FA obligatoire).

## Stack

- Angular 21 standalone components, signals, nouveau control flow
- Tailwind CSS
- ApexCharts pour les graphes du dashboard analytics

## Périmètre

- Dashboard KPIs (CA, panier moyen, MRR, ventes par catégorie, état du stock)
- Catalogue : produits, catégories, upload images (R2 via signed URL)
- Commandes : liste, détail, changement de statut
- Abonnements : liste, détail, ajustement manuel
- Utilisateurs : liste, activation / désactivation
- Admins : création, gestion des rôles
- Contenu : carrousel homepage, hero text, top selections, FAQ, messages de contact

## Lancement en local

Prérequis : **Node 20+**. Le backend `cyna-api` doit tourner sur `http://localhost:3000` (voir le README de `cyna-api`).

```bash
git clone https://github.com/CynaOrg/cyna-backoffice.git
cd cyna-backoffice
npm install

# Lancer sur le port 4201 (cyna-app occupe le 4200)
npm start -- --port 4201
```

Le proxy `proxy.conf.json` redirige `/api` vers `http://localhost:3000`, donc rien à configurer côté env.

### Premier login

Le back-office exige un compte admin. Pour en créer un sur une BDD locale vide :

1. Dans `cyna-api/.env`, mettre `ADMIN_SEED_ENABLED=true`.
2. Redémarrer `cyna-api` — un super-admin est seedé au boot (identifiants dans les logs de `auth-service`).
3. Repasser `ADMIN_SEED_ENABLED=false`.
4. Login sur `http://localhost:4201` — 2FA par email (code 6 chiffres, valable 5 min).

## Scripts utiles

```bash
npm start              # ng serve (penser à --port 4201)
npm run build          # build prod
npm test               # tests unitaires
npm run test:cov       # tests + couverture
```

## Structure

```
src/
  app/
    core/         # services singleton (auth-admin, http interceptors, ...)
    shared/       # composants réutilisables (tables, forms, modals)
    features/    # modules métier (dashboard, catalog, orders, users, content, ...)
    pages/        # pages racines de chaque feature
```
