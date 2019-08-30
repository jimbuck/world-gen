
import { Vector3, Material, Mesh, Geometry, Group, WireframeGeometry, LineSegments } from 'three';
import { PlanetFace } from './planet-face';

const directions = [
    new Vector3(0, 1, 0), // UP
    new Vector3(0, -1, 0), // DOWN
    new Vector3(-1, 0, 0), // LEFT
    new Vector3(1, 0, 0), // RIGHT
    new Vector3(0, 0, 1), // FORWARD
    new Vector3(0, 0, -1)  // BACK
];

export class Planet extends Group {

    private meshes: Mesh[] = [];
    private planetFaces: PlanetFace[] = [];

    public constructor(
        public resolution: number,
        material: Material
    ) {
        super();
        
        this.Init(material);
        this.BuildMesh();
    }

    private Init(material: Material) {
        
        for (let i = 0; i < 6; i++) {
            if (!this.meshes[i]) {
                this.meshes[i] = new Mesh(new Geometry(), material);
                this.meshes[i].parent = this;
                this.add(this.meshes[i]);
            }

            this.planetFaces[i] = new PlanetFace(this.meshes[i].geometry as Geometry, this.resolution, directions[i]);

            const wireframe = new WireframeGeometry( this.meshes[i].geometry as Geometry );
            var line = new LineSegments(wireframe);
            (line.material as Material).depthTest = false;
            (line.material as Material).opacity = 0.25;
            (line.material as Material).transparent = true;

            this.add(line);
        }
    }

    private BuildMesh() {
        this.planetFaces.forEach(face => face.BuildMesh());
    }
}
