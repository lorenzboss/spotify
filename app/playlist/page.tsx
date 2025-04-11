"use client";

import { formatDate, formatDuration } from "@/lib/formatters";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Error from "../../components/error";
import { fetchPlaylistDetails } from "../../lib/data";

function PlaylistHeaderSkeleton() {
  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-64 w-64 flex-shrink-0" />
        <CardBody className="flex flex-col justify-between p-6">
          <div>
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-6 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-1/2" />
            <Skeleton className="mb-4 h-4 w-2/3" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

function PlaylistHeader({ playlist }) {
  if (!playlist) return null;

  const lastUpdated = new Date(
    playlist.snapshot_id && !isNaN(new Date(playlist.snapshot_id).getTime())
      ? playlist.snapshot_id
      : playlist.updated_at && !isNaN(new Date(playlist.updated_at).getTime())
        ? playlist.updated_at
        : new Date().toISOString(),
  );

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(lastUpdated);

  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {playlist.images && playlist.images.length > 0 ? (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="h-64 w-64 flex-shrink-0 object-cover"
          />
        ) : (
          <div className="flex h-64 w-64 items-center justify-center bg-default-200">
            <svg
              className="h-16 w-16 text-default-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
            </svg>
          </div>
        )}
        <CardBody className="flex flex-col justify-between p-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{playlist.name}</h1>
            {playlist.description && (
              <p className="mb-6 text-default-600">{playlist.description}</p>
            )}
            <p className="mb-2 text-default-600">
              Created by:{" "}
              <span className="font-medium">
                {playlist.owner?.display_name || "Unknown"}
              </span>
            </p>
            <p className="mb-4 text-default-600">
              Last updated: {formattedDate}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip color="primary" variant="flat">
              Playlist
            </Chip>
            <Chip color="secondary" variant="flat">
              {playlist.tracks?.total || 0}{" "}
              {playlist.tracks?.total === 1 ? "track" : "tracks"}
            </Chip>
            {playlist.followers && (
              <Chip color="success" variant="flat">
                {playlist.followers.total?.toLocaleString() || 0} followers
              </Chip>
            )}
            {playlist.public !== undefined && (
              <Chip
                color={playlist.public ? "warning" : "default"}
                variant="flat"
              >
                {playlist.public ? "Public" : "Private"}
              </Chip>
            )}
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

function TrackTableSkeleton() {
  return (
    <Card>
      <CardBody>
        <Skeleton className="mb-4 h-8 w-1/4" />
        <Table aria-label="Loading tracks">
          <TableHeader>
            <TableColumn>TRACK</TableColumn>
            <TableColumn>ALBUM</TableColumn>
            <TableColumn>ADDED</TableColumn>
            <TableColumn>DURATION</TableColumn>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

function TrackTable({ tracks }) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "added_at",
    direction: "descending",
  });

  // Sort tracks based on the current sort descriptor
  const sortedTracks = [...tracks].sort((a, b) => {
    const trackA = a.track;
    const trackB = b.track;

    // Default sorting (added date)
    if (sortDescriptor.column === "added_at") {
      const dateA = new Date(a.added_at);
      const dateB = new Date(b.added_at);
      const result = dateA.getTime() - dateB.getTime();
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    // Duration sorting
    if (sortDescriptor.column === "duration") {
      const result = trackA.duration_ms - trackB.duration_ms;
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    // Name sorting
    if (sortDescriptor.column === "name") {
      const result = trackA.name.localeCompare(trackB.name);
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    // Album sorting
    if (sortDescriptor.column === "album") {
      const albumA = trackA.album?.name || "";
      const albumB = trackB.album?.name || "";
      const result = albumA.localeCompare(albumB);
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    // Artists sorting - by first artist name
    if (sortDescriptor.column === "artists") {
      const artistA = trackA.artists[0]?.name || "";
      const artistB = trackB.artists[0]?.name || "";
      const result = artistA.localeCompare(artistB);
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    return 0;
  });

  return (
    <Card>
      <Table
        aria-label="Playlist tracks"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            TRACK
          </TableColumn>
          <TableColumn key="album" allowsSorting>
            ALBUM
          </TableColumn>
          <TableColumn key="added_at" allowsSorting>
            ADDED
          </TableColumn>
          <TableColumn key="duration" allowsSorting>
            DURATION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedTracks
            .filter((item) => item.track) // Filter out null tracks
            .map((item) => {
              const track = item.track;

              return (
                <TableRow key={track.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span>{track.name}</span>
                        <div className="flex flex-wrap gap-1 text-sm text-default-500">
                          {track.artists.map((artist, index) => (
                            <span key={artist.id}>
                              <Link
                                href={`/artist?id=${artist.id}`}
                                className="text-default-500 hover:text-primary hover:underline"
                              >
                                {artist.name}
                              </Link>
                              {index < track.artists.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                      {track.explicit && (
                        <Chip size="sm" color="danger" variant="flat">
                          E
                        </Chip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {track.album && (
                      <Link
                        href={`/album?id=${track.album.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {track.album.name}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(item.added_at)}</TableCell>
                  <TableCell>{formatDuration(track.duration_ms)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Card>
  );
}

export default function PlaylistPage() {
  const searchParams = useSearchParams();
  const playlistId = searchParams.get("id");
  const [playlist, setPlaylist] = useState<{
    tracks?: { items: any[] };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylistData = async () => {
      if (!playlistId) {
        setIsLoading(false);
        setError("No playlist ID provided");
        return;
      }

      try {
        const playlistData = await fetchPlaylistDetails(playlistId);
        setPlaylist(playlistData);
      } catch (error) {
        setError("Failed to load playlist details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylistData();
  }, [playlistId]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<PlaylistHeaderSkeleton />}>
        {isLoading ? (
          <PlaylistHeaderSkeleton />
        ) : (
          <PlaylistHeader playlist={playlist} />
        )}
      </Suspense>

      <Suspense fallback={<TrackTableSkeleton />}>
        {isLoading ? (
          <TrackTableSkeleton />
        ) : (
          playlist &&
          playlist.tracks && <TrackTable tracks={playlist.tracks.items} />
        )}
      </Suspense>
    </div>
  );
}
