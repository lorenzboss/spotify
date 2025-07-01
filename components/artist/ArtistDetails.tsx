import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";

import { AvatarIcon } from "../icons";

export default function ArtistDetails({ artist }) {
  if (!artist) return null;

  return (
    <Card className="mx-auto mb-8 w-1/2">
      <CardBody className="flex aspect-square overflow-hidden p-0">
        {artist.images?.length ? (
          <img
            alt={artist.name}
            className="h-full w-full object-cover"
            src={artist.images[0].url}
          />
        ) : (
          <AvatarIcon className="m-auto" size={208} />
        )}
      </CardBody>
      <CardFooter className="flex flex-col items-start p-6 text-left">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{artist.name}</h1>
            <div className="mb-4 flex flex-wrap gap-2">
              {artist.genres.map((genre) => (
                <Chip key={genre} color="secondary" size="sm" variant="flat">
                  {genre}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <p className="text-md font-semibold">
              Followers: {artist.followers.total.toLocaleString()}
            </p>
            <p className="text-md font-semibold">
              Popularity: {artist.popularity}/100
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function ArtistDetailsSkeleton() {
  return (
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
  );
}
