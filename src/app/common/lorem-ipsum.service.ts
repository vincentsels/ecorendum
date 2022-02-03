import { Injectable } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

const MIN_SENTENCES_PER_PARAGRAPH = 4;
const MAX_SENTENCES_PER_PARAGRAPH = 8;
const MIN_WORDS_PER_SENTENCE = 4;
const MAX_WORDS_PER_SENTENCE = 16;
const MIN_PARAGRAPHS = 2;
const MAX_PARAGRAPHS = 4;

@Injectable()
export class LoremIpsumService {
  lorem: LoremIpsum;

  constructor() {
    this.lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: MAX_SENTENCES_PER_PARAGRAPH,
        min: MIN_SENTENCES_PER_PARAGRAPH
      },
      wordsPerSentence: {
        max: MAX_WORDS_PER_SENTENCE,
        min: MIN_WORDS_PER_SENTENCE
      },
    });

    this.lorem.suffix = '\n\n';
  }

  generateWords = (x?: number) => this.lorem.generateWords(x);
  generatSentences = (x?: number) => this.lorem.generateSentences(x);
  generateParagraphs = (x?: number) => this.lorem.generateParagraphs(x || this.randomIntFromInterval(MIN_PARAGRAPHS, MAX_PARAGRAPHS));

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
