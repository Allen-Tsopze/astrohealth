import React, { useState } from 'react';
import { View, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, Search, Chips, Avatar, StatusBadge, Btn } from '../../components/ui';
import { useStore } from '../../store';
import { useC, crit } from '../../theme';
import { accounts } from '../../data/mock';
import { USE_MOCK } from '../../services/api';
const norm = (n: string) => n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z\s]/g, '').trim().replace(/\s+/g, '.');
const EMPTY = { name: '', age: '', country: '', role: '', email: '', password: '' };
export default function Equipe() {
  const r = useRouter(); const c = useC(); const { astronauts, addAstronaut } = useStore();
  const [q, setQ] = useState(''); const [f, setF] = useState('Tous'); const [open, setOpen] = useState(false); const [form, setForm] = useState<any>(EMPTY); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const map: any = { Stables: 'stable', Suivi: 'suivi', Critiques: 'critique' };
  const list = astronauts.filter((a: any) => (f === 'Tous' || a.status === map[f]) && (a.name + a.role).toLowerCase().includes(q.toLowerCase()));
  const suggested = form.name ? norm(form.name) + '@astrohealth.space' : '';
  const close = () => { setOpen(false); setForm(EMPTY); setErr(''); };
  const save = async () => {
    const email = (form.email || suggested).trim().toLowerCase(); const age = parseInt(form.age, 10);
    if (!form.name.trim() || !form.country.trim() || !form.role.trim()) return setErr('Nom, nationalité et fonction sont obligatoires.');
    if (!(age >= 20 && age <= 70)) return setErr("L'âge doit être compris entre 20 et 70 ans.");
    if (!/^[^\s@]+@astrohealth\.space$/.test(email)) return setErr("L'email doit finir par @astrohealth.space.");
    if (form.password.length < 6) return setErr('Le mot de passe doit faire au moins 6 caractères.');
    if (USE_MOCK && accounts.some(a => a.email === email)) return setErr('Cet email existe déjà.');
    setBusy(true); setErr('');
    try { await addAstronaut({ name: form.name.trim(), age, country: form.country.trim(), role: form.role.trim(), email, password: form.password }); close(); }
    catch (e) { setErr("Échec de l'enregistrement. Vérifie la connexion à l'API."); } finally { setBusy(false); }
  };
  const field = (label: string, key: string, extra: any = {}) => (
    <View style={{ gap: 4 }}><T mu s={12}>{label}</T><TextInput value={form[key]} onChangeText={(v) => setForm({ ...form, [key]: v })} placeholderTextColor={c.mu} autoCapitalize={extra.cap || 'words'} style={{ color: c.tx, backgroundColor: c.bg, borderWidth: 1, borderColor: c.bd, borderRadius: 12, padding: 12 }} {...extra} /></View>);
  return (
    <Screen title="Équipe" sub={`${astronauts.length} astronautes · Mars 2026`}>
      <Btn label="+ Ajouter un astronaute" onPress={() => setOpen(true)} />
      <Search value={q} onChange={setQ} placeholder="Rechercher un astronaute..." />
      <Chips items={['Tous', 'Stables', 'Suivi', 'Critiques']} value={f} onChange={setF} />
      {list.map((a: any) => <Card key={a.id} onPress={() => r.push('/profil/' + a.id)} style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Avatar name={a.name} color={a.color} size={44} /><View style={{ flex: 1 }}><T b>{a.name}</T><T mu s={12}>{a.id} · {a.role}</T></View><StatusBadge st={a.status} /></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T mu s={12}>♥ {a.hr}   SpO₂ {a.spo2}%   {a.temp.toFixed(1)}°C</T><T col="#00D9FF" s={12}>Voir le profil →</T></View>
      </Card>)}
      {list.length === 0 && <T mu style={{ textAlign: 'center' }}>Aucun astronaute trouvé.</T>}
      <Modal visible={open} transparent animationType="slide" onRequestClose={close}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: '#000A', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: c.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 18, maxHeight: '90%' }}>
            <T b s={20} style={{ marginBottom: 10 }}>Ajouter un astronaute</T>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: 10, paddingBottom: 12 }}>
              {field('Nom complet', 'name')}
              {field('Âge', 'age', { keyboardType: 'number-pad', cap: 'none' })}
              {field('Nationalité', 'country')}
              {field('Fonction dans la mission', 'role')}
              {field('Email de connexion', 'email', { cap: 'none', keyboardType: 'email-address', placeholder: suggested || 'prenom.nom@astrohealth.space' })}
              {field('Mot de passe initial (6 caractères min.)', 'password', { cap: 'none', secureTextEntry: true })}
              {err ? <T s={12} col={crit}>{err}</T> : null}
              <Btn label={busy ? 'Enregistrement…' : 'Enregistrer'} onPress={busy ? () => {} : save} />
              <Btn variant="o" label="Annuler" onPress={close} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
}
