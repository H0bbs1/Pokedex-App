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
    id: string;
    name: string;
    url: string;
}

export interface MoveDetail {
    id: string;
    name: string;
    type: string;
    power: number;
    pp: number;
    accuracy: number;
    summary: string;
}
