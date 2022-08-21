import type { User } from "remix-auth-spotify";

interface AlbumImage {
  url: string;
}
export interface Album {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  id: string;
  name: string;
  external_urls: { spotify: string };
}

export interface ReleasesInterface {
  [key: string]: Album[];
}

export interface HomeData {
  user: User | null;
  releases: ReleasesInterface;
}

export interface IndexData {
  user: User | null;
  releases: { albums: ReleasesInterface; location: string };
}
