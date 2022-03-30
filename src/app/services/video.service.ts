import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

const VIDEO_DIR = "storedVideos";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos = [];

  constructor() { }

  async storeVideo(blob) {
    const fileName = new Date().getTime() + '.mp4';
    const base64Data = await this.convertBlobToBase64(blob) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    // Replace file in array
    this.videos = [];
    this.videos.unshift(savedFile.uri);
    console.log('MY Video Array: ', this.videos);    
  }
  // Helper functions
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);    
  });
  /* async getVideoBase64(fullPath) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data
    });
    return file.data;
  } */
  async getVideoBase64Url(fullPath) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data
    });
    return `data:video/mp4;base64,${file.data}`;
  }

  
}
