import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  getApiKey() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://api.voicerss.org/';
  private apiKey = '45b6883666ea481cb913cd920f9e0f40'; 
  constructor() { }

  async speak(orderText: string): Promise<void> {
    try {
    
      const encodedText = encodeURIComponent(orderText);
      
      const url = `${this.apiUrl}?key=${this.apiKey}&hl=en-us&src=${encodedText}&c=MP3&f=44khz_16bit_stereo`;

      console.log(`Fetching audio from: ${url}`);

      const response = await axios.get(url, {
        responseType: 'arraybuffer' 
      });

      if (response.status === 200 && response.data.byteLength > 0) {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);
        console.log(`Audio URL: ${audioUrl}`);

        const audio = new Audio(audioUrl);

        audio.oncanplaythrough = () => {
          console.log('Audio is ready to play');
          audio.play()
            .then(() => console.log('Audio played successfully'))
            .catch(error => console.error('Error playing audio:', error));
        };

        audio.onerror = (event) => {
          console.error('Error loading audio:', event);
        };

        audio.onended = () => {
          console.log('Audio playback finished');
        };
      } else {
        throw new Error('Invalid response from Text-to-Speech API');
      }
    } catch (error) {
      console.error('Error with text-to-speech API:', error);
    }
  }
}
