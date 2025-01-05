# PharmaBill

Un générateur moderne de factures médicales construit avec React et TypeScript. Générez des factures professionnelles avec des codes QR pour une lecture et une vérification faciles. C'est un système sans base de données pour le moment.

🔗 **Demo:** [https://classy-sunflower-94e5d8.netlify.app](https://classy-sunflower-94e5d8.netlify.app)

![Logo PharmaBill](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/receipt.svg)

## Fonctionnalités

- 📝 Création de factures médicales professionnelles
- 🧮 Calculs automatiques (sous-total, TVA, total)
- 📱 Design adaptatif pour tous les appareils
- 🔍 Génération de codes QR pour une vérification facile
- 💾 Génération et téléchargement de PDF
- 🌍 Fonctionne hors ligne - aucun backend requis

## Stack Technique

- React 18
- TypeScript
- Tailwind CSS
- jsPDF (génération PDF)
- QRCode (génération de codes QR)
- Lucide React (icônes)
- Vite (outil de build)

## Pour Commencer

1. Clonez le dépôt
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

## Utilisation

1. Saisissez les informations du client
2. Ajoutez des articles avec leurs quantités et prix
3. Visualisez les calculs en temps réel
4. Cliquez sur "Générer la Facture" pour créer et télécharger un PDF

## Structure du Projet

```
/
├── src/
│   ├── components/             # Composants React
│   │   ├── InvoiceForm.tsx     # Formulaire principal de facture
│   │   └── PaymentSection.tsx  # Section de paiement
│   ├── constants/              # Constants et configurations
│   │   └── payment.ts          # Méthodes de paiement
│   ├── types/                  # Types TypeScript
│   │   └── invoice.ts          # Interfaces pour factures
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── calculations.ts     # Calculs (TVA, totaux)
│   │   └── pdf.ts              # Génération de PDF
│   ├── App.tsx                 # Composant racine
│   ├── index.css               # Styles globaux (Tailwind)
│   ├── main.tsx                # Point d'entrée
│   └── vite-env.d.ts           # Types pour Vite
├── public/                     # Fichiers statiques
├── index.html                  # Page HTML principale
├── postcss.config.js           # Configuration PostCSS
├── tailwind.config.js          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
├── tsconfig.app.json           # Config TS pour l'app
├── tsconfig.node.json          # Config TS pour Node
├── vite.config.ts              # Configuration Vite
├── eslint.config.js            # Configuration ESLint
└── package.json                # Dépendances et scripts
```

## Contribution

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## Licence

Licence MIT - vous êtes libre d'utiliser ce projet pour vos propres besoins.

## Support

Pour obtenir de l'aide, veuillez ouvrir une issue dans le dépôt.