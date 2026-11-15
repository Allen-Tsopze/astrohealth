import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { dark } from '../theme';
import { T, Btn } from '../components/ui';
import { useStore } from '../store';
import { api } from '../services/api';
export default function Login() {
  const r = useRouter(); const { login } = useStore(); const [err, setErr] = useState(''); const [email, setEmail] = useState('amara.okafor@astrohealth.space'); const [pw, setPw] = useState('Astro@01'); const [show, setShow] = useState(false); const [rem, setRem] = useState(true);
  const submit = async () => {
    setErr('');
    try { const res = await api.login(email.trim().toLowerCase(), pw); login(res.role, res.astronautId); r.replace(res.role === 'medecin' ? '/accueil' : '/home'); }
    catch (e) { setErr('Identifiant ou mot de passe incorrect.'); }
  };
  const field = { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, backgroundColor: '#0B1F3A', borderWidth: 1, borderColor: dark.bd, borderRadius: 14, paddingHorizontal: 12 };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050E1C', padding: 20, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 28 }}>
        <View style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: dark.pri, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="pulse" size={34} color="#fff" /></View>
        <Text style={{ color: '#fff', fontSize: 26, fontWeight: '800', letterSpacing: 6, marginTop: 12 }}>ASTROHEALTH</Text>
        <T mu s={12}>Surveillance de la santé des astronautes</T>
      </View>
      <View style={{ backgroundColor: '#0E2340', borderRadius: 22, padding: 20, gap: 12, borderWidth: 1, borderColor: dark.bd }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>Connexion</Text>
        <T mu s={12}>Accès réservé au personnel médical autorisé</T>
        <View style={field}><Ionicons name="mail-outline" size={18} color={dark.mu} /><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={{ flex: 1, color: '#fff', paddingVertical: 13 }} /></View>
        <View style={field}><Ionicons name="lock-closed-outline" size={18} color={dark.mu} /><TextInput value={pw} onChangeText={setPw} secureTextEntry={!show} style={{ flex: 1, color: '#fff', paddingVertical: 13 }} /><TouchableOpacity onPress={() => setShow(!show)}><Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={18} color={dark.mu} /></TouchableOpacity></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => setRem(!rem)} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}><Ionicons name={rem ? 'checkbox' : 'square-outline'} size={20} color={dark.pri} /><T s={13}>Se souvenir de moi</T></TouchableOpacity>
          <Text style={{ color: dark.cy, fontSize: 13 }}>Mot de passe oublié ?</Text>
        </View>
        {err ? <T s={12} col="#FF4757">{err}</T> : null}
        <Btn label="Se connecter" onPress={submit} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
          <TouchableOpacity onPress={() => { setEmail('medecin@astrohealth.space'); setPw('Medecin@2026'); setErr(''); }}><T s={12} col={dark.cy}>Démo médecin</T></TouchableOpacity>
          <TouchableOpacity onPress={() => { setEmail('amara.okafor@astrohealth.space'); setPw('Astro@01'); setErr(''); }}><T s={12} col={dark.cy}>Démo astronaute</T></TouchableOpacity>
        </View>
        <T mu s={11} style={{ textAlign: 'center' }}>🔒 Authentification sécurisée · chiffrement de bout en bout</T>
      </View>
      <T s={11} style={{ textAlign: 'center', marginTop: 24, color: '#FFAA33' }}>Prototype de démonstration · non validé comme système de diagnostic médical</T>
    </SafeAreaView>
  );
}
