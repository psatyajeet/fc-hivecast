import Content from "@/components/Content";
import Sidebar from "@/components/Sidebar";
import { TagCount } from "@/pages/api/tags";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [topTags, setTopTags] = useState<TagCount[]>([]);
  const [selectedTag, setSelectedTag] = useState("Farcaster");
  const [savedTags, setSavedTags] = useState<Set<string>>(
    new Set(["Farcaster", "Ethereum", "Purple"])
  );

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch("/api/tags", {
        method: "GET",
      });

      return response.json();
    }

    fetchTags().then((body) => {
      setTopTags(body.tags);
    });
  }, []);

  return (
    <>
      <Head>
        <title>HiveCaster</title>
        <meta name="description" content="Find casts on different topics" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-purple-200">
        <div className="max-w-6xl mx-auto p-[24px] flex flex-row justify-center">
          <div className="min-w-2xl min-h-screen relative inline-flex">
            <Sidebar
              topTags={topTags}
              savedTags={savedTags}
              setSelectedTag={setSelectedTag}
              setSavedTags={setSavedTags}
            />
            <Content selectedTag={selectedTag} topTags={topTags} />
          </div>
        </div>
      </main>
    </>
  );
}
