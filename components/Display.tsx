
import { useEffect, useRef } from 'react';
import {
    WebGLRenderer, Scene, PerspectiveCamera, Color,
    AxesHelper,
    AmbientLight,
    PointLight
} from 'three';
import { Planet } from '../models/planet';
import PlanetSettings from '../models/planet-settings';
import { EventShare } from '../hooks/event-share';


export default ({ controlChanges }: { controlChanges: EventShare<PlanetSettings> }) => {
    console.log(`Rendering Display...`);
    let planet: Planet;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initScene = (scene: Scene, renderer, context) => {
        planet = new Planet();
        planet.radius = 1;
        planet.resolution = 8;
        planet.wireframes = true;

        planet.initialize();
        scene.add(planet);
    };

    const updateScene = (deltaT: number, scene: Scene, renderer, context) => {
        planet.rotation.y = deltaT * 0.5;
    };


    useEffect(() => {
        canvasRef.current.width = window.outerWidth / 1.5;
        canvasRef.current.height = canvasRef.current.width * (9 / 16);

        const renderer = new WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        const glCtx = renderer.getContext();

        const scene = new Scene();
        scene.background = new Color('#333333');
        scene.add(new AxesHelper(5));

        const camera = new PerspectiveCamera(60, canvasRef.current.width / canvasRef.current.height, 0.1, 1000);
        camera.position.set(3, 2, 3);
        camera.lookAt(0, 0, 0);

        const ambientLight = new AmbientLight('#ffffff', 0.5)
        scene.add(ambientLight);

        const pointLight = new PointLight('#ffffff', 1.0)
        pointLight.position.set(5, 10, 5)
        scene.add(pointLight);

        // Call user's callback for initialization
        initScene(scene, renderer, glCtx);

        renderer.setAnimationLoop(handleAnimationFrame);

        return () => {
            renderer.setAnimationLoop(null);
        }

        function handleAnimationFrame() {
            const deltaT = Date.now() * 0.001;
            updateScene(deltaT, scene, renderer, glCtx);
            renderer.render(scene, camera);
        }
    });

    useEffect(() => {
        controlChanges.bind(controlsChanged);

        return () => controlChanges.unbind(controlsChanged);

        function controlsChanged(settings: PlanetSettings) {
            Object.assign(planet, settings);
            planet.onShapeSettingsUpdated();
        }
    });

    return <canvas ref={canvasRef} style={{ width: '100%' }} />
};