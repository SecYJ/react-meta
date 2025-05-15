import { trpc } from "@/lib/utils/trpc";
import { Experience } from "@advanced-react/server/database/schema";
import CommentList from "./CommentList";

interface Props {
    experienceId: Experience["id"];
    commentsCount: number;
}

const CommentsSection = ({ experienceId, commentsCount }: Props) => {
    const commentsQuery = trpc.comments.byExperienceId.useQuery({ experienceId }, { enabled: commentsCount > 0 });

    if (commentsQuery.error) {
        return <div>Something went wrong</div>;
    }

    return (
        <div className="space-y-4">
            <div className="font-semibold">Comments {commentsCount}</div>
            <CommentList comments={commentsQuery.data ?? []} isLoading={commentsQuery.isLoading} />
        </div>
    );
};

export default CommentsSection;
