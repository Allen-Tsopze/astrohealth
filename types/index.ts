export type Status = 'stable' | 'suivi' | 'critique';
export interface Astronaut { id: string; name: string; age: number; country: string; role: string; status: Status; hr: number; spo2: number; temp: number; bp: string; rr: number; sleep: string; anomaly: number; dose: number; color: string; history: string; incidents: string[]; meds: string; }
export interface Alert { id: string; sev: 'critique' | 'avertissement' | 'info'; who: string; aid: string; title: string; text: string; cat: string; time: string; status: 'Nouvelle' | 'Reçue' | 'Résolue'; }
export interface Analysis { score: number; label: string; confidence: number; level: 'faible' | 'modéré' | 'élevé'; factors: { name: string; v: number }[]; symptoms: string[]; intensity: number; since: string; }
export interface HistoryItem { id: string; date: string; title: string; score: number; note: string; kind: 'ia' | 'symptome'; }
