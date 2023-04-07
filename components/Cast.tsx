import { CastType, FormattedCast } from "@/components/Content";
import { formatCastText } from "@/helpers/cast";
import { getDayjsFromDate } from "@/helpers/dayjs";
import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";

const IMGUR_URL = "https://i.imgur.com/";

const formatDate = (date: string): string => {
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

const howLongAgo = (date: string): string => {
  const d = new Date(date);
  const dayjsDate = getDayjsFromDate(d);
  return dayjsDate.fromNow();
};

function formatCast(cast: CastType): FormattedCast {
  let { text, ...rest } = cast;
  let image = undefined;

  if (text.includes(IMGUR_URL)) {
    image = IMGUR_URL + text.split(IMGUR_URL)[1];
    text = text.split(IMGUR_URL)[0];
  }

  return {
    ...rest,
    text,
    body: {
      data: {
        image,
      },
    },
  };
}

export default function Cast({ cast: rawCast }: { cast: CastType }) {
  const cast = formatCast(rawCast);

  return (
    <div className="block rounded-md mx-auto py-6 px-4 bg-purple-100 ">
      <a
        target="_blank"
        rel="noopener"
        href={`https://warpcast.com/${cast.author_username}/${cast.hash.slice(
          0,
          8
        )}`}
        className=""
      >
        <div className="flex flex-row justify-between mb-[1rem]">
          <div className="flex flex-row mr-4">
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
            <div className="text-sm ml-[1rem]">
              <div className="font-bold">{cast.author_display_name}</div>
              <div className="text-gray-600">@{cast.author_username}</div>
            </div>
          </div>
          <div
            className="text-sm text-gray-600 mb-[0.75rem] sm:mb-[0.25rem]"
            title={formatDate(cast.published_at)}
          >
            {howLongAgo(cast.published_at)}
          </div>
        </div>
        <div className="mb-[16px]">{formatCastText(cast.text)}</div>
        {cast.body?.data?.image && (
          <div className="relative h-96 max-w-[100%] ">
            <Image
              fill
              alt=""
              src={cast.body.data.image}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </a>
    </div>
  );
}
