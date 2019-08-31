
import { MeshPhongMaterial, Group, Mesh, Geometry} from 'three';
import { PlanetFace } from './planet-face';

import { directionsList } from './direction';

export class Planet extends Group {
    private planetFaces: PlanetFace[] = [];

    public wireframes: boolean;
    public resolution: number;
    public radius: number;

    public initialize()
    {
        this.init();
        this.generateMesh();
        this.generateColors();
    }

    public onShapeSettingsUpdated()
    {
        this.init();
        this.generateMesh();
    }

    public onColorSettingsUpdated()
    {
        this.init();
        this.generateColors();
    }

    private init() {
        const material = new MeshPhongMaterial({
            color: '#aaaaaa',
            specular: '#ffffff'
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
            face.BuildMesh(this.resolution, this.radius);
            if (this.wireframes) face.BuildWireframes();
        })
    }

    private generateColors() {
        
    }
}
