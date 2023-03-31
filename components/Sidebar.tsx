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
      <Search
        topTags={topTags}
        savedTags={savedTags}
        onClick={(tag: string) => {
          savedTags.add(tag);
          setSavedTags(savedTags);
          setItem("savedTags", JSON.stringify(Array.from(savedTags)), "local");
          setSelectedTag(tag);
          setItem("selectedTag", tag, "local");
        }}
      />
      <div className="text-sm text-center mt-[12px] lg:px-[16px]">
        Have feedback?{" "}
        <a
          href="https://forms.gle/v2ZAUBSY9a59tbCK7"
          target="_blank"
          rel="noopener"
        >
          {" "}
          Click here!{" "}
        </a>
      </div>
      <div className="">
        <ul className="flex flex-row flex-wrap justify-center overflow-x-auto overflow-y-auto my-[24px] sm:flex-wrap lg:flex-col">
          {Array.from(savedTags).map((tag) => {
            return (
              <li
                className="rounded-md text-lg text-center cursor-pointer py-1 px-4 m-[1px] hover:bg-purple-400 lg:text-left"
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
    </div>
  );
}
