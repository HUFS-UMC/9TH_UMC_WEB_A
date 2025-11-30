export type Cast = {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  budget?: number;
  genres?: { id: number; name: string }[];
  production_countries?: { name: string }[];
  spoken_languages?: { english_name: string }[];
  credits?: {
    cast: Cast[];
    crew: Cast[];
  };
}

