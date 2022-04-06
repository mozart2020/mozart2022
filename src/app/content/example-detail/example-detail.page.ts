import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-example-detail',
  templateUrl: './example-detail.page.html',
  styleUrls: ['./example-detail.page.scss'],
})
export class ExampleDetailPage implements OnInit {
  @ViewChild('studentVideo') studentVideo: ElementRef
  @ViewChild('feedbackVideo01') feedbackVideo01: ElementRef
  @ViewChild('feedbackVideo02') feedbackVideo02: ElementRef
  @ViewChild('feedbackVideo03') feedbackVideo03: ElementRef
  
  //to control the timeline of student video
  timeline: string = "0%"; //controls width of timeline-div
  html5Controls: boolean = true;

  //fo set position of feedback markers (width of respective div-tags):
  timelineMarker01: string = "22%";
  timelineMarker02: string = "51%";
  timelineMarker03: string = "75%";
  // marker01Background: string = ''; --maybe some action
  // marker02Background: string = '';   wenn timeline
  // marker03Background: string = '';   passes marker

  //cotroll buttons disabled:
  goToBeginButton: boolean = false;
  backwardButton: boolean = false;
  playPauseButton: boolean = false;
  forwardButton: boolean = false;
  //switch play/pause button:
  playButtonStatus: boolean = true;
  //play buttons feedback videos disabled:
 /*  playBtn01Disabled: boolean = true;
  playBtn02Disabled: boolean = true;
  playBtn03Disabled: boolean = true; */
  
  feedbackInfo01Status: string = "feedbackInfoInactive"
  feedbackInfo02Status: string = "feedbackInfoInactive"
  feedbackInfo03Status: string = "feedbackInfoInactive"
  //für *ngIf in den Feedback-Info-Divs
    //zum Hiden der anderen Feedbacks
      //wenn ein ein Feedbackvideo angesehen wird
  feedbackInfo01Visible = true;
  feedbackInfo02Visible = true;
  feedbackInfo03Visible = true;
  //für *ngIf in den Videotags der Feedback Videos:  
  feedbackVideo01Visible = false;
  feedbackVideo02Visible = false;
  feedbackVideo03Visible = false;

  constructor() { }

