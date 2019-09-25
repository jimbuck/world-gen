
import { Vector3, Quaternion } from 'three';
import Alea from 'alea';
import SimplexNoise from 'simplex-noise';
import { PlanetLayer, NoiseSettings, MaskTypes } from '../models/planet-settings';
import { PlanetMesh } from '../models/planet';

export class ShapeGenerator {
    private _noiseFilters: NoiseFilter[];
    private _layers: PlanetLayer[];

    public constructor(planet: PlanetMesh) {
        this._layers = planet.terrainLayers;

        const prng = Alea(planet.seed || '');
        this._noiseFilters = [];
        for (let i = 0; i < this._layers.length; i++) {
            this._noiseFilters[i] = new NoiseFilter(new SimplexNoise(prng), this._layers[i].noiseSettings);
        }
    }

    public CalculatePointOnPlanet(pointOnUnitSphere: Vector3): Vector3 {
        let firstLayerValue = 0;
        let prevLayerValue = 0;
        let elevation = 0;

        if (this._noiseFilters.length > 0) {
            firstLayerValue = prevLayerValue = this._noiseFilters[0].Evaluate(pointOnUnitSphere);
            if (this._layers[0].enabled) {
                elevation = firstLayerValue;
            }
        }

        for (let i = 1; i < this._noiseFilters.length; i++) {
            if (this._layers[i].enabled) {
                const mask = (this._layers[i].maskType === MaskTypes.FirstLayer && firstLayerValue > this._layers[0].noiseSettings.minValue) ? 1 :
                    (this._layers[i].maskType === MaskTypes.PrevLayer && prevLayerValue > this._layers[i-1].noiseSettings.minValue) ? 1 : 
                    (this._layers[i].maskType === MaskTypes.None) ? 1 : 0;

                prevLayerValue = this._noiseFilters[i].Evaluate(pointOnUnitSphere);
                elevation = Math.max(elevation, prevLayerValue * mask);
            }
        }
        return pointOnUnitSphere.clone().multiplyScalar((1 + elevation));
    }
}

export class NoiseFilter {
    
    public constructor(private noise: SimplexNoise, private settings: NoiseSettings) { }

    public Evaluate(point: Vector3): number {
        let noiseValue = 0;
        let frequency = this.settings.baseRoughness;
        let amplitude = 1;
        let ampTotal = amplitude;

        let q = new Quaternion().setFromAxisAngle(this.settings.skew, Math.PI / 2);
        for (let i = 0; i < this.settings.octaves; i++) {
            let p = point.clone().multiplyScalar(frequency).add(this.settings.offset);
            p = p.applyQuaternion(q);
            let v = (this.noise.noise3D(p.x/this.settings.strech.x, p.y/this.settings.strech.y, p.z/this.settings.strech.x));// + 1) / 2;
            noiseValue += v * amplitude;
            frequency *= this.settings.roughness;
            amplitude *= this.settings.persistence;
            ampTotal += amplitude;
        }

        noiseValue = noiseValue / ampTotal;
        noiseValue = Math.max(noiseValue, this.settings.minValue);
        return noiseValue * this.settings.strength;
    }
}


