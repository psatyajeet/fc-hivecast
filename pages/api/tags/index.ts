// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import supabase from "@/lib/db";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export type TagCount = { tag: string; count: number };

type Data = {
  tags: Array<TagCount>;
};

// This isn't deduped for different capitalizations of the same tag
interface DbTagCount {
  tag: string;
  tag_count: number;
}

export function getMostCommonVersionOfTag(tagVersions: DbTagCount[]): string {
  const mostCommonVersion = _.maxBy(tagVersions, (o) => o.tag_count);

  if (!mostCommonVersion) {
    return tagVersions[0].tag;
  }

  return mostCommonVersion.tag;
}

function getTopTags(
  tags: Record<string, DbTagCount[]>
): Array<{ tag: string; count: number }> {
  // Get the top n tags
  const topTags = Object.entries(tags);

  const formattedTags = topTags.map((tag) => {
    const mostCommonVersion = getMostCommonVersionOfTag(tag[1]);

    // Format the tag using the most commonly used capitalization of the tag and the count
    return { tag: mostCommonVersion, count: _.sumBy(tag[1], "tag_count") };
  });

  return formattedTags;
}

async function getTags(): Promise<Array<{ tag: string; count: number }>> {
  const data = await supabase
    .from("unique_cast_tags")
    .select()
    .gt("tag_count", 1);

  if (data.error) {
    throw data.error;
  }

  const tags = data.data as DbTagCount[];

  // Convert DbTagCount into TagCount and dedupe different capitalizations of the same tag
  const tagToEntries: Record<string, Array<DbTagCount>> = tags.reduce(
    (accumulator, tag) => {
      const lowercaseTag = tag.tag.toLowerCase();
      if (accumulator[lowercaseTag]) {
        accumulator[lowercaseTag].push(tag);
      } else {
        accumulator[lowercaseTag] = [tag];
      }
      return accumulator;
    },
    {} as Record<string, DbTagCount[]>
  );

  const topTags = getTopTags(tagToEntries);

  return topTags;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tags = await getTags();
  return res.status(200).json({
    tags,
  });
}
