import { Skeleton } from "@/components/ui/skeleton"

export function OrderSuccessSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
                    <Skeleton className="h-8 w-64 mx-auto mb-2" />
                    <Skeleton className="h-5 w-96 mx-auto" />
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 border">
                    <div className="flex justify-between mb-6">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-px w-full mb-6" />
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
