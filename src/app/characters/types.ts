export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  specie: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };

  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
