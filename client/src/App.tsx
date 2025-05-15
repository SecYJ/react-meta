import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import Navbar from "./features/shared/components/Navbar";
import ThemeProvider from "./features/shared/components/ThemeProvider";
import { Toaster } from "./features/shared/components/ui/Toaster";
import { trpc } from "./lib/utils/trpc";
import ExperienceList from "./features/experiences/components/ExperienceList";
import InfiniteScroll from "./features/shared/components/InfiniteScroll";

export function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: "http://localhost:3000/" })],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Toaster />
                    <div className="flex justify-center gap-8 pb-8">
                        <Navbar />
                        <div className="min-h-screen w-full max-w-2xl">
                            <header className="mb-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
                                <h1 className="text-center text-xl font-bold">Advanced Patterns React</h1>
                                <p className="text-center text-sm text-neutral-500">
                                    <b>
                                        <span className="dark:text-primary-500">Cosden</span> Solutions
                                    </b>
                                </p>
                            </header>
                            <Index />
                        </div>
                    </div>
                </ThemeProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

const Index = () => {
    const query = trpc.experiences.feed.useInfiniteQuery(
        {},
        {
            getNextPageParam(lastPage) {
                return lastPage.nextCursor;
            },
        },
    );

    return (
        <InfiniteScroll
            onLoadMore={() => {
                query.fetchNextPage();
            }}
            isFetching={query.isFetchingNextPage}
        >
            <ExperienceList
                experiences={query.data?.pages.flatMap((page) => page.experiences) ?? []}
                isLoading={query.isLoading || query.isFetchingNextPage}
            />
        </InfiniteScroll>
    );
};
