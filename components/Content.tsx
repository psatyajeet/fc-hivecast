import CastList from "@/components/CastList";
import RecentTags from "@/components/RecentTags";
import { TagCount } from "@/pages/api/tags";
import { useEffect } from "react";

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
  useEffect(() => {
    // Scroll to the top of the page when the selected tag changes
    window.scrollTo(0, 0);
  }, [selectedTag]);

  if (!!selectedTag) {
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
