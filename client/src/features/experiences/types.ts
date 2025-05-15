import { Experience, User, Comment } from "@advanced-react/server/database/schema";

type ExperienceWithUser = Experience & {
    user: User;
};

type ExperienceWithComments = ExperienceWithUser & {
    commentsCount: number;
};

export type ExperienceForList = ExperienceWithUser & ExperienceWithComments;
