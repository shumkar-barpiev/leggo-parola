export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface DialogueWord {
  text: string;
  translation: string[];
}

export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  translation: string;
  words: DialogueWord[];
}

export interface Dialogue {
  id: string;
  title: string;
  description: string;
  level: CEFRLevel | string;
  topic: string;
  sourceLanguage: string;
  translationLanguage: string;
  lines: DialogueLine[];
}

export interface DialogueData {
  dialogues: Dialogue[];
}
