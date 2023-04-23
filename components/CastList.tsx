import Cast from "@/components/Cast";
import useSWR from "swr";

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

export interface FormattedCast extends CastType {
  body: {
    data: {
      image?: string;
    };
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CastList({ selectedTag }: { selectedTag: string }) {
  const { data, error, isLoading } = useSWR(
    `/api/tags/${selectedTag}`,
    fetcher,
    { refreshInterval: 1000 * 60 }
  );

  if (error)
    return (
      <div className="w-[100%] mx-auto lg:w-[650px] lg:ml-[224px]">
        failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className="w-[100%] mx-auto lg:w-[650px] lg:ml-[224px]">
        Loading...
      </div>
    );

  const casts: CastType[] = data.casts;

  if (!selectedTag || casts.length <= 0) {
    return (
      <div className="w-[100%] mx-auto lg:w-[650px] lg:ml-[224px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[100%] mx-auto lg:w-[650px] lg:ml-[224px] lg:overflow-y-auto">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl font-bold"># {selectedTag}</div>
      </div>
      <div className="min-w-[300px] mt-[12px] space-y-4 sm:min-w-[100%]">
        {casts.map((cast) => (
          <Cast key={cast.hash} cast={cast} />
        ))}
      </div>
    </div>
  );
}
