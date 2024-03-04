import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, Firestore } from 'firebase/firestore';
import { app } from '../firebase/firebase.init';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { FormFiles } from '../interfaces/form-files.interface';

@Injectable({
  providedIn: 'root'
})
export class JudicialCasesService {
  private db: Firestore;
  private storage: FirebaseStorage;

  constructor() {
    this.db = getFirestore(app);
    this.storage = getStorage(app);

  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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

  async addJudicialCaseWithFiles(caseData: any, files: FormFiles): Promise<void> {
    try {
      // Preparar las conversiones de archivo a Base64
      const base64Conversions = [];

      for (const key in files) {
        const typedKey = key as keyof FormFiles;
        const file = files[typedKey];

        if (file) {
          // Convertir cada archivo a Base64
          const base64Promise = this.convertFileToBase64(file).then(base64 => {
            return { key: typedKey, base64 };
          });
          base64Conversions.push(base64Promise);
        }
      }

      // Esperar a que todas las conversiones estén completas
      const convertedFiles = await Promise.all(base64Conversions);

      // Añadir las cadenas Base64 al objeto caseData
      convertedFiles.forEach(({ key, base64 }) => {
        caseData[key] = base64;
      });

      // Guardar los datos del caso, ahora incluyendo los archivos en Base64, en Firestore
      const docRef = await addDoc(collection(this.db, "judicialCases"), caseData);
      console.log("Documento escrito en Firebase con ID: ", docRef.id);
    } catch (e) {
      console.error("Error añadiendo el documento con archivos en Base64: ", e);
      throw e;
    }
  }


  /* async addJudicialCaseWithFiles(caseData: any, files: FormFiles): Promise<void> {
    try {
      const fileUploads: { key: keyof FormFiles; downloadURL: string }[] = [];

      for (const key in files) {
        const typedKey = key as keyof FormFiles; // Asegúrate de que la clave sea del tipo correcto
        const file = files[typedKey];

        if (file) {
          const fileRef = storageRef(this.storage, `judicialCases/${typedKey}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);

          fileUploads.push({ key: typedKey, downloadURL }); // Usamos typedKey que es del tipo correcto
        }
      }

      // Añadir las URLs de descarga al objeto caseData
      fileUploads.forEach(({ key, downloadURL }) => {
        caseData[key] = downloadURL;
      });

      // Guardar los datos del caso en Firestore
      const docRef = await addDoc(collection(this.db, "judicialCases"), caseData);
      console.log("Documento escrito en Firebase con ID: ", docRef.id);
    } catch (e) {
      console.error("Error añadiendo el documento: ", e);
      throw e;
    }
  } */


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

  private async uploadFileAndGetURL(file: File, path: string): Promise<string> {
    const storage = getStorage();
    const fileRef = storageRef(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

}
