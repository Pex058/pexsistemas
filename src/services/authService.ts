import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export async function login(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  try {
    localStorage.setItem('pex_is_admin', 'true');
    sessionStorage.setItem('pex_is_admin', 'true');
  } catch (err) {
    void err;
  }
  return cred;
}

export async function logout() {
  try {
    localStorage.removeItem('pex_is_admin');
    sessionStorage.removeItem('pex_is_admin');
  } catch (err) {
    void err;
  }
  return signOut(auth);
}
