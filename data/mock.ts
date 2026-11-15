// DONNÉES FICTIVES DE DÉMONSTRATION – aucune valeur médicale réelle.
import { Astronaut, Alert } from '../types';
export const series = (n: number, base: number, amp: number, ph = 0) =>
  Array.from({ length: n }, (_, i) => +(base + amp * Math.sin(i * 0.35 + ph) + amp * 0.3 * Math.sin(i * 1.9 + ph * 3)).toFixed(1));
const A = (id: string, name: string, age: number, country: string, role: string, status: any, hr: number, spo2: number, temp: number, bp: string, anomaly: number, dose: number, color: string, extra: any = {}): Astronaut => ({
  id, name, age, country, role, status, hr, spo2, temp, bp, rr: 16, sleep: '6h50', anomaly, dose, color,
  history: 'Aucun antécédent notable.', incidents: [], meds: 'Vitamine D 1000 UI', ...extra });
export const astronauts: Astronaut[] = [
  A('AST-01', 'Amara Okafor', 41, 'Nigeria', 'Commandante', 'stable', 62, 98, 36.6, '118/76', 0.06, 84, '#1769FF'),
  A('AST-02', 'Lucas Moreau', 38, 'France', 'Ingénieur de vol', 'stable', 74, 97, 36.8, '121/79', 0.11, 86, '#00A6C8'),
  A('AST-03', 'Yuki Tanaka', 35, 'Japon', 'Médecin de bord', 'suivi', 88, 94, 37.4, '130/84', 0.58, 91, '#7A5CFF', { sleep: '5h20', incidents: ['J+176 · Troubles du sommeil'] }),
  A('AST-04', 'Sofia Reyes', 36, 'Mexique', 'Géologue', 'stable', 66, 98, 36.5, '116/74', 0.08, 82, '#16A37B'),
  A('AST-05', 'Ethan Brooks', 39, 'Canada', 'Pilote', 'critique', 104, 91, 38.1, '142/94', 0.87, 88, '#D6336C', { sleep: '5h40', rr: 21, history: 'Asthme léger dans l\'enfance · aucune allergie connue', incidents: ['J+142 · Déshydratation légère', 'J+98 · Troubles du sommeil'], meds: 'Vitamine D 1000 UI · Bilan sanguin J+170 · ECG J+178' }),
  A('AST-06', 'Léa Dubois', 37, 'Belgique', 'Ingénieure systèmes', 'stable', 69, 97, 36.7, '119/77', 0.14, 85, '#E0762B'),
];
export const alerts: Alert[] = [
  { id: 'ALT-2026-0187', sev: 'critique', who: 'Ethan Brooks', aid: 'AST-05', title: 'SpO₂ sous le seuil', text: 'SpO₂ 91 % sous le seuil de 92 %', cat: 'Respiratoire', time: '10:12', status: 'Nouvelle' },
  { id: 'ALT-2026-0186', sev: 'critique', who: 'Ethan Brooks', aid: 'AST-05', title: 'Tachycardie', text: 'Tachycardie 104 BPM', cat: 'Cardiaque', time: '10:09', status: 'Reçue' },
  { id: 'ALT-2026-0185', sev: 'avertissement', who: 'Yuki Tanaka', aid: 'AST-03', title: 'Température en hausse', text: 'Température 37,4 °C en hausse', cat: 'Température', time: '09:47', status: 'Nouvelle' },
  { id: 'ALT-2026-0184', sev: 'avertissement', who: 'Vaisseau', aid: '', title: 'Pic de radiation solaire', text: 'Pic de radiation solaire, niveau 2', cat: 'Radiations', time: '08:30', status: 'Reçue' },
  { id: 'ALT-2026-0183', sev: 'info', who: 'Lucas Moreau', aid: 'AST-02', title: 'Examen planifié', text: 'Examen sanguin planifié', cat: 'Examens', time: '07:55', status: 'Résolue' },
];
export const risks = [
  { t: 'Radiations spatiales', s: 72, c: 'Cancer, système nerveux central', m: 'CANS, dosimètres', p: 'Abri anti-radiations, limites de dose' },
  { t: 'Isolement et confinement', s: 55, c: 'Stress, troubles du sommeil', m: 'Sommeil, bilan psycho.', p: 'Contacts famille, suivi psychologique' },
  { t: 'Éloignement de la Terre', s: 64, c: 'Soutien médical retardé', m: 'Télémédecine, stocks', p: 'Pharmacie embarquée, formation médicale' },
  { t: 'Champs gravitationnels', s: 48, c: 'Perte osseuse et musculaire', m: 'Densité osseuse', p: 'Exercice quotidien, nutrition' },
  { t: 'Environnements hostiles et fermés', s: 39, c: 'Infections, air confiné', m: 'CO₂, microbiome', p: 'Filtration, hygiène, contrôle de l\'air' },
];
export const dossiers: [string, number][] = [['Antécédents médicaux', 3], ['Examens précédents', 4], ['Diagnostics et observations', 5], ['Historique des médicaments', 6], ['Prescriptions', 7], ['Résultats d\'analyses', 8], ['Rapports médicaux', 9]];

// Comptes de démonstration (mots de passe fictifs, vérifiés localement en mode démo uniquement).
const norm = (n: string) => n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '.');
export const accounts: { email: string; password: string; role: 'medecin' | 'astronaute'; astronautId: string | null }[] = [
  { email: 'medecin@astrohealth.space', password: 'Medecin@2026', role: 'medecin', astronautId: null },
  ...astronauts.map((a, i) => ({ email: norm(a.name) + '@astrohealth.space', password: 'Astro@0' + (i + 1), role: 'astronaute' as const, astronautId: a.id })),
];
