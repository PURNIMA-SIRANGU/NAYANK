import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {

  async transcribe(audioUrl: string) {

    const response = await axios.post(
      'http://127.0.0.1:8000/transcribe',
      {
        audio_url: audioUrl,
      },
    );

    return response.data;
  }

  async detectLanguage(text: string) {

    const response = await axios.post(
      'http://127.0.0.1:8000/detect-language',
      {
        text,
      },
    );

    return response.data;
  }

  async summarize(text: string) {

    const response = await axios.post(
      'http://127.0.0.1:8000/summarize',
      {
        text,
      },
    );

    return response.data;
  }
}