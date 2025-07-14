import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NarrationService {
  speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }
}
