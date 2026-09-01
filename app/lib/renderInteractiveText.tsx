import React from 'react';
import { DialogueWord } from '@/app/types/dialogue';
import { StoryWord } from '@/app/types/story';
import Word from '@/app/components/reader/Word';

export function renderInteractiveText(
  text: string,
  words: (DialogueWord | StoryWord)[]
): React.ReactNode {
  if (!words || words.length === 0) {
    return text;
  }

  const nodes: React.ReactNode[] = [];
  let currentIndex = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const matchIndex = text.indexOf(word.text, currentIndex);

    if (matchIndex === -1) {
      nodes.push(
        <Word key={`word-${i}-${word.text}`} word={word} />
      );
      continue;
    }

    // Append preceding characters (punctuation, whitespace)
    if (matchIndex > currentIndex) {
      nodes.push(
        <React.Fragment key={`text-before-${i}-${currentIndex}`}>
          {text.slice(currentIndex, matchIndex)}
        </React.Fragment>
      );
    }

    // Append interactive word
    nodes.push(
      <Word key={`word-${i}-${word.text}`} word={word} />
    );

    currentIndex = matchIndex + word.text.length;
  }

  // Append any trailing punctuation or whitespace
  if (currentIndex < text.length) {
    nodes.push(
      <React.Fragment key={`text-trailing-${currentIndex}`}>
        {text.slice(currentIndex)}
      </React.Fragment>
    );
  }

  return nodes;
}
