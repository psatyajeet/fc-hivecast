import { CastType } from "@/components/Content";
import * as Avatar from "@radix-ui/react-avatar";

const formatDate = (date: string): string => {
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

export default function Cast({ cast }: { cast: CastType }) {
  return (
    <div className="container flex flex-row mx-auto px-4">
      <div className="mr-4">
        <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          {cast.author_pfp_url && (
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={cast.author_pfp_url}
            />
          )}
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            {cast.author_display_name[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div className="w-[100%]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="text-sm font-bold mr-2">
              {cast.author_display_name}
            </div>
            <div className="text-sm text-gray-600">@{cast.author_username}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {formatDate(cast.published_at)}
            </div>
          </div>
        </div>
        <div>{cast.text}</div>
      </div>
    </div>
  );
}
