import Search from "@/components/Search";
import { TagCount } from "@/pages/api/tags";
import * as Separator from "@radix-ui/react-separator";

export default function Sidebar({
  topTags,
  savedTags,
  setSelectedTag,
  setSavedTags,
}: {
  topTags: Array<TagCount>;
  savedTags: Set<string>;
  setSelectedTag: any;
  setSavedTags: any;
}) {
  return (
    <div className="flex flex-col w-[200px] py-8 mr-[24px]">
      {/* <h1 className="text-3xl font-bold">Hivecaster</h1> */}
      <Search
        topTags={topTags}
        onClick={(tag: string) => {
          savedTags.add(tag);
          setSavedTags(savedTags);
          setSelectedTag(tag);
        }}
      />
      <ul className="mt-[24px]">
        {Array.from(savedTags).map((tag) => {
          return (
            <li
              className="rounded-md text-lg hover:bg-purple-400 py-1 px-2"
              onClick={() => setSelectedTag(tag)}
              key={tag}
            >
              # {tag}
            </li>
          );
        })}
      </ul>
      <Separator.Root className="bg-violet6 my-[15px]" />
      {/* <ul>
        {topTags.map((tag) => {
          return (
            <li
              className="rounded-md text-lg hover:bg-purple-400 py-1 px-2"
              onClick={() => {
                savedTags.add(tag.tag);
                setSavedTags(savedTags);
                setSelectedTag(tag.tag);
              }}
              key={tag.tag}
            >
              # {tag.tag}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}
