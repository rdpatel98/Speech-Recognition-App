import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition:any
@Injectable({
  providedIn: 'root'
})
export class VoiceRecogService {

  recognition: any;
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: any = '';


  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      this.text = transcript


    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error occurred: ', event.error);
    };
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
  }

  init() {
    this.recognition.interimResult = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0].transcript)
        .join('');
      this.tempWords = transcript;
    });
  }

  resettranscript(){
    this.recognition.stop();
    this.text = ''
  }

}