  ngOnInit() {
  }
 //Timeline des student videos:
 onTimeUpdate(event: any) {
  this.timeline = `${ //property timeline ist die width in % des Timeline-Divs
    this.studentVideo.nativeElement.currentTime
    /this.studentVideo.nativeElement.duration
    *100}%`;
  
  /* ---eventuell goToBeginButton bei currentTime == ca. 0 disabeln
      ---!!! bug-spoiler-alarm, didn't really work:
  if (this.studentVideo.nativeElement.currentTime > 0.3
      && this.goToBeginButton == true) {
    this.goToBeginButton = false;
  } else if (this.studentVideo.nativeElement.currentTime < 0.3
      && this.goToBeginButton ==false) {
    this.goToBeginButton = true;
  }*/


   /*maybe:if timeline of student video passes marker, background will be filled:
     //maybe animated with fade in transpaerncy
     //or play button will be activated:
  if (this.studentVideo.nativeElement.currentTime > 11
      && this.studentVideo.nativeElement.currentTime < 13) {
      console.log('marker passed');
      this.playBtn01Disabled = false;  
    } else {
      this.playBtn01Disabled = true;  
    }
  if (this.studentVideo.nativeElement.currentTime > 27
      && this.studentVideo.nativeElement.currentTime < 29) {
      console.log('marker passed');
      this.playBtn02Disabled = false; 
    } else {
      this.playBtn02Disabled = true;
    }
    if (this.studentVideo.nativeElement.currentTime > 40
      && this.studentVideo.nativeElement.currentTime < 42) {
      console.log('marker passed');
      this.playBtn03Disabled = false; 
    } else {
      this.playBtn03Disabled = true;
    }*/
}
//control buttons begin
playPauseStudentVideo() {
  if (this.studentVideo.nativeElement.paused == true) {
    this.studentVideo.nativeElement.play();
    console.log(this.studentVideo.nativeElement.duration);
    //this.cleanEnabledPlayBtns();
    this.cleanFeedbackInfoStatus()
  }
  else {     
    this.studentVideo.nativeElement.pause();
    console.log(this.studentVideo.nativeElement.duration);
    //this.cleanEnabledPlayBtns();  
    this.cleanFeedbackInfoStatus()
  }
}

backwardStudentVideo() {
  if(this.studentVideo.nativeElement.currentTime < 5.5) {
    this.studentVideo.nativeElement.currentTime = 0;
  } else {
    this.studentVideo.nativeElement.currentTime -= 5;
    //this.cleanEnabledPlayBtns();
    this.cleanFeedbackInfoStatus()
  }
}
forwardStudentVideo() {
  if(this.studentVideo.nativeElement.currentTime 
      > this.studentVideo.nativeElement.duration - 5.5) {
    this.studentVideo.nativeElement.currentTime
      = this.studentVideo.nativeElement.duration;
  } else {
    this.studentVideo.nativeElement.currentTime += 5;
    //this.cleanEnabledPlayBtns();
    this.cleanFeedbackInfoStatus()
  }
}

disableControlButtons() {
  this.goToBeginButton = true;
  this.backwardButton = true;
  this.playPauseButton = true;
  this.forwardButton = true;
}
enableControlButtons() {
  this.goToBeginButton = false;
  this.backwardButton = false;
  this.playPauseButton = false;
  this.forwardButton = false;
}

goToBeginStudentVideo() {
  this.studentVideo.nativeElement.currentTime = 0;
  //this.cleanEnabledPlayBtns();
  this.cleanFeedbackInfoStatus()
}

//control buttons end

/* cleanEnabledPlayBtns() {
  if(this.playBtn01Disabled == false) {
    this.playBtn01Disabled = true;
  }
  if(this.playBtn02Disabled == false) {
    this.playBtn02Disabled = true;
  }
  if(this.playBtn03Disabled == false) {
    this.playBtn03Disabled = true;
  }
} */
cleanFeedbackInfoStatus() {
  if(this.feedbackInfo01Status == "feedbackInfo") {
    this.feedbackInfo01Status = "feedbackInfoInactive"
  }
  if(this.feedbackInfo02Status == "feedbackInfo") {
    this.feedbackInfo02Status = "feedbackInfoInactive"
  }
  if(this.feedbackInfo03Status == "feedbackInfo") {
    this.feedbackInfo03Status = "feedbackInfoInactive"
  }
}

//in case student video is playing, it should be stopped when playing a playback video:
    //Pause Feebackvideos if playing
stopPlayingFeedbackVideo01() {
  if(this.feedbackVideo01.nativeElement.paused == false) {
    this.feedbackVideo01.nativeElement.pause();
  }
}
stopPlayingFeedbackVideo02() {
  if(this.feedbackVideo02.nativeElement.paused == false) {
    this.feedbackVideo02.nativeElement.pause();
  }
}
stopPlayingFeedbackVideo03() {
  if(this.feedbackVideo03.nativeElement.paused == false) {
    this.feedbackVideo03.nativeElement.pause();
  }
}
//first check if video-tag is there, then pause video if playing
stopPlayingFeedbackVideos() {
  if (this.feedbackInfo01Visible == true) {
    this.stopPlayingFeedbackVideo01();
  }
  if (this.feedbackVideo02Visible == true) {
    this.stopPlayingFeedbackVideo02();
  }
  if (this.feedbackInfo03Visible == true) {
    this.stopPlayingFeedbackVideo03();
  }
}
onPlayStudentVideo(){
  this.playButtonStatus = false;
  if (this.feedbackVideo01Visible == false && this.feedbackVideo02Visible == false && this.feedbackVideo03Visible == false) {
    //this.cleanEnabledPlayBtns();
    this.cleanFeedbackInfoStatus()
  } //if a feedback video is open, of course Button should not be disabled
  this.stopPlayingFeedbackVideos();
}
onPauseStudentVideo() {
  this.playButtonStatus = true;
}
//in case a playback video is playing, it should be stopped when playing the student video:
onPlayFeedbackVideo() {
  this.stopPlayingStudentVideo();
}
stopPlayingStudentVideo() {
  if (this.studentVideo.nativeElement.paused == false) {
    this.studentVideo.nativeElement.pause();
  }
}
/////Event "seeking" inkludiert auch das Setzen der Timline in chooseFeedback()
////daher: die Funktion cleanEnablePlayBtns()
///        durch onSeekingStudentVideo() ersetzen (asynchron mit await)
// onSeekingStudentVideo() {
//   if(this.studentVideo.nativeElement.currentTime == 12
//     || this.studentVideo.nativeElement.currentTime == 28
//     || this.studentVideo.nativeElement.currentTime == 41){
//   } else {
//     this.cleanEnabledPlayBtns();
//   }
// }

