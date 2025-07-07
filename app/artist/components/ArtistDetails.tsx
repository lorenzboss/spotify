import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import { AvatarIcon } from "../../../components/icons";

interface Artist {
  name: string;
  images?: { url: string }[];
  genres: string[];
  followers: { total: number };
  popularity: number;
}

interface ArtistDetailsProps {
  artist: Artist;
}

export default function ArtistDetails({ artist }: ArtistDetailsProps) {
  return (
    <Card className="mx-auto mb-8 sm:w-1/2">
      <CardBody className="flex aspect-square overflow-hidden p-0">
        {artist.images?.length ? (
          <Image
            alt={artist.name}
            className="h-full w-full object-cover"
            height={500}
            src={artist.images[0].url}
            width={500}
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
