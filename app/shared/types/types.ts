export interface Album {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {};
  href: string;
  id: string;
  images: string[];
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
}

export interface IndexData {
  user: any;
  artists: Artist[];
}
