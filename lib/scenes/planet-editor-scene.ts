import * as THREE from 'three';

import SceneManager from './base-scene-manager';
import { PlanetMesh } from '../models/planet-mesh';

export default class PlanetEditorSceneManager implements SceneManager {

	public planet: PlanetMesh;
	public scene: THREE.Scene;
	public camera: THREE.Camera;

	private _renderer: THREE.WebGLRenderer;
	private _handleAnimationFrame: (deltaT: number) => void;
	private _prevT: number = 0;

	constructor() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('#000000');

		this.planet = new PlanetMesh();
		this.scene.add(this.planet);

		const ambientLight = new THREE.AmbientLight('#ffffff', 0.15)
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight('#efe8e9', 0.8)
		directionalLight.position.set(-1000, 0, 1000)
		directionalLight.target = this.planet;
		this.scene.add(directionalLight);

		this._handleAnimationFrame = (t) => {
			const dT = (t - this._prevT) / 1000;
			this._prevT = t;
			this.planet.update(dT);

			this._renderer.render(this.scene, this.camera);
		};
	}

	public init(canvas: HTMLCanvasElement) {
		canvas.height = 1080;
		canvas.width = canvas.height;// * (16 / 9);

		this._renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true
		});
		this._renderer.setPixelRatio(window.devicePixelRatio);

		this.camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
		this.camera.position.set(0, 0, 5);
		this.camera.lookAt(0, 0, 0);
	}

	public start() {
		this._renderer.setAnimationLoop(this._handleAnimationFrame.bind(this));
	}

	public stop() {
		this._renderer.setAnimationLoop(null);
	}
}