import Card from "@/features/shared/components/ui/Card";
import { ExperienceForList } from "../types";
import { LinkIcon, MessageSquare } from "lucide-react";

interface Props {
    experience: ExperienceForList;
}

const ExperienceCard = ({ experience }: Props) => {
    return (
        <Card className="overflow-hidden p-0">
            <ExperienceCardMedia experience={experience} />
            <div className="w-full space-y-4 p-4">
                <ExperienceCardHeader experience={experience} />
                <p>{experience.content}</p>
                <ExperienceCardMeta experience={experience} />
                <ExperienceCardMetricsButton experience={experience} />
            </div>
        </Card>
    );
};

const ExperienceCardMedia = ({ experience }: Pick<Props, "experience">) => {
    if (!experience.imageUrl) return null;

    return (
        <div className="aspect-video w-full">
            <img src={experience.imageUrl} alt={experience.title} className="size-full object-cover" />
        </div>
    );
};

const ExperienceCardHeader = ({ experience }: Pick<Props, "experience">) => {
    return (
        <div>
            <div>{experience.user.name}</div>
            <h2 className="text-secondary-500 text-xl font-bold">{experience.title}</h2>
        </div>
    );
};

const ExperienceCardMeta = ({ experience }: Pick<Props, "experience">) => {
    return (
        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            <time>{new Date(experience.scheduledAt).toLocaleDateString()}</time>
            {experience.url && (
                <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-secondary-500 dark:text-primary-500" />
                    <a href={experience.url} target="_blank" rel="noopener noreferrer">
                        Event Details
                    </a>
                </div>
            )}
        </div>
    );
};

const ExperienceCardMetricsButton = ({ experience }: Pick<Props, "experience">) => {
    return (
        <div className="flex items-center gap-2">
            <MessageSquare className="size-5" />
            <span>{experience.commentsCount}</span>
        </div>
    );
};

export default ExperienceCard;
