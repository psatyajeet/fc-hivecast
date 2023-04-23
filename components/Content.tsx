import CastList from "@/components/CastList";
import RecentTags from "@/components/RecentTags";
import { TagCount } from "@/pages/api/tags";

export default function Content({
  selectedTag,
  recentTags,
  savedTags,
  setSelectedTag,
  setSavedTags,
}: {
  selectedTag: string;
  recentTags: TagCount[];
  savedTags: Set<string>;

  setSelectedTag: any;
  setSavedTags: any;
}) {
  if (selectedTag) {
    return <CastList selectedTag={selectedTag} />;
  }

  return (
    <RecentTags
      recentTags={recentTags}
      savedTags={savedTags}
      setSelectedTag={setSelectedTag}
      setSavedTags={setSavedTags}
    />
  );
}
