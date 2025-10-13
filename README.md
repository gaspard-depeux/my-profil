# FlowTrack 💰

Une application web de gestion financière personnelle qui transforme le budget tracking en une expérience ludique, motivante et intelligente.

## 🎯 Vision

FlowTrack combine analyse financière rigoureuse, gamification addictive et coaching IA pour aider les utilisateurs à prendre le contrôle de leur argent. Inspirée par Bankin', Finary, Apple Fitness et Duolingo.

## ✨ Fonctionnalités principales

### 🏠 Dashboard intelligent
- Vue d'ensemble des finances en temps réel
- Cartes de statistiques avec tendances
- Graphiques interactifs d'évolution du solde
- Transactions récentes avec catégorisation
- Insights IA personnalisés

### 💳 Gestion des transactions
- Ajout rapide et intuitif
- Catégorisation automatique
- Tags et recherche avancée
- Import/export CSV
- Transactions récurrentes

### 🎯 Objectifs d'épargne
- Création d'objectifs personnalisés
- Suivi visuel de progression
- Calculs automatiques de contributions
- Notifications de rappel
- Célébrations de paliers

### 📊 Budgets intelligents
- Budgets par catégorie
- Alertes de dépassement
- Suggestions d'optimisation
- Analyse des tendances

### 🤖 Assistant IA
- Conseils personnalisés quotidiens
- Analyse des habitudes de dépense
- Suggestions d'économies
- Chat interactif

### 🎮 Gamification
- Système de niveaux et XP
- Achievements débloquables
- Streaks de bonnes habitudes
- Récompenses et défis

## 🛠 Stack technique

### Frontend
- **Next.js 14+** - Framework React avec App Router
- **TypeScript** - Typage statique
- **TailwindCSS** - Styling avec design system custom
- **Framer Motion** - Animations fluides
- **Recharts** - Graphiques interactifs
- **Radix UI** - Composants accessibles
- **Zustand** - State management

### Backend & Services
- **Supabase** - BaaS (PostgreSQL + Auth + Storage)
- **OpenAI API** - Assistant IA (GPT-4)
- **Vercel** - Déploiement et hosting

### Design System
- **Palette de couleurs** - Primary (#6366F1), Success (#10B981), Warning (#F59E0B)
- **Typographie** - Inter avec variants harmonieuses
- **Composants** - Cards, Buttons, Inputs avec variants
- **Animations** - Micro-interactions et transitions fluides

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/flowtrack.git
cd flowtrack
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration environnement**
```bash
cp .env.example .env.local
```

Remplir les variables d'environnement :
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Lancer en développement**
```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
flowtrack/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes d'authentification
│   ├── (dashboard)/       # Routes du dashboard
│   ├── api/               # API routes
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants UI de base
│   ├── dashboard/        # Composants du dashboard
│   ├── navigation/       # Navigation (navbar, sidebar)
│   └── shared/           # Composants partagés
├── lib/                  # Utilitaires et configuration
│   ├── supabase/         # Client Supabase
│   ├── utils/            # Fonctions utilitaires
│   └── hooks/            # Hooks React custom
├── types/                # Types TypeScript
└── styles/               # Styles et animations
```

## 🎨 Design System

### Couleurs
```css
/* Couleurs principales */
--primary: #6366F1        /* Actions principales */
--secondary: #10B981      /* Succès, économies */
--accent: #F59E0B         /* Alertes, attention */

/* Couleurs fonctionnelles */
--success: #10B981        /* Revenus, réussite */
--warning: #F59E0B        /* Alertes */
--danger: #EF4444         /* Dépenses, erreurs */
--income: #10B981         /* Revenus */
--expense: #EF4444        /* Dépenses */
--saving: #8B5CF6         /* Épargne */
```

### Composants signature
- **Cards** - Arrondies (16px), shadows douces, hover effects
- **Buttons** - Variants (primary, secondary, ghost), hover lift
- **Progress bars** - Animations fluides, gradients
- **Badges** - Couleurs contextuelles, tailles multiples

## 📊 Base de données

### Tables principales
- `users` - Profils utilisateurs
- `accounts` - Comptes bancaires
- `transactions` - Transactions financières
- `categories` - Catégories de dépenses/revenus
- `goals` - Objectifs d'épargne
- `budgets` - Budgets par catégorie
- `achievements` - Réalisations gamification
- `user_stats` - Statistiques utilisateur
- `ai_interactions` - Historique IA

## 🤖 Assistant IA

L'assistant FlowTrack utilise GPT-4 pour :
- Analyser les habitudes de dépense
- Proposer des conseils personnalisés
- Détecter des anomalies
- Suggérer des optimisations
- Répondre aux questions financières

## 🎮 Système de gamification

### Niveaux et XP
- Actions récompensées en XP
- Niveaux débloquant de nouvelles fonctionnalités
- Progression visuelle motivante

### Achievements
- Premiers pas (première transaction, premier objectif)
- Streaks (7 jours d'activité, 30 jours sans dépassement)
- Paliers (économiser 500€, 1000€, 5000€)
- Spéciaux (objectif atteint en avance, mois parfait)

## 📱 Responsive Design

FlowTrack est conçu mobile-first avec :
- Navigation adaptative (sidebar → bottom nav)
- Composants tactiles optimisés
- Swipe gestures sur mobile
- Performance optimisée

## 🔒 Sécurité

- Authentification Supabase (OAuth + Email/Password)
- RLS (Row Level Security) sur toutes les tables
- Chiffrement des données sensibles
- Validation côté client et serveur

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t flowtrack .
docker run -p 3000:3000 flowtrack
```

## 📈 Roadmap

### Phase 1 - MVP ✅
- [x] Dashboard de base
- [x] Gestion des transactions
- [x] Objectifs simples
- [x] Budgets basiques
- [x] Assistant IA basique

### Phase 2 - Gamification
- [ ] Système de niveaux complet
- [ ] Achievements avancés
- [ ] Défis mensuels
- [ ] Leaderboards (optionnel)

### Phase 3 - Fonctionnalités avancées
- [ ] Import bancaire automatique
- [ ] Prévisions IA avancées
- [ ] Objectifs partagés
- [ ] Application mobile native

### Phase 4 - Social & Communauté
- [ ] Partage d'objectifs
- [ ] Conseils communautaires
- [ ] Comparaisons anonymisées

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

## 📄 License

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Design inspiré par Bankin', Finary, Apple Fitness
- Gamification inspirée par Duolingo
- Icônes par Lucide React
- Illustrations par [source à définir]

---

**FlowTrack** - Transformez votre relation à l'argent 💰✨