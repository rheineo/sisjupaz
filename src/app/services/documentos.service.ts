import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/firebase.init';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private storage = getStorage(app);

  constructor() {}

  // Subir archivo a Firebase Storage
  async uploadFile(filePath: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, filePath);
    try {
      const uploadResult = await uploadBytes(storageRef, file);
      console.log('Archivo subido con éxito a Firebase:', uploadResult);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir archivo a Firebase:', error);
      throw error;
    }
  }
}
