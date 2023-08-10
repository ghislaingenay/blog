import { Language } from "@interfaces/global.interface";
import { Comment, CommentDoc } from "@lib-api/models/comments";
import { ReactionComment } from "@lib-api/models/reaction-comments";
import clientPromise from "@lib-api/pool";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const postId = new URL(req.url).searchParams.get("postId");
    const language = new URL(req.url).searchParams.get(
      "language"
    ) as unknown as Language;
    (await clientPromise).connect();
    const comments = JSON.parse(
      JSON.stringify(await Comment.find({ postId, language }))
    ) as CommentDoc[];
    const updatedComments = await Promise.all(
      comments.map(async (comment) => {
        return {
          ...comment,
          reactions: await ReactionComment.find({
            commentId: comment.id,
          }),
        };
      })
    );
    return NextResponse.json({
      data: updatedComments || [],
      isSuccess: true,
    });
  } catch (err: any) {
    return NextResponse.json({
      isSuccess: false,
      errorMessage: err.message,
    });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = req.body as unknown as CommentDoc;
  clientPromise.connect();
  const comment = await Comment.create(data);
  return NextResponse.json({
    data: comment,
    isSuccess: true,
  });
}

// export async function PUT(req: NextRequest, res: NextResponse) {}
