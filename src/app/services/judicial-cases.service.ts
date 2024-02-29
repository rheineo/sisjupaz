import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, Firestore } from 'firebase/firestore';
import { app } from '../firebase/firebase.init';

@Injectable({
  providedIn: 'root'
})
export class JudicialCasesService {
  private db: Firestore;

  constructor() {
    this.db = getFirestore(app);
  }

  // Agregar un nuevo caso judicial
  async addJudicialCase(caseData: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.db, "judicialCases"), caseData);
      console.log("Documento escrito en Firebase con ID: ", docRef.id);
    } catch (e) {
      console.error("Error añadiendo el documento: ", e);
      throw e;
    }
  }

  // Obtener todos los casos judiciales
  async getJudicialCases(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(this.db, "judicialCases"));
      const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Obteniendo los casos judiciales desde Firebase", result)
      return result;
    } catch (e) {
      console.error("Error obteniendo documentos: ", e);
      throw e;
    }
  }
}
