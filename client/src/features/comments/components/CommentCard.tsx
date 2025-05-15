import Card from "@/features/shared/components/ui/Card";
import { CommentForList } from "../types";

interface Props {
    comment: CommentForList;
}

const CommentCard = ({ comment }: Props) => {
    return (
        <Card className="space-y-4">
            <CommentCardHeader comment={comment} />
            <p>{comment.content}</p>
        </Card>
    );
};

const CommentCardHeader = ({ comment }: Pick<Props, "comment">) => {
    return (
        <div className="flex items-center gap-2">
            <div>{comment.user.name}</div>
            <time className="text-sm text-neutral-500">{new Date(comment.createdAt).toLocaleDateString()}</time>
        </div>
    );
};

export default CommentCard;
