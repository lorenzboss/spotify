import { Card, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { useState } from "react";

import MusicItem from "./MusicItem";

export default function MusicCollection({ albums, playlists, isLoading }) {
  const [filter, setFilter] = useState("all");

  const displayItems = () => {
    const sortByDate = (arr) =>
      arr
        .slice()
        .sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime(),
        );

    switch (filter) {
      case "singles":
        return sortByDate(albums.filter((a) => a.album_type === "single"));
      case "albums":
        return sortByDate(albums.filter((a) => a.album_type === "album"));
      case "playlists":
        return playlists;
      default:
        return sortByDate(albums);
    }
  };

  if (isLoading) {
    return (
      <>
        <MusicCollectionTabsSkeleton />
        <MusicCollectionGridSkeleton />
      </>
    );
  }

  const items = displayItems();

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Music</h2>
      <Tabs
        selectedKey={filter}
        onSelectionChange={(key) => setFilter(String(key))}
        className="mb-8 lg:w-1/2"
      >
        <Tab key="all" title="All" />
        <Tab key="singles" title="Singles" />
        <Tab key="albums" title="Albums" />
        <Tab key="playlists" title="Playlists" />
      </Tabs>
      {items && items.filter((item) => item !== null).length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items
            .filter((item) => item !== null)
            .map((item, index) => (
              <MusicItem key={index} item={item} />
            ))}
        </div>
      ) : (
        <p className="p-8 text-center text-default-500">No items found.</p>
      )}
    </>
  );
}

export function MusicCollectionTabsSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="mb-6 h-8 w-1/4" />
      <Skeleton className="h-12 w-1/2" />
    </div>
  );
}

export function MusicCollectionGridSkeleton() {
  return (
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
  );
}
