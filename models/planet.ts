
import { MeshPhongMaterial, Geometry, Color, Vector3, VertexColors} from 'three';

import { ShapeGenerator } from '../services/shape-generator';
import { PlanetSettings } from './planet-settings';
import { QuadSphereMesh } from './quad-sphere-mesh';

export class PlanetMesh extends QuadSphereMesh {
    public settings: PlanetSettings;

    private _planetColor: string;
    public get planetColor() {
        return this._planetColor;
    }
    public set planetColor(value: string) {
        this._planetColor = value;
        this.regenerateColors();
    }

    public constructor(resolution?: number) {
        super(1, resolution || 32, new MeshPhongMaterial({
            color: '#f0f0f0',
            specular: '#222222'
        }));

        this.settings = Object.assign({}, this.settings, {
            name: '',
            seed: '',
            resolution: 8,
            radius: 1,
            wireframes: true,
            color: '#999999',
            planetLayers: [],
        });
    }

    public initialize()
    {
        this.regenerateMesh();
        this.regenerateTerrain(new ShapeGenerator(this.settings));
        this.regenerateColors();
    }

    public updateSettings(newSettings: PlanetSettings)
    {
        Object.assign(this.settings, newSettings);
        //this.regenerateMesh();
        this.regenerateTerrain(new ShapeGenerator(this.settings));
        this.regenerateColors();
        this.wireframes = this.settings.wireframes;
    }

    public onColorSettingsUpdated()
    {
        this.regenerateColors();
    }

    public regenerateTerrain(shapeGenerator: ShapeGenerator) {
        const geometry = this.geometry as Geometry;

        geometry.vertices = geometry.vertices.map(vertex => shapeGenerator.CalculatePointOnPlanet(vertex.normalize()).multiplyScalar(this.radius));
        geometry.computeVertexNormals();
        geometry.computeFaceNormals();
    }

    public regenerateColors() {
        const faceMaterial = this.material as MeshPhongMaterial;
        faceMaterial.vertexColors = VertexColors;
        faceMaterial.color = new Color('#ffffff');// new Color(this.settings.color);

        //let [min, max] = [9999, 0];
        const center = new Vector3(0,0,0);
        const geometry = this.geometry as Geometry;
        geometry.faces.forEach(face => {
            const colors = [face.a, face.b, face.c].map(i => {
                const dist = geometry.vertices[i].distanceTo(center) - this.settings.radius;
                // min = Math.min(min, dist);
                // max = Math.max(max, dist);
                if(dist > 0) {
                    // Land
                    return new Color('#008000');
                } else {

                    // Water
                    return new Color('#000080');
                }
            });

            face.vertexColors = colors;
        });
        // console.log(`Min: ${min}, Max: ${max}`);
    }
}