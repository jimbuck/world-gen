
import { Vector3, Quaternion } from 'three';
import Alea from 'alea';
import SimplexNoise from 'simplex-noise';
import { PlanetSettings, NoiseSettings, MaskTypes } from '../models/planet-settings';

const MAX_RENDER_RADIUS = 3;

const VECTOR3_IDENTITY = new Vector3(1, 1, 1);

export class ShapeGenerator {
    private noiseFilters: NoiseFilter[];

    public constructor(private settings: PlanetSettings) {
        const prng = Alea(this.settings.seed);
        this.noiseFilters = [];
        for (let i = 0; i < this.settings.planetLayers.length; i++) {
            this.noiseFilters[i] = new NoiseFilter(new SimplexNoise(prng), this.settings.planetLayers[i].noiseSettings);
        }
    }

    public CalculatePointOnPlanet(pointOnUnitSphere: Vector3): Vector3 {
        let firstLayerValue = 0;
        let prevLayerValue = 0;
        let elevation = 0;

        if (this.noiseFilters.length > 0) {
            firstLayerValue = prevLayerValue = this.noiseFilters[0].Evaluate(pointOnUnitSphere);
            if (this.settings.planetLayers[0].enabled) {
                elevation = firstLayerValue;
                //console.log(prevLayerValue);
            }
        }

        for (let i = 1; i < this.noiseFilters.length; i++) {
            if (this.settings.planetLayers[i].enabled) {
                const mask = (this.settings.planetLayers[i].maskType === MaskTypes.FirstLayer) ? firstLayerValue :
                    (this.settings.planetLayers[i].maskType === MaskTypes.PrevLayer) ? prevLayerValue : 1;
                prevLayerValue = this.noiseFilters[i].Evaluate(pointOnUnitSphere);
                elevation += prevLayerValue * mask;
                //console.log(prevLayerValue);
            }
        }
        return pointOnUnitSphere.clone().multiplyScalar(Math.min(this.settings.radius, MAX_RENDER_RADIUS) * (1 + elevation));
    }
}

export class NoiseFilter {
    
    public constructor(private noise: SimplexNoise, private settings: NoiseSettings) { }

    public Evaluate(point: Vector3): number {
        let noiseValue = 0;
        let frequency = this.settings.baseRoughness;
        let amplitude = 1;

        let q = new Quaternion().setFromAxisAngle(this.settings.skew, Math.PI / 2);
        for (let i = 0; i < this.settings.octaves; i++) {
            let p = point.clone().multiplyScalar(frequency).add(this.settings.center);
            p = p.applyQuaternion(q);
            let v = this.noise.noise3D(p.x/this.settings.strech.x, p.y/this.settings.strech.y, p.z/this.settings.strech.x);
            noiseValue += (v + 1) * 0.5 * amplitude;
            frequency *= this.settings.roughness;
            amplitude *= this.settings.persistence;
        }

        noiseValue = Math.max(0, noiseValue - this.settings.minValue);
        return noiseValue * this.settings.strength;
    }
}

