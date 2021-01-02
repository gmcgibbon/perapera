import { filter, find as lodashFind } from "lodash";
import daysOfTheWeek from "./lessons/days-of-the-week";
import kanji from "./lessons/kanji";

type Resource = {
  [key: string]: any;
  id: string;
}

function db<TResource extends Resource>(collection: TResource[]) {
  const where = function(attributes: Partial<TResource> = {}) {
    return filter(collection, (item) => {
      return Object.entries(attributes).every(([key, value]) => item[key] == value);
    });
  }
  const find = function(id: string) {
    return lodashFind(collection, (item) => item.id == id);
  }

  return { where, find };
}

const lessonDb = db([
  daysOfTheWeek,
  kanji,
]);

export { lessonDb };
