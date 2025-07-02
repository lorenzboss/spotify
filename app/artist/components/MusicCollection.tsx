"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { useState } from "react";
import MusicItem from "./MusicItem";

interface Album {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  images?: { url: string }[];
}

interface MusicCollectionProps {
  albums: Album[];
}

export default function MusicCollection({ albums }: MusicCollectionProps) {
  const [filter, setFilter] = useState("all");

  const displayItems = () => {
    const sortByDate = (arr: Album[]) =>
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
      default:
        return sortByDate(albums);
    }
  };

  const items = displayItems();

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Music</h2>
      <Tabs
        className="mb-8 lg:w-1/2"
        selectedKey={filter}
        onSelectionChange={(key) => setFilter(String(key))}
      >
        <Tab key="all" title="All" />
        <Tab key="singles" title="Singles" />
        <Tab key="albums" title="Albums" />
      </Tabs>
      {items && items.filter((item) => item !== null).length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items
            .filter((item) => item !== null)
            .map((item, index) => (
              <MusicItem key={item.id || index} item={item} />
            ))}
        </div>
      ) : (
        <p className="p-8 text-center text-default-500">No items found.</p>
      )}
    </>
  );
}
