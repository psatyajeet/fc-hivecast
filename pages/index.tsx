import Content from "@/components/Content";
import Sidebar from "@/components/Sidebar";
import { useStorage } from "@/hooks/useLocalStorage";
import Layout from "@/pages/_layout";
import { getTags, TagCount } from "@/pages/api/tags";
import { useEffect, useState } from "react";

function Home({
  topTags,
  recentTags,
}: {
  topTags: TagCount[];
  recentTags: TagCount[];
}) {
  const { getItem } = useStorage();

  const [selectedTag, setSelectedTag] = useState("");
  const [savedTags, setSavedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const selectedTag = getItem("selectedTag", "local");
    if (selectedTag) {
      setSelectedTag(selectedTag);
    }

    const savedTags = getItem("savedTags", "local");
    if (savedTags) {
      setSavedTags(new Set(JSON.parse(savedTags)));
    } else {
      setSavedTags(new Set(["Ethereum", "Farcaster", "purple", "gm"]));
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-column justify-center p-[24px] lg:flex-row lg:max-w-6xl lg:mx-auto lg:pt-[48px] lg:pb-[64px]">
        <div className="w-[100%] min-h-screen lg:min-w-2xl lg:relative lg:inline-flex">
          <Sidebar
            topTags={topTags}
            savedTags={savedTags}
            setSelectedTag={setSelectedTag}
            setSavedTags={setSavedTags}
          />
          <Content
            selectedTag={selectedTag}
            recentTags={recentTags}
            savedTags={savedTags}
            setSelectedTag={setSelectedTag}
            setSavedTags={setSavedTags}
          />
        </div>
      </div>
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const topTags = await getTags();
  const NUM_LOOKBACK_DAYS = 3;
  const recentTags = await getTags(NUM_LOOKBACK_DAYS);

  return {
    props: {
      topTags,
      recentTags,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60 * 5, // In seconds
  };
}

export default Home;
