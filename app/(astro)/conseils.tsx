import React from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, Btn } from '../../components/ui';
import { useStore } from '../../store';
import { crit } from '../../theme';
const ADV: any = {
  faible: [['Repos et hydratation', "Bois un verre d'eau et repose-toi quelques minutes."], ['Surveille tes constantes', 'Refais une mesure dans 2 heures.'], ["Reprends l'effort", "Reprends l'exercice progressivement."], ['Zone habituelle', 'Aucune précaution particulière de zone.']],
  modéré: [['Repos et hydratation', "Prévois 30 min de repos et bois 500 ml d'eau dans l'heure."], ['Surveille tes constantes', 'Refais une mesure dans 30 minutes et note tout changement.'], ["Limite l'effort", "Reporte l'exercice intense jusqu'à amélioration."], ['Zone protégée', 'Si possible, reste dans la zone la mieux blindée du vaisseau.']],
  élevé: [['Repos immédiat', "Arrête toute activité et installe-toi au calme."], ['Prends tes constantes', 'Mesure FC, SpO₂ et température maintenant.'], ['Hydratation', "Bois 500 ml d'eau lentement."], ['Zone protégée', 'Rejoins la zone la mieux blindée du vaisseau.']],
};
export default function Conseils() {
  const r = useRouter(); const { analysis: a, saved, addHistory, addAlert, setScore, userId } = useStore();
  if (!a) return <Screen title="Conseils"><Card style={{ gap: 10 }}><T mu>Lance d'abord une analyse.</T><Btn label="Déclarer un symptôme" onPress={() => r.navigate('/symptomes')} /></Card></Screen>;
  const sev = a.level === 'élevé' ? 'critique' : a.level === 'modéré' ? 'avertissement' : 'info';
  const contact = () => { addAlert('Demande de contact', `${a.symptoms.join(', ')} · score ${a.score.toFixed(2)}`, a.level === 'faible' ? 'avertissement' : 'critique'); Alert.alert('Médecin de vol', 'Demande envoyée. Le médecin de vol va te contacter (démo).'); };
  const save = () => { if (!saved) { addHistory(a.symptoms.join(', '), a.score, 'Conseils suivis · ' + (sev === 'info' ? 'médecin non requis' : 'médecin informé'), 'ia'); if (userId) setScore(userId, a.score); if (sev !== 'info') addAlert('Symptômes déclarés', `${a.symptoms.join(', ')} · intensité ${a.intensity}/10`, sev); } r.navigate('/historique'); };
  return (
    <Screen title="Conseils" sub={`Pour ton niveau : ${a.level}`} back onBack={() => r.navigate('/analyse')}>
      {ADV[a.level].map(([t, d]: string[], i: number) => <Card key={t} style={{ flexDirection: 'row', gap: 12 }}><View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: '#1769FF33', alignItems: 'center', justifyContent: 'center' }}><T b col="#00D9FF">{i + 1}</T></View><View style={{ flex: 1 }}><T b>{t}</T><T mu s={12}>{d}</T></View></Card>)}
      <Card color={crit} style={{ backgroundColor: '#2A1420' }}><T b>Contacte le médecin de vol si…</T><T mu s={12}>douleur thoracique, essoufflement, vision trouble ou aggravation rapide.</T></Card>
      <Btn label="Contacter le médecin de vol" onPress={contact} />
      <Btn variant="o" label={saved ? 'Voir mon historique' : 'Enregistrer dans mon historique'} onPress={save} />
      <T s={11} col="#FFAA33" style={{ textAlign: 'center' }}>Conseils généraux de démonstration · ne remplacent pas un avis médical</T>
    </Screen>
  );
}
