# CYNA — Back-office (Angular 21)

Interface admin pour gérer le catalogue, les commandes, les clients, les admins, les abonnements et le contenu.

## Stack

| Composant     | Version | Rôle                 |
| ------------- | ------- | -------------------- |
| Angular       | 21      | framework            |
| Tailwind CSS  | 4       | styling              |
| ngx-translate | —       | i18n FR/EN           |
| Vitest        | —       | tests unitaires      |
| chart.js      | 4       | graphiques analytics |

## Démarrage rapide

```bash
git clone https://github.com/CynaOrg/cyna-backoffice.git
cd cyna-backoffice
npm install

# Backend doit tourner sur localhost:3000 (voir cyna-api)
ng serve --port 4300
# → http://localhost:4300/
```

Le `proxy.conf.json` redirige `/api/v1/**` vers `http://localhost:3000`.

## Comptes de test

Une fois la base seedée (`cyna-api/npm run seed:dev`) :

| Rôle        | Email                    | Mot de passe     | Accès                                      |
| ----------- | ------------------------ | ---------------- | ------------------------------------------ |
| Super Admin | `super.admin@cyna.local` | `SuperAdmin123!` | Tout (CRUD catalog/users/admins/content)   |
| Commercial  | `commercial@cyna.local`  | `Commercial123!` | Lecture (analytics, orders, subscriptions) |

> ⚠️ Le login admin envoie un code 2FA par email. En local sans SMTP, voir `cyna-api/README.md` pour récupérer le code via SQL.

## Tests

```bash
npm run test:cov        # Vitest avec couverture (572 tests)
ng build                # Build prod
```

## Périmètre

- `features/products/` — Catalogue (CRUD produits, catégories)
- `features/orders/` — Commandes (liste, détail, statut)
- `features/customers/` — Utilisateurs (liste, détail, pause)
- `features/admins/` — Admins (liste, création — super-admin only)
- `features/subscriptions/` — Abonnements SaaS
- `features/content/` — CMS (carousel, FAQ, hero text)
- `features/messages/` — Messages contact client
- `features/analytics/` — KPIs et graphiques
- `features/account/` — Compte admin courant