  //Funktionen für Feedback 1
chooseFeedback01() {        
  //this.cleanEnabledPlayBtns();
  this.cleanFeedbackInfoStatus();
  this.stopPlayingStudentVideo();
  //this.playBtn01Disabled = false;
  this.timeline = '22%';
  this.studentVideo.nativeElement.currentTime = 12;
  this.feedbackInfo01Status = "feedbackInfo";
}
openCloseFeedbackVideo01() {
  if (this.feedbackVideo01Visible == false) {
    this.feedbackVideo01Visible = true;
    this.feedbackInfo02Visible = false;
    this.feedbackInfo03Visible = false;
    this.disableControlButtons();
    this.html5Controls = false;
  } else {
    this.stopPlayingStudentVideo();
    this.feedbackVideo01Visible = false;
    this.feedbackInfo02Visible = true;
    this.feedbackInfo03Visible = true;
    this.enableControlButtons();
    this.html5Controls = true;
  }
}

//Funktionen für Feedback 2
chooseFeedback02() {
  //this.cleanEnabledPlayBtns();
  this.cleanFeedbackInfoStatus();
  this.stopPlayingStudentVideo();
  //this.playBtn02Disabled = false;
  this.timeline = '51%';
  this.studentVideo.nativeElement.currentTime = 28;
  this.feedbackInfo02Status = "feedbackInfo";
}
openCloseFeedbackVideo02() {
  if (this.feedbackVideo02Visible == false) {
    this.feedbackVideo02Visible = true;
    this.feedbackInfo01Visible = false;
    this.feedbackInfo03Visible = false;
    this.disableControlButtons();
    this.html5Controls = false;
  } else {
    this.stopPlayingStudentVideo();
    this.feedbackVideo02Visible = false;
    this.feedbackInfo01Visible = true;
    this.feedbackInfo03Visible = true;
    this.enableControlButtons();
    this.html5Controls = true;
  }
}

//Funktionen für Feedback 3
chooseFeedback03() {
  //this.cleanEnabledPlayBtns();
  this.cleanFeedbackInfoStatus();
  this.stopPlayingStudentVideo();
  //this.playBtn03Disabled = false;
  this.timeline = '75%';
  this.studentVideo.nativeElement.currentTime = 41;
  this.feedbackInfo03Status = "feedbackInfo";
}
openCloseFeedbackVideo03() {
  if (this.feedbackVideo03Visible == false) {
    this.feedbackVideo03Visible = true;
    this.feedbackInfo01Visible = false;
    this.feedbackInfo02Visible = false;
    this.disableControlButtons();
    this.html5Controls = false;
  } else {
    this.stopPlayingStudentVideo();
    this.feedbackVideo03Visible = false;
    this.feedbackInfo01Visible = true;
    this.feedbackInfo02Visible = true;
    this.enableControlButtons();
    this.html5Controls = true;
  }
}
}
