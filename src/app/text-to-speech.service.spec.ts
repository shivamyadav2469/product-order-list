import { TestBed } from '@angular/core/testing';
import { TextToSpeechService } from './text-to-speech.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TextToSpeechService', () => {
  let service: TextToSpeechService;
  let mock: MockAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextToSpeechService]
    });
    service = TestBed.inject(TextToSpeechService);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch audio successfully', async () => {
    const orderText = 'Hello';
    const mockResponse = new ArrayBuffer(1);

    const apiKey = '45b6883666ea481cb913cd920f9e0f40'; 
    const url = `https://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${encodeURIComponent(orderText)}&c=MP3&f=44khz_16bit_stereo`;
    mock.onGet(url).reply(200, mockResponse);

    await service.speak(orderText);

    expect(mock.history['get'].length).toBe(1);
    expect(mock.history['get'][0].url).toBe(url);
  });
});
