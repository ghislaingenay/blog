import { Language } from "@interfaces/global.interface";
import { Comment, CommentAttrs, CommentDoc } from "@lib-api/models/comments";
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
  try {
    const commentBody = req.body as unknown as CommentAttrs;
    const comment = await Comment.create(commentBody);
    return { isSuccess: true, data: comment };
  } catch (err: any) {
    return { isSuccess: false, errorMessage: err.message };
  }
}

// export async function PUT(req: NextRequest, res: NextResponse) {}
