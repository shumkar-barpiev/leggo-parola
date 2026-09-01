import stories01 from '@/app/src/data/stories/stories-01.json';
import { Story } from '@/app/types/story';

const storyDatasets = [
  stories01,
];

export function getAllStories(): Story[] {
  const allStories: Story[] = [];
  storyDatasets.forEach((dataset) => {
    if (dataset && Array.isArray(dataset.stories)) {
      allStories.push(...(dataset.stories as Story[]));
    }
  });
  return allStories;
}

export function getStoryById(id: string): Story | undefined {
  return getAllStories().find((story) => story.id === id);
}
