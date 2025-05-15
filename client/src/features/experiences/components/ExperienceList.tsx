import Spinner from "@/features/shared/components/ui/Spinner";
import { ExperienceForList } from "../types";
import ExperienceCard from "./ExperienceCard";

interface Props {
    experiences: ExperienceForList[];
    isLoading?: boolean;
    noExperiencesMessage?: string;
}

const ExperienceList = ({ experiences, isLoading, noExperiencesMessage = "No experiences found" }: Props) => {
    if (isLoading) {
        return (
            <div className="flex justify-center space-y-4">
                <Spinner />
            </div>
        );
    }

    if (experiences.length === 0) {
        return <div className="flex justify-center space-y-4">{noExperiencesMessage}</div>;
    }

    return (
        <div className="space-y-4">
            {experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
            ))}
        </div>
    );
};

export default ExperienceList;
