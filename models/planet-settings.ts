import { Vector3, Vector2 } from 'three';

export interface PlanetSettings {
    name: string;
    seed: string;
    resolution: number;
    radius: number;
    wireframes: boolean;
    color: string;
    planetLayers: PlanetLayer[];
}

export interface PlanetLayer {
    id?: string;
    label: string;
    enabled: boolean;
    maskType: MaskTypes;
    noiseSettings?: NoiseSettings;
}

export interface NoiseSettings {
    baseRoughness: number;
    roughness: number;
    persistence: number;
    octaves: number; // 1+
    center: Vector3;
    minValue: number;
    strength: number;
    strech: Vector2; // 1+
    skew: Vector3; // 0-1
}

export function createContinentNoise() {
    return {
        baseRoughness: 1.1,
        roughness: 1.2,
        persistence: 0.4,
        octaves: 4,
        center: new Vector3(0,0,0),
        minValue: 0.8,
        strength: 0.1,
        strech: new Vector2(1, 1),
        skew: new Vector3(0, 0, 0)
    } as NoiseSettings;
};

export function createMoutainNoise() {
    return {
        baseRoughness: 1.1,
        roughness: 2,
        persistence: 0.8,
        octaves: 4,
        center: new Vector3(0,0,0),
        minValue: 1.7,
        strength: 0.3,
        strech: new Vector2(0.8, 0.8),
        skew: new Vector3(0, 0, 0)
    } as NoiseSettings;
};

export enum MaskTypes {
    None = 'None',
    FirstLayer = 'First Layer',
    PrevLayer = 'Previous Layer'
}