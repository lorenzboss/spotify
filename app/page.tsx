"use client";

import { AvatarIcon, SearchIcon } from "@/components/icons";
import { title } from "@/lib/primitives";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useCallback, useEffect, useRef, useState } from "react";
import { searchArtists } from "../lib/data";
import { Artist } from "../lib/definitions";

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
      const artistsData = await searchArtists(query);
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
      <h1 className={title()}>Spotify API</h1>
      <div className="mt-5 w-1/2">
        <Autocomplete
          size="lg"
          placeholder="Search for your favorite artist!"
          className="w-full"
          defaultItems={artists}
          items={artists}
          inputValue={searchQuery}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
          isLoading={isLoading}
          startContent={<SearchIcon size={20} />}
        >
          {(artist) => (
            <AutocompleteItem key={artist.id} textValue={artist.name}>
              <div className="flex items-center gap-2">
                {artist.images &&
                artist.images.length > 0 &&
                artist.images[0]?.url ? (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="h-10 w-10 rounded-full object-cover"
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
