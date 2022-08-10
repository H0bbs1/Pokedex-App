export interface PokemonDetails {
    id: string;
    name: string;
    imageURL: string;
    types: string[];
    abilities: string[];
    stats: Stat[];
    moves: Move[];
}

export interface Stat {
    name: string;
    value: number;
}

export interface Move {
    name: string;
    url: string;
}
