// Many thanks to gskril: https://github.com/gskril/searchcaster/blob/008a01826ce691f317bfba0c3b3dc23137ace7f0/src/utils/cast.js#L53
export function formatCastText(text: string) {
  const links = text.match(
    // Regex to identify URLS with .com, .xyz, .net, or .org extension (it doesn't have to start with http:// or https://)
    /\b(?:https?:\/\/)?[-a-zA-Z0-9@:%._+~#=][-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );

  if (links) {
    links.forEach((link) => {
      text = text.replace(
        link,
        // If a link doesn't already start with http:// or https://, add it
        `<a href="${
          link.match(
            // Regex to identify an ENS name
            /^(?!(http|https))(.*)\.eth$/
          )
            ? `https://rainbow.me/${link}`
            : link.startsWith("http")
            ? link
            : `https://${link}`
        }" target="_blank" rel="noopener">${link}</a>`
      );
    });
  }

  const farcasterUri = text.match(
    // Regex to identify a Farcater URI
    /farcaster:\/\/casts\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)/g
  );

  if (farcasterUri) {
    farcasterUri.forEach((uri) => {
      const shortenedUri = uri.slice(0, 20) + "..." + uri.slice(-10);
      text = text.replace(
        uri,
        `<a href="${uri}" target="_blank" rel="noopener">${shortenedUri}</a>`
      );
    });
  }

  const mention = text.match(
    // Regex to identify a @username mention
    /@([a-zA-Z0-9_]+)/g
  );

  if (mention) {
    mention.forEach((mention) => {
      // If the mention is at the beginning of the text, or it has a space before it, it's a valid mention
      if (
        text.startsWith(mention) ||
        text.split(mention)[0].endsWith(" ") ||
        text.split(mention)[1].startsWith(" ")
      ) {
        text = text.replace(
          mention,
          `<a href="//warpcast.com/${mention.slice(
            1
          )}" target="_blank" rel="noopener">${mention}</a>`
        );
      }
    });
  }

  // // If text includes a Spotify link, append an iframe to the end of the text
  // const spotifyLink = text.match(
  //   /https:\/\/open\.spotify\.com\/(track|album|playlist|show|episode)\/([a-zA-Z0-9_]+)/g
  // );

  // if (spotifyLink) {
  //   spotifyLink.forEach((link) => {
  //     const iframe = `<iframe style="border-radius: 12px; margin-top: 0.75rem" src="${link.replace(
  //       "https://open.spotify.com/",
  //       "https://open.spotify.com/embed/"
  //     )}" width="100%" height="80" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  //     text = text + iframe;

  //     // Make sure the iframe isn't duplicated
  //     text = text.replace(iframe + iframe, iframe);
  //   });
  // }

  // // If text includes a YouTube link, append an iframe to the end of the text
  // const youtubeLink = text.match(
  //   /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_]+)/g
  // );

  // if (youtubeLink) {
  //   youtubeLink.forEach((link) => {
  //     const iframe = `<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" src="${link.replace(
  //       "https://www.youtube.com/watch?v=",
  //       "https://www.youtube-nocookie.com/embed/"
  //     )}" width="100%" height="315" frameBorder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy"></iframe>`;

  //     const iframeWrapper = `<div style="position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden; margin-top: 0.75rem; border-radius: 12px">${iframe}</div>`;

  //     text = text + iframeWrapper;

  //     // Make sure the iframe isn't duplicated
  //     text = text.replace(iframeWrapper + iframeWrapper, iframeWrapper);
  //   });
  // }

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
}
