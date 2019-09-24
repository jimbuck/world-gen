import { Mesh, LineSegments, Material, Geometry, WireframeGeometry, LineBasicMaterial, Color, Vector3, Face3, Vector2 } from 'three';
import { directionsList, Direction } from './direction';

export class QuadSphereMesh extends Mesh {
	public get radius() { return this.scale.x; }
	public set radius(value: number) {
		value = Math.sqrt(value);
		this.scale.set(value, value, value);
	}

	private _resolution: number;
	public get resolution(): number { return this._resolution; }
	public set resolution(value: number) {
		this._resolution = Math.max(Math.min(value, 256), 2);
	}

	private _wireframes: LineSegments;
	public get wireframes() { return this._wireframes.visible; }
	public set wireframes(value: boolean) {
		this._wireframes.visible = value;
	}

	public constructor(radius: number, resolution: number, material?: Material) {
		super(new Geometry(), material);

		this.radius = radius;
		this.resolution = resolution;

		this._wireframes = new LineSegments();
		this._wireframes.visible = false;
		this.add(this._wireframes);

		this.regenerateMesh();
	}

	public regenerateMesh() {
		this.geometry.dispose();
		this.geometry = new Geometry();
		directionsList.forEach(direction => {
			(this.geometry as Geometry).merge(this.generateFaceGeometry(direction));
		});

		// Merge the vertices into a single geometry (fixes edge creases).
		this.geometry.mergeVertices();
		this.geometry.computeFaceNormals();
		this.geometry.computeVertexNormals();

		// Build the wireframes
		this._wireframes.geometry.dispose();
		this._wireframes.geometry = new WireframeGeometry(this.geometry);
		(this._wireframes.material as LineBasicMaterial).color = new Color(0x000000);
		(this._wireframes.material as LineBasicMaterial).linewidth = 2;
		(this._wireframes.material as LineBasicMaterial).opacity = 0.25;
		(this._wireframes.material as LineBasicMaterial).transparent = true;
	}

	private generateFaceGeometry(localUp: Direction) {
		const axisA = new Vector3(localUp.vector.y, localUp.vector.z, localUp.vector.x);
		const axisB = localUp.vector.clone().cross(axisA);

		const geometry = new Geometry();
		const vertices: Vector3[] = [];
		const triangles: Face3[] = [];

		for (let y = 0; y < this.resolution; y++) {
			for (let x = 0; x < this.resolution; x++) {
				const i = x + y * this.resolution;
				const percent = new Vector2(x, y).divideScalar(this.resolution - 1);
				const pointOnUnitCube = localUp.vector.clone()
					.add(axisA.clone().multiplyScalar((percent.x - 0.5) * 2))
					.add(axisB.clone().multiplyScalar((percent.y - 0.5) * 2));

					vertices[i] = pointOnUnitCube.clone().normalize();

				//console.log(`${this.localUp.name}: ${x}x${y} ->`, vertices[i],  ` -> ${vertices[i]}`);

				if (x != this.resolution - 1 && y != this.resolution - 1) {

					triangles.push(
						new Face3(i, i + this.resolution + 1, i + this.resolution),
						new Face3(i, i + 1, i + this.resolution + 1));
				}
			}
		}

		geometry.vertices = vertices;
		geometry.faces = triangles;

		return geometry;
	}
	
	public onBeforeRender = () => {};
}