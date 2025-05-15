import { useEffect, useRef, ReactNode } from "react";
import Spinner from "./ui/Spinner";

interface Props {
    onLoadMore: () => void;
    isFetching: boolean;
    children: ReactNode;
    threshold?: number;
}

const InfiniteScroll = ({ onLoadMore, isFetching, children, threshold = 200 }: Props) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            {
                rootMargin: `0px 0px ${threshold}px 0px`,
            },
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, [onLoadMore, threshold]);

    return (
        <div>
            {children}
            <div ref={triggerRef} className="h-1" />
            {isFetching && <Spinner className="size-6" />}
        </div>
    );
};

export default InfiniteScroll;
