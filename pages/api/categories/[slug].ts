// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Post = {
  id: number;
  authorId: number;
  content: string;
};

type Data = {
  category: string;
  posts: Post[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;
  if (slug === "arsenal") {
    return res.status(200).json({
      category: "arsenal",
      posts: [
        { id: 1, authorId: 1, content: "First Arsenal post" },
        { id: 2, authorId: 1, content: "Ready for the game! COYG" },
      ],
    });
  }

  return res.status(200).json({
    category: "f1",
    posts: [
      { id: 1, authorId: 1, content: "First F1 post" },
      { id: 2, authorId: 1, content: "Who's watching today?" },
    ],
  });
}
