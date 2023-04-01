import Content from "@/components/Content";
import Sidebar from "@/components/Sidebar";
import { useStorage } from "@/hooks/useLocalStorage";
import { getTags, TagCount } from "@/pages/api/tags";
import Head from "next/head";
import { useEffect, useState } from "react";

function Home({ topTags }: { topTags: Array<TagCount> }) {
  const { getItem } = useStorage();

  // const [topTags, setTopTags] = useState<TagCount[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [savedTags, setSavedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const selectedTag = getItem("selectedTag", "local");
    if (selectedTag) {
      setSelectedTag(selectedTag);
    } else {
      setSelectedTag("Ethereum");
    }

    const savedTags = getItem("savedTags", "local");
    if (savedTags) {
      setSavedTags(new Set(JSON.parse(savedTags)));
    } else {
      setSavedTags(new Set(["Ethereum", "Farcaster", "purple", "gm"]));
    }
  }, []);

  return (
    <>
      <Head>
        <title>HashCast</title>
        <meta name="description" content="Find casts on different topics" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="hashcast.xyz"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <main className="bg-purple-200">
        <div className="flex flex-column justify-center p-[24px] lg:flex-row lg:max-w-6xl lg:mx-auto lg:pt-[48px] lg:pb-[64px]">
          <div className="w-[100%] min-h-screen lg:min-w-2xl lg:relative lg:inline-flex">
            <Sidebar
              topTags={topTags}
              savedTags={savedTags}
              setSelectedTag={setSelectedTag}
              setSavedTags={setSavedTags}
            />
            <Content selectedTag={selectedTag} />
          </div>
        </div>
      </main>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const tags = await getTags();

  return {
    props: {
      topTags: tags,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  };
}

export default Home;