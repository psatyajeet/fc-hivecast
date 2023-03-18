// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import supabase from "@/lib/db";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export type TagCount = { tag: string; count: number };

type Data = {
  tags: Array<TagCount>;
};

export function getMostCommonVersionOfTag(tagVersions: string[]) {
  const versionCounts = Object.entries(_.countBy(tagVersions));
  const mostCommonVersion = _.maxBy(versionCounts, (o) => o[1]);

  if (!mostCommonVersion) {
    return tagVersions[0];
  }

  return mostCommonVersion[0];
}

function getTopNTags(
  tags: Record<string, string[]>,
  n: number
): Array<{ tag: string; count: number }> {
  // Get the top n tags
  const topTags = Object.entries(tags).sort((a, b) => {
    return b[1].length - a[1].length;
  });

  const formattedTags = topTags.map((tag) => {
    const mostCommonVersion = getMostCommonVersionOfTag(tag[1]);

    // Format the tag using the most commonly used capitalization of the tag and the count
    return { tag: mostCommonVersion, count: tag[1].length };
  });

  return formattedTags;
}

async function getTags() {
  const tags = await supabase.from("cast_tags").select();
  if (tags.error) {
    throw tags.error;
  }

  // Aggregate an array of the occurrences of each tag
  const tagToEntries = tags.data.reduce((accumulator, tag) => {
    const tagContent: string = tag.tag;
    const lowercaseTag = tagContent.toLowerCase();
    if (accumulator[lowercaseTag]) {
      accumulator[lowercaseTag].push(tagContent);
    } else {
      accumulator[lowercaseTag] = [tagContent];
    }
    return accumulator;
  }, {});

  const topTags = getTopNTags(tagToEntries, 100);

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
