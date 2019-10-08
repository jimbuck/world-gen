
import { MeshPhongMaterial, Geometry, Color, Vector3, VertexColors} from 'three';

import { ShapeGenerator } from '../services/shape-generator';
import { QuadSphereMesh } from '../../common/models/quad-sphere-mesh';
import { PlanetLayer } from './planet-settings';

export class PlanetMesh extends QuadSphereMesh {
    private _radius: number;
    public get radius() {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = Math.max(0, value);
    }

    private _planetColor: string;
    public get planetColor() {
        return this._planetColor;
    }
    public set planetColor(value: string) {
        this._planetColor = value;
        this.regenerateShading();
    }

    public seed: string;
    public rotate: boolean;

    public terrainLayers: PlanetLayer[] = [];

    public constructor() {
        super(32, new MeshPhongMaterial({
            color: '#f0f0f0',
            specular: '#222222'
        }));
    }

    public regenerateTerrain() {
        //console.log(`Regenerating terrain with radius ${this.radius}...`);
        const shapeGenerator = new ShapeGenerator(this);
        const geometry = this.geometry as Geometry;

        geometry.vertices.forEach(vertex => shapeGenerator.CalculatePointOnPlanet(vertex));
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.verticesNeedUpdate = true;
        geometry.normalsNeedUpdate = true;

        this.regenerateWireframes();
    }

    public regenerateShading() {
        //console.log(`Regenerating shading...`);
        const faceMaterial = this.material as MeshPhongMaterial;
        faceMaterial.vertexColors = VertexColors;
        faceMaterial.color = new Color('#ffffff');// new Color(this.settings.color);

        const center = new Vector3(0,0,0);
        const geometry = this.geometry as Geometry;
        geometry.faces.forEach(face => {
            face.vertexColors =  [face.a, face.b, face.c].map(i => {
                const dist = geometry.vertices[i].distanceTo(center) - this.radius;
                if(dist > 0) {
                    // Land
                    return new Color('#008000');
                } else {

                    // Water
                    return new Color('#000080');
                }
            });
        });
    }

    public update(dT: number) {
        if (this.rotate) {
            this.rotateY(dT);
        }
    };
}