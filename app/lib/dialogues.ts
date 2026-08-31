import dailySocial01 from '@/app/src/data/dialogues/A1/daily-social-interaction-a1-01.json';
import dailySocial02 from '@/app/src/data/dialogues/A1/daily-social-interaction-a1-02.json';
import diningSocial from '@/app/src/data/dialogues/A1/dining-social-outings-a1.json';
import essentialServices from '@/app/src/data/dialogues/A1/essential-services-emergencies-a1.json';
import familyRelationships from '@/app/src/data/dialogues/A1/family-relationships-a1.json';
import humanAppearance from '@/app/src/data/dialogues/A1/human-appearance-body-parts-a1.json';
import publicAcademic from '@/app/src/data/dialogues/A1/public-academic-spaces-a1.json';
import { Dialogue } from '@/app/types/dialogue';

const dialogueDatasets = [
  dailySocial01,
  dailySocial02,
  diningSocial,
  essentialServices,
  familyRelationships,
  humanAppearance,
  publicAcademic,
];

export function getAllDialogues(): Dialogue[] {
  const allDialogues: Dialogue[] = [];
  dialogueDatasets.forEach((dataset) => {
    if (dataset && Array.isArray(dataset.dialogues)) {
      allDialogues.push(...(dataset.dialogues as Dialogue[]));
    }
  });
  return allDialogues;
}

export function getRandomDialogues(limit: number = 5): Dialogue[] {
  const all = getAllDialogues();
  // Ensure unique dialogues by ID
  const uniqueMap = new Map<string, Dialogue>();
  all.forEach((dialogue) => {
    if (!uniqueMap.has(dialogue.id)) {
      uniqueMap.set(dialogue.id, dialogue);
    }
  });

  const dialogues = Array.from(uniqueMap.values());
  for (let i = dialogues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dialogues[i], dialogues[j]] = [dialogues[j], dialogues[i]];
  }
  return dialogues.slice(0, Math.min(limit, dialogues.length));
}

export function getRecentDialogues(limit: number = 10): Dialogue[] {
  const dialogues = getAllDialogues();
  return dialogues.slice(0, limit);
}

export function getDialogueById(id: string): Dialogue | undefined {
  return getAllDialogues().find((dialogue) => dialogue.id === id);
}
