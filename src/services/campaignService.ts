import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const campaignsCollection = collection(db, 'campaigns');
const LOCAL_STORAGE_KEY = 'pex_saved_campaigns';

export interface CampaignItem {
  id?: string;
  name: string;
  channel: string;
  url: string;
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  timestamp?: any;
  createdAt?: string;
}

export async function createCampaign(payload: Omit<CampaignItem, 'id'>): Promise<string> {
  const data = {
    ...payload,
    timestamp: serverTimestamp(),
    createdAt: new Date().toISOString(),
  };

  let firestoreId: string;
  try {
    const docRef = await addDoc(campaignsCollection, data);
    firestoreId = docRef.id;
  } catch (err) {
    console.warn('Erro ao salvar campanha no Firestore:', err);
    firestoreId = 'camp_' + Date.now();
  }

  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    local.unshift({ id: firestoreId, ...data });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local.slice(0, 50)));
  } catch {
    // silent
  }

  return firestoreId;
}

export async function getAllCampaigns(maxLimit: number = 50): Promise<CampaignItem[]> {
  try {
    const q = query(campaignsCollection, orderBy('createdAt', 'desc'), limit(maxLimit));
    const snap = await getDocs(q);
    const fromFirestore = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as CampaignItem[];

    if (fromFirestore.length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fromFirestore));
      } catch {
        // silent
      }
      return fromFirestore;
    }
  } catch (e) {
    console.warn('Erro ao ler campanhas do Firestore, lendo local:', e);
  }

  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export async function deleteCampaign(campaignId: string): Promise<void> {
  try {
    const docRef = doc(db, 'campaigns', campaignId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Erro ao remover campanha do Firestore:', err);
  }

  try {
    const local: CampaignItem[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const filtered = local.filter((item) => item.id !== campaignId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // silent
  }
}
