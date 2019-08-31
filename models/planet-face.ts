
import { Vector3, Vector2, Geometry, Face3, Object3D, Mesh, LineSegments, WireframeGeometry, LineBasicMaterial, Color } from 'three';

import { Direction } from './direction';

export class PlanetFace extends Object3D {

    private axisA: Vector3;
    private axisB: Vector3;

    private get geometry() {
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

    public BuildMesh(resolution: number, radius: number) {
        const vertices: Vector3[] = [];//new Array(this.resolution * this.resolution);
        const triangles: Face3[] = [];//[(this.resolution - 1) * (this.resolution - 1) * 2];

        for (let y = 0; y < resolution; y++) {
            for (let x = 0; x < resolution; x++) {
                const i = x + y * resolution;
                const percent = new Vector2(x, y).divideScalar(resolution - 1);
                const pointOnUnitCube = this.localUp.vector.clone()
                    .add(this.axisA.clone().multiplyScalar((percent.x - 0.5) * 2))
                    .add(this.axisB.clone().multiplyScalar((percent.y - 0.5) * 2));

                const pointOnUnitSphere = pointOnUnitCube.clone().normalize();
                vertices[i] = pointOnUnitSphere.multiplyScalar(radius || 1);

                //console.log(`${this.localUp.name}: ${x}x${y} ->`, vertices[i],  ` -> ${vertices[i]}`);

                if (x != resolution - 1 && y != resolution - 1) {

                    triangles.push(
                        new Face3(i, i + resolution + 1, i + resolution),
                        new Face3(i, i + 1, i + resolution + 1));
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
        (line.material as LineBasicMaterial).depthTest = false;
        (line.material as LineBasicMaterial).opacity = 0.25;
        (line.material as LineBasicMaterial).transparent = true;
        this.add(line);
    }
}

