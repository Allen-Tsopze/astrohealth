import { astronauts, alerts, accounts } from '../data/mock';
// Passer USE_MOCK à false et renseigner l'URL de l'API Laravel (IP de la machine, pas "localhost" sur téléphone).
export const USE_MOCK = true;
export const API_URL = 'http://192.168.1.10:8000/api';
async function j(path: string, opts: any = {}) {
  const r = await fetch(API_URL + path, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, ...opts });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}
export const api = {
  // Laravel : POST /login {email, password} -> { role: 'medecin'|'astronaute', astronautId: 'AST-01'|null, token }
  login: async (email: string, password: string): Promise<{ role: string; astronautId: string | null }> => {
    if (!USE_MOCK) return j('/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    const a = accounts.find(x => x.email === email && x.password === password);
    if (!a) throw new Error('401');
    return { role: a.role, astronautId: a.astronautId };
  },
  astronauts: (): Promise<any> => (USE_MOCK ? Promise.resolve(astronauts) : j('/astronauts')),
  alerts: (): Promise<any> => (USE_MOCK ? Promise.resolve(alerts) : j('/alerts')),
  // Laravel : POST /astronauts {name, age, country, role, email, password} -> crée l'astronaute + son compte
  createAstronaut: (f: any): Promise<any> => j('/astronauts', { method: 'POST', body: JSON.stringify(f) }),
  updateAlert: (id: string, status: string): Promise<any> => (USE_MOCK ? Promise.resolve() : j('/alerts/' + id, { method: 'PATCH', body: JSON.stringify({ status }) })),
  // Laravel relaie vers le service Python: POST /predict -> { score: 0..1 }
  predict: (id: string, current: number): Promise<{ score: number }> =>
    USE_MOCK ? Promise.resolve({ score: Math.min(1, Math.max(0, +(current + (Math.random() - 0.5) * 0.04).toFixed(2))) }) : j('/astronauts/' + id + '/predict', { method: 'POST' }),
};

// ---- Espace astronaute : analyse des symptômes ----
import { Analysis } from '../types';
const SEVERE = ['Douleur thoracique', 'Essoufflement', 'Vision floue'];
const GENERAL = ['Maux de tête', 'Vertiges', 'Nausées', 'Fatigue'];
// Simulation locale du modèle Python (valeurs fictives).
export function localAnalyze(p: { symptoms: string[]; intensity: number; since: string }): Analysis {
  const n = p.symptoms.length;
  let score = 0.1 + 0.06 * n + 0.05 * p.intensity + (p.symptoms.some(x => SEVERE.includes(x)) ? 0.1 : 0) + (p.since === '> 1 semaine' ? 0.05 : 0);
  score = Math.min(0.99, +score.toFixed(2));
  const level = score < 0.35 ? 'faible' : score < 0.7 ? 'modéré' : 'élevé';
  const label = p.symptoms.some(x => SEVERE.includes(x)) ? 'Atteinte cardio-respiratoire possible' : p.symptoms.some(x => GENERAL.includes(x)) ? 'Stress physiologique lié à la radiation et à la fatigue' : 'Gêne musculo-squelettique ou bénigne';
  return { score, label, level, confidence: Math.min(95, 60 + n * 6), symptoms: p.symptoms, intensity: p.intensity, since: p.since,
    factors: [{ name: `Fréquence cardiaque +${Math.round(score * 20)} %`, v: Math.min(1, 0.2 + score * 0.45) }, { name: 'Sommeil réduit', v: Math.min(1, 0.2 + score * 0.85) }, { name: 'Exposition radiation', v: Math.min(1, 0.1 + score * 0.45) }] };
}
// Laravel relaie vers le service Python (/predict) et renvoie la même forme que Analysis.
export const analyzeSymptoms = (p: { symptoms: string[]; intensity: number; since: string; description?: string }): Promise<Analysis> =>
  USE_MOCK ? Promise.resolve(localAnalyze(p)) : j('/symptoms/analyze', { method: 'POST', body: JSON.stringify(p) });
