import type { Session, User } from "remix-auth-spotify";

export enum UserType {
  registered = "registered",
  demo = "demo",
}

export interface UserProfile extends Session {
  type: UserType;
}

interface AlbumImage {
  url: string;
}

export interface Album {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets?: string[];
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
  liked?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  external_urls: { spotify: string };
  uri: string;
}

export interface ReleasesInterface {
  [key: string]: Album[];
}

export interface HomeData {
  user: UserProfile | null;
  releases: Album[];
}

export interface IndexData {
  user: User | null;
  releases: { albums: ReleasesInterface };
  baseAccessToken: string;
}

export interface Playlist {
  id: string;
  name: string;
}

export interface Track {
  uri: string;
  id: string;
}
