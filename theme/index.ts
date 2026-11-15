import { useStore } from '../store';
export const dark = { bg: '#071426', card: '#0E2340', bd: '#1B3556', tx: '#EAF1FF', mu: '#8FA5C4', pri: '#1769FF', cy: '#00D9FF' };
export const light = { bg: '#F4F7FB', card: '#FFFFFF', bd: '#E3E9F2', tx: '#0B1F3A', mu: '#6B7C93', pri: '#1769FF', cy: '#0090B8' };
export const ok = '#16C784', warn = '#FFAA33', crit = '#FF4757';
export const useC = () => (useStore((s: any) => s.dark) ? dark : light);
export const stColor: any = { stable: ok, suivi: warn, critique: crit };
export const stLabel: any = { stable: 'Stable', suivi: 'Suivi', critique: 'Critique' };
export const sevColor: any = { critique: crit, avertissement: warn, info: '#1769FF' };
