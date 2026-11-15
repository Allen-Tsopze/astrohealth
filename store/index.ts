import { create } from 'zustand';
import { api, USE_MOCK } from '../services/api';
import { astronauts, alerts, accounts } from '../data/mock';
import { HistoryItem } from '../types';
const history0: HistoryItem[] = [
  { id: 'h1', date: "Aujourd'hui · 10:02", title: 'Maux de tête, vertiges, fatigue', score: 0.58, note: 'Conseils suivis · médecin informé', kind: 'ia' },
  { id: 'h2', date: 'Hier · 21:40', title: 'Troubles du sommeil', score: 0.31, note: 'Conseils suivis · médecin non requis', kind: 'symptome' },
  { id: 'h3', date: 'J184 · 08:15', title: 'Douleur musculaire', score: 0.22, note: 'Conseils suivis · médecin non requis', kind: 'symptome' },
  { id: 'h4', date: 'J171 · 14:30', title: 'Nausées, vertiges', score: 0.64, note: 'Conseils suivis · médecin informé', kind: 'ia' },
];
const now = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
export const useStore = create<any>((set, get) => ({
  dark: true, astronauts, alerts, history: history0, analysis: null, saved: false,
  role: null, userId: null,
  toggles: { critiques: true, avert: true, bio: false, rappels: true },
  login: (role: string, userId: string | null) => set({ role, userId }),
  logout: () => set({ role: null, userId: null, analysis: null, saved: false }),
  addAstronaut: async (f: any) => {
    if (!USE_MOCK) { await api.createAstronaut(f); await get().load(); return; }
    const s = get(); const id = 'AST-' + String(s.astronauts.length + 1).padStart(2, '0');
    const colors = ['#1769FF', '#00A6C8', '#7A5CFF', '#16A37B', '#E0762B', '#D6336C'];
    const a = { id, name: f.name, age: f.age, country: f.country, role: f.role, status: 'stable', hr: 70, spo2: 98, temp: 36.7, bp: '120/78', rr: 16, sleep: '7h00', anomaly: 0.05, dose: 80, color: colors[s.astronauts.length % 6], history: 'Aucun antécédent notable.', incidents: [], meds: 'Aucun' };
    accounts.push({ email: f.email, password: f.password, role: 'astronaute', astronautId: id });
    set({ astronauts: [...s.astronauts, a] });
  },
  setDark: (dark: boolean) => set({ dark }),
  toggle: (k: string) => set((s: any) => ({ toggles: { ...s.toggles, [k]: !s.toggles[k] } })),
  load: async () => { if (USE_MOCK) return; try { set({ astronauts: await api.astronauts(), alerts: await api.alerts() }); } catch (e) {} },
  setAlert: (id: string, status: string) => { set((s: any) => ({ alerts: s.alerts.map((a: any) => (a.id === id ? { ...a, status } : a)) })); api.updateAlert(id, status).catch(() => {}); },
  setScore: (id: string, anomaly: number) => set((s: any) => ({ astronauts: s.astronauts.map((a: any) => (a.id === id ? { ...a, anomaly } : a)) })),
  setAnalysis: (analysis: any) => set({ analysis, saved: false }),
  addHistory: (title: string, score: number, note: string, kind: 'ia' | 'symptome') => set((s: any) => ({ history: [{ id: 'h' + Date.now(), date: "Aujourd'hui · " + now(), title, score, note, kind }, ...s.history], saved: true })),
  // Une alerte créée côté astronaute apparaît dans l'espace médecin.
  addAlert: (title: string, text: string, sev: string) => set((s: any) => {
    const me = s.astronauts.find((a: any) => a.id === s.userId);
    return { alerts: [{ id: 'ALT-2026-' + (188 + s.alerts.length), sev, who: me ? me.name : 'Astronaute', aid: s.userId || '', title, text, cat: 'Symptômes', time: now(), status: 'Nouvelle' }, ...s.alerts] };
  }),
}));
