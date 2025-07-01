"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useCallback, useEffect, useRef, useState } from "react";

import { fetchArtists } from "../lib/data";
import { Artist } from "../lib/definitions";

import { AvatarIcon, SearchIcon } from "@/components/icons";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback(async (query: string) => {
    if (query.trim() === "") {
      setArtists([]);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    try {
      const artistsData = await fetchArtists(query);

      setArtists(artistsData);
    } catch (error) {
      console.error("Error while searching for artists:", error);
      setArtists([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      debouncedSearch(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSelectionChange = (artistId: string | number | null) => {
    if (artistId) {
      window.location.href = `/artist?id=${artistId}`;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Spotify API</h1>
      <div className="mt-5 w-1/2">
        <Autocomplete
          className="w-full"
          defaultItems={artists}
          inputValue={searchQuery}
          isLoading={isLoading}
          items={artists}
          placeholder="Search for your favorite artist!"
          size="lg"
          startContent={<SearchIcon size={20} />}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
        >
          {(artist) => (
            <AutocompleteItem key={artist.id} textValue={artist.name}>
              <div className="flex items-center gap-2">
                {artist.images &&
                artist.images.length > 0 &&
                artist.images[0]?.url ? (
                  <img
                    alt={artist.name}
                    className="h-10 w-10 rounded-full object-cover"
                    src={artist.images[0].url}
                  />
                ) : (
                  <AvatarIcon size={40} />
                )}
                <span>{artist.name}</span>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
}
