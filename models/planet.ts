
import { MeshPhongMaterial, Group, Mesh, Geometry, Color, Object3D, Vector3, Face3, Vector2, WireframeGeometry, LineSegments, LineBasicMaterial} from 'three';

import { Direction, directionsList } from './direction';
import { ShapeGenerator } from '../services/shape-generator';
import { PlanetSettings } from './planet-settings';

export class Planet extends Group {
    private planetFaces: PlanetFace[] = [];

    private shapeGenerator: ShapeGenerator;

    public settings: PlanetSettings;

    public constructor() {
        super();
        this.settings = Object.assign({}, this.settings, {
            name: '',
            seed: '',
            resolution: 8,
            radius: 1,
            wireframes: true,
            color: '#ffffff',
            planetLayers: [],
        });
    }

    public initialize()
    {
        this.init();
        this.generateMesh();
        this.generateColors();
    }

    public updateSettings(newSettings: PlanetSettings)
    {
        Object.assign(this.settings, newSettings);
        this.init();
        this.generateMesh();
    }

    public onColorSettingsUpdated()
    {
        this.init();
        this.generateColors();
    }

    private init() {
        this.shapeGenerator = new ShapeGenerator(this.settings);
        const material = new MeshPhongMaterial({
            color: this.settings.color,
            specular: '#111111'
        });
        this.remove(...this.children);
        for (let i = 0; i < 6; i++) {
            const surface = new Mesh(new Geometry(), material);

            this.planetFaces[i] = new PlanetFace(surface, directionsList[i]);
            this.add(this.planetFaces[i]);
        }
    }

    private generateMesh() {
        this.planetFaces.forEach(face => {
            face.BuildMesh(this.settings, this.shapeGenerator);
            if (this.settings.wireframes) face.BuildWireframes();
        });
    }

    private generateColors() {
        this.planetFaces.forEach(face => {
            const faceMaterial = face.surface.material as MeshPhongMaterial;
            faceMaterial.color = new Color(this.settings.color);
        });
    }
}

export class PlanetFace extends Object3D {

    private axisA: Vector3;
    private axisB: Vector3;

    public get geometry() {
        return this.surface.geometry as Geometry;
    }

    constructor(
        public surface: Mesh,
        public localUp: Direction) {
        super();

        this.axisA = new Vector3(localUp.vector.y, localUp.vector.z, localUp.vector.x);
        this.axisB = this.localUp.vector.clone().cross(this.axisA);

        this.add(this.surface);
    }

    public BuildMesh(planetSettings: PlanetSettings, shapeGenerator: ShapeGenerator) {
        const vertices: Vector3[] = [];//new Array(this.resolution * this.resolution);
        const triangles: Face3[] = [];//[(this.resolution - 1) * (this.resolution - 1) * 2];

        for (let y = 0; y < planetSettings.resolution; y++) {
            for (let x = 0; x < planetSettings.resolution; x++) {
                const i = x + y * planetSettings.resolution;
                const percent = new Vector2(x, y).divideScalar(planetSettings.resolution - 1);
                const pointOnUnitCube = this.localUp.vector.clone()
                    .add(this.axisA.clone().multiplyScalar((percent.x - 0.5) * 2))
                    .add(this.axisB.clone().multiplyScalar((percent.y - 0.5) * 2));

                const pointOnUnitSphere = pointOnUnitCube.clone().normalize();
                vertices[i] = shapeGenerator.CalculatePointOnPlanet(pointOnUnitSphere);

                //console.log(`${this.localUp.name}: ${x}x${y} ->`, vertices[i],  ` -> ${vertices[i]}`);

                if (x != planetSettings.resolution - 1 && y != planetSettings.resolution - 1) {

                    triangles.push(
                        new Face3(i, i + planetSettings.resolution + 1, i + planetSettings.resolution),
                        new Face3(i, i + 1, i + planetSettings.resolution + 1));
                }
            }
        }

        this.geometry.vertices = vertices;
        this.geometry.faces = triangles;
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
    }

    public BuildWireframes() {
        let wireframe = new WireframeGeometry(this.geometry);
        var line = new LineSegments(wireframe);
        (line.material as LineBasicMaterial).color = new Color(0x000000);
        (line.material as LineBasicMaterial).linewidth = 2;
        //(line.material as LineBasicMaterial).depthTest = false;
        (line.material as LineBasicMaterial).opacity = 0.25;
        (line.material as LineBasicMaterial).transparent = true;
        this.add(line);
    }
}