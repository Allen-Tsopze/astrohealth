import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useC, ok, warn, crit, stColor, stLabel } from '../theme';

export function Screen({ title, sub, back, onBack, children }: any) {
  const c = useC(), r = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, paddingBottom: 8 }}>
        {back && <TouchableOpacity onPress={() => (onBack ? onBack() : r.back())} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: c.card, borderWidth: 1, borderColor: c.bd, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="chevron-back" size={20} color={c.tx} /></TouchableOpacity>}
        <View><Text style={{ color: c.tx, fontSize: 24, fontWeight: '700' }}>{title}</Text>{sub ? <Text style={{ color: c.mu, fontSize: 12 }}>{sub}</Text> : null}</View>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets contentContainerStyle={{ padding: 16, paddingTop: 8, gap: 12, paddingBottom: 32 }}>{children}</ScrollView>
    </SafeAreaView>
  );
}
export function Card({ children, color, onPress, style }: any) {
  const c = useC(); const P: any = onPress ? TouchableOpacity : View;
  return <P onPress={onPress} style={[{ backgroundColor: c.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: c.bd, borderLeftWidth: color ? 4 : 1, borderLeftColor: color || c.bd }, style]}>{children}</P>;
}
export const T = ({ children, mu, b, s = 14, col, style }: any) => { const c = useC(); return <Text style={[{ color: col || (mu ? c.mu : c.tx), fontSize: s, fontWeight: b ? '700' : '400' }, style]}>{children}</Text>; };
export const H = ({ children }: any) => <T b s={16} style={{ marginTop: 4 }}>{children}</T>;
export const Badge = ({ label, color }: any) => <View style={{ backgroundColor: color + '33', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 99, alignSelf: 'flex-start' }}><Text style={{ color, fontSize: 11, fontWeight: '700' }}>{label}</Text></View>;
export const StatusBadge = ({ st }: any) => <Badge label={stLabel[st]} color={stColor[st]} />;
export function Chips({ items, value, onChange }: any) {
  const c = useC();
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 8 }}>
    {items.map((i: string) => <TouchableOpacity key={i} onPress={() => onChange(i)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, backgroundColor: value === i ? c.pri : c.card, borderWidth: 1, borderColor: value === i ? c.pri : c.bd }}><Text style={{ color: value === i ? '#fff' : c.tx, fontWeight: '600', fontSize: 13 }}>{i}</Text></TouchableOpacity>)}
  </ScrollView>;
}
export function Tile({ label, value, unit, color, style }: any) {
  const c = useC();
  return <Card style={[{ flex: 1, minWidth: '45%' }, style]}><T mu s={12}>{label}</T><Text style={{ color: color || c.tx, fontSize: 26, fontWeight: '800' }}>{value}<Text style={{ fontSize: 12, fontWeight: '600' }}> {unit}</Text></Text></Card>;
}
export const Grid = ({ children }: any) => <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>{children}</View>;
export function Search({ value, onChange, placeholder }: any) {
  const c = useC();
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.card, borderWidth: 1, borderColor: c.bd, borderRadius: 14, paddingHorizontal: 12 }}><Ionicons name="search" size={18} color={c.mu} /><TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={c.mu} style={{ flex: 1, color: c.tx, paddingVertical: 12 }} /></View>;
}
export function Btn({ label, onPress, variant }: any) {
  const c = useC();
  return <TouchableOpacity onPress={onPress} style={{ backgroundColor: variant === 'o' ? c.card : c.pri, borderWidth: 1, borderColor: variant === 'o' ? c.bd : c.pri, padding: 14, borderRadius: 14, alignItems: 'center' }}><Text style={{ color: variant === 'o' ? c.tx : '#fff', fontWeight: '700' }}>{label}</Text></TouchableOpacity>;
}
export function Row({ icon, title, sub, onPress }: any) {
  const c = useC();
  return <Card onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Ionicons name={icon} size={20} color={c.cy} /><View style={{ flex: 1 }}><T b>{title}</T>{sub ? <T mu s={12}>{sub}</T> : null}</View><Ionicons name="chevron-forward" size={18} color={c.mu} /></Card>;
}
export function Avatar({ name, color, size = 40 }: any) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontWeight: '700', fontSize: size / 3 }}>{name.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}</Text></View>;
}
export function Bar({ v, color, h = 8 }: any) { const c = useC(); return <View style={{ height: h, borderRadius: 5, backgroundColor: c.bd, overflow: 'hidden', flex: 1 }}><View style={{ width: `${Math.min(100, v * 100)}%`, height: '100%', backgroundColor: color }} /></View>; }
export function Toggle({ label, value, onChange }: any) { const c = useC(); return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}><T>{label}</T><Switch value={value} onValueChange={onChange} trackColor={{ true: ok, false: c.bd }} /></View>; }
export const Demo = () => <T s={11} style={{ textAlign: 'center', marginTop: 8, color: warn }}>Données fictives · prototype non validé comme système de diagnostic médical</T>;
export { ok, warn, crit };
