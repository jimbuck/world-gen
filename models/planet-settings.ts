import { Vector3, Vector2 } from 'three';

export interface PlanetSettings {
    name: string;
    seed: string;
    radius: number;
    color: string;
    terrainLayers: PlanetLayer[];
}

export interface PlanetLayer {
    id?: string;
    enabled: boolean;
    maskType: MaskTypes;
    noiseSettings?: NoiseSettings;
}

export interface NoiseSettings {
    baseRoughness: number;
    roughness: number;
    persistence: number;
    octaves: number; // 1+
    offset: Vector3;
    minValue: number;
    strength: number;
    strech: Vector2; // 1+
    skew: Vector3; // 0-1
}

export enum MaskTypes {
    None = 'None',
    FirstLayer = 'First Layer',
    PrevLayer = 'Previous Layer'
}

export function createContinentNoise() {
    return {
        baseRoughness: 1.5,
        roughness: 2.5,
        persistence: 0.3,
        octaves: 3,
        offset: new Vector3(0,0,0),
        minValue: -0.05,
        strength: 0.1,
        strech: new Vector2(0.7, 0.7),
        skew: new Vector3(0, 0, 0)
    } as NoiseSettings;
};

export function createMoutainNoise() {
    return {
        baseRoughness: 1.5,
        roughness: 2.7,
        persistence: 0.35,
        octaves: 6,
        offset: new Vector3(0,0,0),
        minValue: -0.05,
        strength: 0.5,
        strech: new Vector2(1, 1),
        skew: new Vector3(0, 0, 0)
    } as NoiseSettings;
};