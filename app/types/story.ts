import { CEFRLevel } from './dialogue';

export interface StoryWord {
  text: string;
  translation: string[];
}

export interface StorySentence {
  id: string;
  text: string;
  translation: string;
  words: StoryWord[];
}

export interface StoryParagraph {
  id: string;
  sentences: StorySentence[];
}

export interface Story {
  id: string;
  title: string;
  description: string;
  level: CEFRLevel | string;
  topic: string;
  sourceLanguage: string;
  translationLanguage: string;
  wordCount: number;
  estimatedReadingMinutes: number;
  paragraphs: StoryParagraph[];
}

export interface StoryData {
  stories: Story[];
}
