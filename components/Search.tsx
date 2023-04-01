import { TagCount } from "@/pages/api/tags";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Search({
  topTags,
  savedTags,
  onClick,
}: {
  topTags: Array<TagCount>;
  savedTags: Set<string>;
  onClick: any;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<TagCount[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const search = async (query: string) => {
    const results: TagCount[] = topTags.filter((tag) =>
      tag.tag.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        search(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex w-[200px] min-h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] m-[auto] lg:m-0">
            Search for Tags
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white pt-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <fieldset className="mb-[15px] mx-[24px] flex items-center gap-5">
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="tag"
                placeholder="Search tags"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </fieldset>
            <ul className="overflow-auto max-h-[300px] mx-[12px] mb-[15px]">
              {results.map(({ tag }) => {
                return (
                  <div key={tag}>
                    <li
                      className={`plausible-event-name=tagSelect plausible-event-tag=${tag} rounded-md hover:bg-purple-400 p-[12px]`}
                      onClick={() => {
                        onClick(tag);
                        setOpen(false);
                      }}
                    >
                      # {tag}
                    </li>
                  </div>
                );
              })}
              {debouncedSearchTerm && results.length <= 0 && (
                <div>
                  <li className="rounded-md text-center p-[12px]">
                    No results found. <br />
                    Send a cast with {`#${debouncedSearchTerm}`} and it will be
                    indexed in 2 hours.
                  </li>
                </div>
              )}
              {!debouncedSearchTerm &&
                results.length <= 0 &&
                topTags.map((tag) => {
                  if (savedTags.has(tag.tag)) return null;
                  return (
                    <div key={tag.tag}>
                      <li
                        className="rounded-md hover:bg-purple-400 p-[12px]"
                        onClick={() => {
                          onClick(tag.tag);
                          setOpen(false);
                        }}
                      >
                        # {tag.tag}
                      </li>
                    </div>
                  );
                })}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
