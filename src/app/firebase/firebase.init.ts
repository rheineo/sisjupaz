import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

export const app = initializeApp(environment.firebaseConfig);
