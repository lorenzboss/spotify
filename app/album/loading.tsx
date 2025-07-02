import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Album Header Skeleton */}
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <Skeleton className="h-64 w-64 flex-shrink-0 rounded-none" />
          <CardBody className="flex flex-col justify-between space-y-4 p-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-2/3 rounded" />
              <Skeleton className="h-5 w-1/2 rounded" />
              <Skeleton className="h-4 w-1/3 rounded" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </CardBody>
        </div>
      </Card>

      {/* Track Table Skeleton */}
      <Card>
        <div className="space-y-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="flex w-2/5 items-center gap-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-2/3 rounded" />
              </div>
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-5 w-12 rounded" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
