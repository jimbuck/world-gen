
import { MeshPhongMaterial, Geometry, Color, Vector3, VertexColors} from 'three';

import { ShapeGenerator } from '../services/shape-generator';
import { QuadSphereMesh } from '../../common/models/quad-sphere-mesh';
import { PlanetLayer } from './planet-settings';

export class PlanetMesh extends QuadSphereMesh {
    private shapeGenerator: ShapeGenerator;

    private _planetColor: string;
    public get planetColor() {
        return this._planetColor;
    }
    public set planetColor(value: string) {
        this._planetColor = value;
        this.regenerateShading();
    }

    public name: string;
    public seed: string;
    public rotate: boolean;

    public terrainLayers: PlanetLayer[] = [];

    public constructor(resolution?: number) {
        super(1, resolution || 32, new MeshPhongMaterial({
            color: '#f0f0f0',
            specular: '#222222'
        }));

        this.shapeGenerator = new ShapeGenerator(this);
    }

    public initialize()
    {
        this.regenerateMesh();
        this.regenerateTerrain();
        this.regenerateShading();
    }

    public regenerateTerrain() {
        const geometry = this.geometry as Geometry;

        geometry.vertices = geometry.vertices.map(vertex => this.shapeGenerator.CalculatePointOnPlanet(vertex.normalize()).multiplyScalar(this.radius));
        geometry.computeVertexNormals();
        geometry.computeFaceNormals();
    }

    public regenerateShading() {
        const faceMaterial = this.material as MeshPhongMaterial;
        faceMaterial.vertexColors = VertexColors;
        faceMaterial.color = new Color('#ffffff');// new Color(this.settings.color);

        //let [min, max] = [9999, 0];
        const center = new Vector3(0,0,0);
        const geometry = this.geometry as Geometry;
        geometry.faces.forEach(face => {
            const colors = [face.a, face.b, face.c].map(i => {
                const dist = geometry.vertices[i].distanceTo(center) - this.radius;
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

    public onBeforeRender = () => {
        if (this.rotate) {
            this.rotateY(Date.now() * 0.001);
        }
    };
}