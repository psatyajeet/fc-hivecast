import Cast from "@/components/Cast";
import { TagCount } from "@/pages/api/tags";
import { useEffect, useState } from "react";

export interface CastType {
  hash: string;
  thread_hash: string;
  parent_hash: string | null;
  author_fid: number;
  author_username: string | null;
  author_display_name: string;
  author_pfp_url: string | null;
  author_pfp_verified: boolean | null;
  text: string;
  published_at: string;
  replies_count: number;
  reactions_count: number;
  recasts_count: number;
  watches_count: number;
  parent_author_fid: number | null;
  parent_author_username: string | null;
  deleted: boolean;
}

export default function Content({
  selectedTag,
  topTags,
}: {
  selectedTag: string;
  topTags: TagCount[];
}) {
  const [casts, setCasts] = useState<CastType[]>([]);

  useEffect(() => {
    async function fetchCasts(tag: string): Promise<{ casts: CastType[] }> {
      const response = await fetch(`/api/tags/${tag}`, {
        method: "GET",
      });

      return response.json();
    }

    if (!selectedTag) {
      return;
    }

    fetchCasts(selectedTag).then((body) => {
      const casts: CastType[] = body.casts;
      setCasts(casts);
    });
  }, [selectedTag]);

  if (!selectedTag) {
    return (
      <div className="grow max-w-prose py-8">
        <div>Select a tag you are interested in!</div>
      </div>
    );
  }

  return (
    <div className="grow max-w-prose py-8">
      <div className="space-y-8">
        <div>{selectedTag}</div>
        {casts.map((cast) => (
          <Cast key={cast.hash} cast={cast} />
        ))}
      </div>
    </div>
  );
}
