import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonContent } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  connectionId: string;
  currentUserId: string;
  friendId: string;
  friendName: '';
  friendEmail: string;
  msg = '';
  messages = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private videoService: VideoService) { }

  ngOnInit() {
    this.connectionId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = this.authService.getCurrentUserId();
    this.userService.getChatMessages(this.connectionId).subscribe(res => {
      for(let m of res) {
        if (this.messages.filter(msg => msg.id == m.id).length == 0) {
          this.messages.push(m);
        }
      }
      console.log('messages: ', this.messages);
      setTimeout(() => {
        this.content.scrollToBottom(400);
      }, 400)
    });
    this.userService.getConnectionInfo(this.connectionId).subscribe(res => {
      console.log('user ids of connection: ', res.users);
      for(let user of res.users) {
        if(user != this.currentUserId) {
          this.friendId = user;
        }
      }
      this.userService.getUserById(this.friendId).subscribe(res => {
        console.log('friend info: ', res);
        this.friendEmail = res.email;
        this.friendName = res.name;
      })
    });
    
  }
  sendMsg() {
    this.userService.addMessage(this.connectionId, this.msg).then(_ =>{
      this.msg='';
      this.content.scrollToBottom(300);
    })
  }
  async takeImage() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
    });
    if(image) {
      console.log('image: ', image.base64String)
      this.videoService.addImageMsg(image.base64String, this.connectionId);
    }
  }
}
