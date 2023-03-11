// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import supabase from "@/lib/db";
import { getMostCommonVersionOfTag } from "@/pages/api/tags";
import type { NextApiRequest, NextApiResponse } from "next";

type Cast = {
  hash: string;
  author_fid: number;
  author_username: string;
  author_display_name: string;
  text: string;
  published_at: string;
  author_pfp_url: string;
};

type Data = {
  tag: string;
  casts: Cast[];
};

type Error = {
  error: string;
};

function formatCastsFromSupabase(casts: any[]): Cast[] {
  const castHashes: Set<string> = new Set();
  const formattedCasts: Array<Cast> = [];

  for (const cast of casts) {
    if (castHashes.has(cast.hash) || cast.deleted) {
      continue;
    }
    const formattedCast = {
      hash: cast.hash as string,
      author_fid: cast.author_fid as number,
      author_username: cast.author_username as string,
      author_display_name: cast.author_display_name as string,
      text: cast.text as string,
      published_at: cast.published_at as string, // 2023-01-30T05:05:33.698+00:00
      author_pfp_url: cast.author_pfp_url as string,
    };

    castHashes.add(cast.hash);
    formattedCasts.push(formattedCast);
  }

  const sortedCasts = formattedCasts.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return sortedCasts;
}

async function getPostsByTag(tag: string): Promise<Data> {
  const tags = await supabase
    .from("cast_tags")
    .select(`tag, casts (*)`)
    .ilike("tag", tag)
    .order("published_at", { ascending: false })
    .limit(100);

  if (tags.error) {
    throw tags.error;
  }

  const { data } = tags;

  const mostCommonVersion = getMostCommonVersionOfTag(
    data.map((tag) => tag.tag)
  );

  const casts = formatCastsFromSupabase(data.map((tag) => tag.casts));

  return { tag: mostCommonVersion, casts };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Missing tag slug" });
  }

  if (Array.isArray(slug)) {
    return res.status(400).json({ error: "Slug should be a single value" });
  }

  const postsByTag = await getPostsByTag(slug);
  return res.status(200).json(postsByTag);
}
