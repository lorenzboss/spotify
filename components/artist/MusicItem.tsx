import { Card, CardBody, CardFooter } from "@heroui/card";
import Link from "next/link";
import { MusicIcon } from "../icons";

export default function MusicItem({ item }) {
  const isAlbum = item.type === "album";
  return (
    <Card
      as={Link}
      href={isAlbum ? `/album?id=${item.id}` : `/playlist?id=${item.id}`}
      isPressable
    >
      <CardBody className="p-0">
        {item.images?.length ? (
          <img
            src={item.images[0].url}
            alt={item.name}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <MusicIcon size={100} className="m-auto" />
        )}
      </CardBody>
      <CardFooter className="flex flex-col items-start p-3">
        <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
        <p className="text-xs text-default-500">
          {(isAlbum ? item.album_type : item.type).replace(/^./, (c) =>
            c.toUpperCase(),
          )}
        </p>
      </CardFooter>
    </Card>
  );
}
