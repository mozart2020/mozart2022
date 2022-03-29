import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

const VIDEO_DIR = "storedVideos";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos = [];
  private VIDEOS_KEY: string = 'videos';

  constructor() { }

  async storeVideo(blob) {
    const fileName = 'mozart_' + new Date().getTime() + '.mp4';
    const base64Data = await this.convertBlobToBase64(blob) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    // Add file to local array
    this.videos.unshift(savedFile.uri);
    console.log('MY Video Array: ', this.videos);
    
  }
  // Helper function
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);    
  });
  async getVideoUrl(fullPath) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    console.log('function video.service: getVideoUrl(), const path: ', path);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data
    });
    console.log('function video.service: getVideoUrl(), const file: ', file);
    return `data:video/mp4;base64,${file.data}`;
  }
  
  async loadVideos() {
    return this.videos;
  }
}
