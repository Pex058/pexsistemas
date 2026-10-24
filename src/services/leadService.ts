import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { VisitRecord, ClickRecord } from '../utils/metrics';

const visitsCollection = collection(db, 'visits');
const clicksCollection = collection(db, 'clicks');

export async function getAllVisits(maxLimit: number = 1500): Promise<VisitRecord[]> {
  try {
    const q = query(visitsCollection, orderBy('createdAt', 'desc'), limit(maxLimit));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as VisitRecord[];
  } catch (err) {
    console.warn('Erro ao carregar visitas:', err);
    return [];
  }
}

export async function getAllClicks(maxLimit: number = 1500): Promise<ClickRecord[]> {
  try {
    const q = query(clicksCollection, orderBy('createdAt', 'desc'), limit(maxLimit));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as ClickRecord[];
  } catch (err) {
    console.warn('Erro ao carregar cliques:', err);
    return [];
  }
}

export async function deleteVisit(visitId: string): Promise<void> {
  const docRef = doc(db, 'visits', visitId);
  await deleteDoc(docRef);
}

export async function deleteClick(clickId: string): Promise<void> {
  const docRef = doc(db, 'clicks', clickId);
  await deleteDoc(docRef);
}
