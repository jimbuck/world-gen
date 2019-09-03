import { Vector3 } from "three";

export interface PlanetSettings {
    seed: string;
    resolution: number;
    radius: number;
    wireframes: boolean;
    noiseLayers: NoiseLayer[];
}

export interface NoiseLayer {
    name: string;
    enabled: boolean;
    useFirstLayerAsMask: boolean;
    noiseSettings: NoiseSettings;
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