import { Vector3 } from "three";

export interface PlanetSettings {
    name: string;
    seed: string;
    resolution: number;
    radius: number;
    wireframes: boolean;
    color: string;
    planetLayers: NoiseLayer[];
}

export interface NoiseLayer {
    id?: string;
    name: string;
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

export enum MaskTypes {
    None = 'None',
    FirstLayer = 'First Layer',
    PrevLayer = 'Previous Layer'
}