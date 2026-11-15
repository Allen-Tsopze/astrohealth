import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Polyline, Polygon, Circle, Line as SLine } from 'react-native-svg';
import { useC } from '../theme';
const W = Dimensions.get('window').width - 64;
export function Line({ data, color, h = 90, w = W, fill = true, thr }: any) {
  const c = useC(); const lo = Math.min(...data, thr ?? Infinity), hi = Math.max(...data, thr ?? -Infinity);
  const y = (v: number) => h - 6 - ((v - lo) / (hi - lo || 1)) * (h - 12);
  const p = data.map((v: number, i: number) => `${(i * w) / (data.length - 1)},${y(v)}`).join(' ');
  return <Svg width={w} height={h}>{[1, 2, 3].map(k => <SLine key={k} x1={0} x2={w} y1={(h * k) / 4} y2={(h * k) / 4} stroke={c.bd} />)}
    {thr != null && <SLine x1={0} x2={w} y1={y(thr)} y2={y(thr)} stroke="#FF4757" strokeDasharray="4 4" />}
    {fill && <Polygon points={`0,${h} ${p} ${w},${h}`} fill={color} opacity={0.15} />}<Polyline points={p} fill="none" stroke={color} strokeWidth={2} /></Svg>;
}
export function Ecg({ h = 110, w = W, abnormal }: any) {
  const pts: string[] = []; const step = abnormal ? 80 : 110;
  for (let x = 0; x < w; x += step) [[0, 0], [10, 0], [16, -8], [22, 0], [30, 0], [34, 6], [38, -48], [42, 24], [46, 0], [60, 0], [70, -12], [82, 0]].forEach(([dx, dy]) => x + dx <= w && pts.push(`${x + dx * (step / 110)},${h / 2 + dy}`));
  return <View style={{ backgroundColor: '#071426', borderRadius: 10 }}><Svg width={w} height={h}>{Array.from({ length: Math.floor(w / 22) }, (_, i) => <SLine key={i} x1={i * 22} x2={i * 22} y1={0} y2={h} stroke="#00D9FF" opacity={0.1} />)}<Polyline points={pts.join(' ')} fill="none" stroke="#00FFA3" strokeWidth={2} /></Svg></View>;
}
export function Gauge({ value, max = 1, color, size = 150, label, sub }: any) {
  const c = useC(); const r = size / 2 - 10, circ = 2 * Math.PI * r;
  return <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
    <Svg width={size} height={size} style={{ position: 'absolute' }}><Circle cx={size / 2} cy={size / 2} r={r} stroke={c.bd} strokeWidth={10} fill="none" />
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${(circ * value) / max} ${circ}`} rotation={-90} origin={`${size / 2},${size / 2}`} /></Svg>
    <Text style={{ color: c.tx, fontSize: size / 4, fontWeight: '800' }}>{label}</Text><Text style={{ color: c.mu, fontSize: 12 }}>{sub}</Text></View>;
}
export function ShipRadar({ size = 180 }: any) {
  const m = size / 2;
  return <View style={{ backgroundColor: '#071426', borderRadius: 14, alignItems: 'center', padding: 8 }}><Svg width={size} height={size}>{[['#FF4757', 84], ['#FFAA33', 62], ['#16A37B', 40]].map(([col, r]: any) => <Circle key={col} cx={m} cy={m} r={r} fill={col} fillOpacity={0.14} stroke={col} strokeDasharray="5 4" />)}<Polygon points={`${m - 14},${m} ${m + 14},${m - 6} ${m + 14},${m + 6}`} fill="#E8F0FF" /><Circle cx={m + 60} cy={m - 70} r={7} fill="#FFAA33" /></Svg></View>;
}
