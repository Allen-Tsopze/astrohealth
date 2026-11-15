# ASTROHEALTH – Front mobile (Expo / React Native)
Prototype de démonstration. Toutes les données sont FICTIVES. Non validé comme système médical.

## Lancer
npm install
npx expo install --fix     # aligne les versions des dépendances sur ton SDK Expo
npx expo start             # puis scanner le QR code avec Expo Go

## Structure
app/        écrans (Expo Router) : index = connexion commune (le compte détermine l'espace) ;
            (tabs)/ = ESPACE MÉDECIN : accueil, équipe, live, alertes, plus ;
            (astro)/ = ESPACE ASTRONAUTE : home, symptômes, analyse, conseils, historique, moi ;
            profil/[id], alerte/[id], radiations, risques, dossiers, ia, parametres
components/ ui.tsx (Card, Badge, Chips, Tile…) et charts.tsx (Line, Ecg, Gauge, ShipRadar)
theme/      couleurs (sombre/clair), data/mock.ts : données fictives, types/ : modèles
store/      état global (Zustand) : alertes, thème, réglages
services/   api.ts : appels Laravel

## Comptes de démo (mots de passe fictifs, voir data/mock.ts)
medecin@astrohealth.space / Medecin@2026
amara.okafor@astrohealth.space / Astro@01     lucas.moreau@… / Astro@02
yuki.tanaka@… / Astro@03    sofia.reyes@… / Astro@04
ethan.brooks@… / Astro@05   lea.dubois@… / Astro@06
En mode démo la vérification est locale. Avec USE_MOCK=false, POST /login (Laravel) vérifie les vrais comptes.

## Brancher le backend
services/api.ts : USE_MOCK = false et API_URL = http://<IP-de-ta-machine>:8000/api
Routes attendues : GET /astronauts, GET /alerts, PATCH /alerts/{id} {status},
POST /astronauts {name,age,country,role,email,password} (le médecin ajoute un astronaute et son compte),
POST /astronauts/{id}/predict -> { "score": 0.87 }  (Laravel relaie vers le service Python /predict)
POST /symptoms/analyze {symptoms[], intensity, since, description} -> { score, label, confidence, level, factors[{name,v}], symptoms, intensity, since }
Les champs suivent types/index.ts (à reprendre dans les migrations MySQL).
