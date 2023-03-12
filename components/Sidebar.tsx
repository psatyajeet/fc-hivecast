import { styled } from "@/stitches.config";
import * as Separator from "@radix-ui/react-separator";

const Container = styled("div", {
  // height: "100%",
  // position: "fixed",
  // top: 0,
  // left: 0,
  width: "200px",
  height: "100%",
});

export default function Sidebar({
  topTags,
  savedTags,
  setSelectedTag,
  setSavedTags,
}: {
  topTags: Array<{ tag: string; count: number }>;
  savedTags: Set<string>;
  setSelectedTag: any;
  setSavedTags: any;
}) {
  return (
    <Container className="flex flex-col py-8">
      {/* <h1 className="text-3xl font-bold">Hivecaster</h1> */}
      <h1 className="text-3xl font-bold place-self-center">CasterTag</h1>
      <h1 className="text-3xl font-bold">Searchbar</h1>
      <div className="">
        {Array.from(savedTags).map((tag) => {
          return (
            <div
              className="rounded-md text-lg hover:bg-purple-400 py-1 px-2"
              onClick={() => setSelectedTag(tag)}
              key={tag}
            >
              # {tag}
            </div>
          );
        })}
      </div>
      <Separator.Root className="bg-violet6 my-[15px]" />
      <ul>
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
      </ul>
    </Container>
  );
}
