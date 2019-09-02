
import { Vector3 } from 'three';
import SimplexNoise from 'simplex-noise';

export class ShapeGenerator {
    private settings: ShapeSettings;
    private noiseFilters: NoiseFilter[];

    public ShapeGenerator(settings: ShapeSettings)
    {
        this.settings = settings;
        this.noiseFilters = [];
        for (let i = 0; i < settings.noiseLayers.length; i++)
        {
            this.noiseFilters[i] = new NoiseFilter(settings.noiseLayers[i].noiseSettings);
        }
    }

    public CalculatePointOnPlanet(pointOnUnitSphere: Vector3): Vector3
    {
        let firstLayerValue = 0;
        let elevation = 0;

        if (this.noiseFilters.length > 0)
        {
            firstLayerValue = this.noiseFilters[0].Evaluate(pointOnUnitSphere);
            if (this.settings.noiseLayers[0].enabled)
            {
                elevation = firstLayerValue;
            }
        }

        for (let i = 1; i < this.noiseFilters.length; i++)
        {
            if (this.settings.noiseLayers[i].enabled)
            {
                const mask = (this.settings.noiseLayers[i].useFirstLayerAsMask) ? firstLayerValue : 1;
                elevation += this.noiseFilters[i].Evaluate(pointOnUnitSphere) * mask;
            }
        }
        return pointOnUnitSphere.clone().multiplyScalar(this.settings.planetRadius * (1+elevation));
    }
}

export class NoiseFilter {
    private noise: SimplexNoise;

    public constructor(private settings: NoiseSettings)
    {
        this.noise = new SimplexNoise();
    }

    public Evaluate(point: Vector3): number
    {
        let noiseValue = 0;
        let frequency = this.settings.baseRoughness;
        let amplitude = 1;

        for (let i = 0; i < this.settings.octaves; i++)
        {
            let p = point.clone().multiplyScalar(frequency).add(this.settings.center);
            let v = this.noise.noise3D(p.x, p.y, p.z);
            noiseValue += (v + 1) * 0.5 * amplitude;
            frequency *= this.settings.roughness;
            amplitude *= this.settings.persistence;
        }

        noiseValue = Math.max(0, noiseValue - this.settings.minValue);
        return noiseValue * this.settings.strength;
    }
}

export interface ShapeSettings {
    planetRadius: number;
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