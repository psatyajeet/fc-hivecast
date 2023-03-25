import Search from "@/components/Search";
import { useStorage } from "@/hooks/useLocalStorage";
import { TagCount } from "@/pages/api/tags";

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
  const { setItem } = useStorage();

  return (
    <div className="flex flex-col lg:fixed lg:overflow-y-auto lg:h-screen lg:w-[200px]">
      {/* <h1 className="text-3xl font-bold">CasterTag</h1> */}
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
      <div className="">
        <ul className="flex flex-row flex-wrap overflow-x-auto my-[24px] sm:flex-wrap lg:flex-col">
          {Array.from(savedTags).map((tag) => {
            return (
              <li
                className="rounded-md text-lg text-center cursor-pointer py-1 px-2 m-[1px] hover:bg-purple-400 lg:text-left"
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
      </div>
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
