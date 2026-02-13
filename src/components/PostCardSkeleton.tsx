import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
    return (
        <div className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col h-full">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 flex flex-col flex-grow space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="mt-auto pt-2">
                    <Skeleton className="h-5 w-24" />
                </div>
            </div>
        </div>
    );
}
