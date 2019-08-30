
import { Vector3, Vector2, Geometry, Face3 } from 'three';

export class PlanetFace {
    
    private axisA: Vector3;
    private axisB: Vector3;

    constructor(
        private geometry: Geometry,
        public resolution: number,
        public localUp: Vector3) {
        
        this.axisA = new Vector3(localUp.y, localUp.z, localUp.x);
        this.axisB = localUp.cross(this.axisA);
    }

    public BuildMesh(): void  {
        const vertices: Vector3[] = [];//new Array(this.resolution * this.resolution);
        const triangles: Face3[] = [];//[(this.resolution - 1) * (this.resolution - 1) * 2];

        for (let y = 0; y < this.resolution; y++){
            for (let x = 0; x < this.resolution; x++) {
                const i = x + y * this.resolution;
                const percent = new Vector2(x, y).divideScalar(this.resolution - 1);
                const pointOnUnitCube = this.localUp.addVectors(
                    this.axisA.multiplyScalar((percent.x - 0.5) * 2),
                    this.axisB.multiplyScalar((percent.y - 0.5) * 2));
                
                vertices[i] = pointOnUnitCube;

                if (x != this.resolution - 1 && y != this.resolution - 1) {

                    triangles.push(
                        new Face3(i, i + this.resolution + 1, i + this.resolution),
                        new Face3(i, i + 1, i + this.resolution + 1));
                }
            }
        }
        
        this.geometry.vertices = vertices;
        this.geometry.faces = triangles;
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
    }
}

