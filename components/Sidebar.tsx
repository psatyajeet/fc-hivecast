import Search from "@/components/Search";
import { useStorage } from "@/hooks/useLocalStorage";
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
  const { getItem, setItem } = useStorage();

  return (
    <div className="overflow-y-auto fixed h-screen flex flex-col w-[200px] mr-[24px]">
      {/* <h1 className="text-3xl font-bold">Hivecaster</h1> */}
      <Search
        topTags={topTags}
        onClick={(tag: string) => {
          savedTags.add(tag);
          setSavedTags(savedTags);
          setItem("savedTags", JSON.stringify(Array.from(savedTags)), "local");

          setSelectedTag(tag);
          setItem("selectedTag", tag, "local");
        }}
      />
      <ul className="mt-[24px]">
        {Array.from(savedTags).map((tag) => {
          return (
            <li
              className="rounded-md text-lg hover:bg-purple-400 cursor-pointer py-1 px-2"
              onClick={() => {
                setItem("selectedTag", tag, "local");
                setSelectedTag(tag);
              }}
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
