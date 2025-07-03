"use client";

import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
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
import { useState } from "react";

import { formatDuration } from "@/lib/formatters";

interface Track {
  id: string;
  name: string;
  track_number: number;
  duration_ms: number;
  explicit: boolean;
  artists: Array<{
    id: string;
    name: string;
  }>;
}

interface TrackTableProps {
  tracks: Track[];
}

export function TrackTable({ tracks }: TrackTableProps) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const sortedTracks = [...tracks].sort((a, b) => {
    // Default sorting (track number)
    if (sortDescriptor.column === "") {
      return a.track_number - b.track_number;
    }

    // Duration sorting
    if (sortDescriptor.column === "duration") {
      const result = a.duration_ms - b.duration_ms;

      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    // Name column behaves like default (track number) sort
    if (sortDescriptor.column === "name") {
      const result = a.track_number - b.track_number;

      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    return 0;
  });

  return (
    <Card className="overflow-x-auto">
      <Table
        aria-label="Album tracks"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        className="min-w-[500px]"
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            TRACK
          </TableColumn>
          <TableColumn key="artists">ARTISTS</TableColumn>
          <TableColumn key="duration" allowsSorting>
            DURATION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedTracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="w-5 font-semibold text-default-400">
                    {track.track_number}.
                  </span>
                  <span>{track.name}</span>
                  {track.explicit && (
                    <Chip color="danger" size="sm" variant="flat">
                      E
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {track.artists.map((artist, index) => (
                    <span key={artist.id}>
                      <Link
                        className="text-primary hover:underline"
                        href={`/artist?id=${artist.id}`}
                      >
                        {artist.name}
                      </Link>
                      {index < track.artists.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{formatDuration(track.duration_ms)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
