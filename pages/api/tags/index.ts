// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import supabase from "@/lib/db";
import { query } from "@/lib/postgres";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export type TagCount = { tag: string; count: number };

type Data = {
  tags: TagCount[];
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

function getTopTags(tags: DbTagCount[]): TagCount[] {
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

  const topTags = Object.entries(tagToEntries);

  const formattedTags = topTags
    .map((tag) => {
      const count = _.sumBy(tag[1], "tag_count");
      const mostCommonVersion = getMostCommonVersionOfTag(tag[1]);

      // Format the tag using the most commonly used capitalization of the tag and the count
      return { tag: mostCommonVersion, count };
    })
    .filter((tag) => tag.count > 1); // filter out tags with less than one cast

  formattedTags.sort((a, b) => b.count - a.count);

  return formattedTags;
}

const PAGE_LIMIT = 1000;

async function getUniqueCastTags(): Promise<DbTagCount[]> {
  const dataCount = await supabase
    .from("unique_cast_tags")
    .select("*", { count: "exact", head: true });

  if (dataCount.error || !dataCount.count) {
    throw dataCount.error;
  }

  const count = dataCount.count;

  let tags = [] as DbTagCount[];

  for (let i = 0; i < count; i += PAGE_LIMIT) {
    const data = await supabase
      .from("unique_cast_tags")
      .select()
      .range(i, i + PAGE_LIMIT);

    if (data.error || !data.data) {
      throw data.error;
    }

    tags = tags.concat(data.data as DbTagCount[]);
  }

  return tags;
}

async function getLatestUniqueCastTags(
  lookbackHours: number
): Promise<DbTagCount[]> {
  const data: { rows: Array<{ tag: string; tag_count: string }> } = await query(
    `SELECT 
      tag, \
      COUNT(*) as tag_count \
    FROM cast_tags \
    WHERE cast_tags.published_at >= NOW() - INTERVAL '${lookbackHours} HOUR' \
    GROUP BY tag \
    ORDER BY tag_count \
    DESC `
  );

  if (!data) {
    throw new Error(`Failed to get latest ${lookbackHours} unique cast tags`);
  }

  const { rows } = data;
  const formattedRows = rows.map((row) => {
    return { tag: row.tag, tag_count: parseInt(row.tag_count) };
  });

  return formattedRows;
}

export async function getTags(lookbackHours?: number): Promise<TagCount[]> {
  const tags = lookbackHours
    ? await getLatestUniqueCastTags(lookbackHours)
    : await getUniqueCastTags();

  const topTags = getTopTags(tags);
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
