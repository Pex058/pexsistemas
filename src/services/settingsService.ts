import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const SETTINGS_DOC_ID = 'general';

export interface AppSettings {
  pixelId?: string;
  [key: string]: any;
}

export async function getSettings(): Promise<AppSettings> {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as AppSettings;
    }
    return { pixelId: '' };
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    return { pixelId: '' };
  }
}

export async function updateSettings(data: AppSettings): Promise<void> {
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
  await setDoc(docRef, data, { merge: true });
}
