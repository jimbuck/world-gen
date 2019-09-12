import { Vector3 } from 'three';

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
    octaves: number;
    center: Vector3;
    minValue: number;
    strength: number;
}

export function createContinentNoise() {
    return {
        baseRoughness: 0.5,
        roughness: 3.2,
        persistence: 0.3,
        octaves: 4,
        center: new Vector3(0,0,0),
        minValue: 0.7,
        strength: 0.2,
    } as NoiseSettings;
};

export function createMoutainNoise() {
    return {
        baseRoughness: 5,
        roughness: 5,
        persistence: 0.4,
        octaves: 4,
        center: new Vector3(0,0,0),
        minValue: 0.6,
        strength: 0.15,
    } as NoiseSettings;
};

export enum MaskTypes {
    None = 'None',
    FirstLayer = 'First Layer',
    PrevLayer = 'Previous Layer'
}