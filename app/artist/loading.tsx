import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function ArtistLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Artist Details Skeleton */}
      <Card className="mx-auto mb-8 w-1/2">
        <CardBody className="p-0">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </CardBody>
        <CardFooter className="flex flex-col items-start p-6 text-left">
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-2/3">
              <Skeleton className="mb-2 h-8 w-3/4 rounded-lg" />
            </div>
            <div className="flex w-full flex-col items-start gap-2 md:w-1/3 md:items-end">
              <Skeleton className="mb-1 h-5 w-32 rounded-lg" />
              <Skeleton className="mb-2 h-5 w-36 rounded-lg" />
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Music Collection Skeleton */}
      <div className="mb-8">
        <Skeleton className="mb-8 h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-52 rounded-lg" />
      </div>

      {/* Music Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <CardFooter className="p-3">
              <div className="w-full">
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
