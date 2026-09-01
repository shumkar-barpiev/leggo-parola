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

export function getFeaturedStories(limit: number = 3): Story[] {
  const all = getAllStories();
  const uniqueMap = new Map<string, Story>();
  all.forEach((story) => {
    if (!uniqueMap.has(story.id)) {
      uniqueMap.set(story.id, story);
    }
  });

  return Array.from(uniqueMap.values()).slice(0, Math.min(limit, uniqueMap.size));
}

