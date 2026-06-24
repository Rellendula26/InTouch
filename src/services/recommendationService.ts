import { CallLog, Contact } from "../types/models";

export interface RecommendationContext {
  contacts: Contact[];
  selectedCircleIds: string[];
  callLogs: CallLog[];
}

export interface RecommendationService {
  pickContacts(context: RecommendationContext, count: number, excludeIds?: string[]): Contact[];
}

const shuffle = <T>(items: T[]): T[] => {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const current = cloned[i]!;
    cloned[i] = cloned[randomIndex]!;
    cloned[randomIndex] = current;
  }
  return cloned;
};

export class RandomRecommendationService implements RecommendationService {
  pickContacts(context: RecommendationContext, count: number, excludeIds: string[] = []): Contact[] {
    const selectedSet = new Set(context.selectedCircleIds);
    const excluded = new Set(excludeIds);

    const eligible = context.contacts.filter((contact) => {
      if (excluded.has(contact.id)) {
        return false;
      }
      if (!selectedSet.size) {
        return true;
      }
      return contact.circles.some((circleId) => selectedSet.has(circleId));
    });

    return shuffle(eligible).slice(0, count);
  }
}

export const recommendationService: RecommendationService = new RandomRecommendationService();
