import Spinner from "@/features/shared/components/ui/Spinner";
import CommentCard from "./CommentCard";
import { CommentForList } from "../types";

interface Props {
    comments: CommentForList[];
    isLoading: boolean;
    noCommentsMessage?: string;
}

const CommentList = ({ comments, isLoading, noCommentsMessage }: Props) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (comments.length === 0) {
        return <div className="flex justify-center">No comments yet</div>;
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
