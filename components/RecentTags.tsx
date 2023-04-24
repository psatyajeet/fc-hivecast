import { useStorage } from "@/hooks/useLocalStorage";
import { TagCount } from "@/pages/api/tags";

export default function RecentTags({
  recentTags,
  savedTags,
  setSelectedTag,
  setSavedTags,
}: {
  recentTags: TagCount[];
  savedTags: Set<string>;
  setSelectedTag: any;
  setSavedTags: any;
}) {
  const { setItem } = useStorage();

  return (
    <div className="w-[100%] mx-auto lg:w-[650px] lg:ml-[224px]">
      <div className="text-xl font-bold mb-[12px]">📈 Trending tags</div>
      <div className="min-w-[300px] space-y-4 sm:min-w-[100%]">
        <ul className="flex flex-row flex-wrap">
          {recentTags.slice(0, 20).map((recentTag) => (
            <li
              key={recentTag.tag}
              className="px-4 py-2 rounded-[20px] cursor-pointer hover:bg-purple-400"
              onClick={() => {
                savedTags.add(recentTag.tag);
                setSavedTags(savedTags);
                setItem(
                  "savedTags",
                  JSON.stringify(Array.from(savedTags)),
                  "local"
                );
                setItem("selectedTag", recentTag.tag, "local");
                setSelectedTag(recentTag.tag);
              }}
            >
              {recentTag.tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
