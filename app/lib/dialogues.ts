import dailyData from '@/app/src/data/dialogues/daily.json';
import { Dialogue } from '@/app/types/dialogue';

export function getAllDialogues(): Dialogue[] {
  return dailyData.dialogues as Dialogue[];
}

export function getRandomDialogues(limit: number = 5): Dialogue[] {
  const dialogues = [...getAllDialogues()];
  for (let i = dialogues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dialogues[i], dialogues[j]] = [dialogues[j], dialogues[i]];
  }
  return dialogues.slice(0, limit);
}

export function getRecentDialogues(limit: number = 10): Dialogue[] {
  const dialogues = getAllDialogues();
  return dialogues.slice(0, limit);
}

export function getDialogueById(id: string): Dialogue | undefined {
  return getAllDialogues().find((dialogue) => dialogue.id === id);
}
