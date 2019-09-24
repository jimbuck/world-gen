
import { useEffect, useRef } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, Color, AxesHelper, AmbientLight, DirectionalLight } from 'three';
import { PlanetReducer } from '../hooks/use-planet-reducer';

export default ({ planetReducer }: { planetReducer: PlanetReducer }) => {
    console.log(`Rendering Display...`);
    let rotate = true;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initScene = (scene: Scene, renderer) => {
        planetReducer.planet.initialize();
        scene.add(planetReducer.planet);
    };

    const updateScene = (deltaT: number, scene: Scene, renderer) => {
        if(rotate) planetReducer.planet.rotation.y = deltaT * 0.5;
    };

    useEffect(() => {
        canvasRef.current.height = 1080;
        canvasRef.current.width = canvasRef.current.height;// * (16 / 9);

        const renderer = new WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new Scene();
        scene.background = new Color('#000000');
        //scene.add(new AxesHelper(4));

        const camera = new PerspectiveCamera(60, canvasRef.current.width / canvasRef.current.height, 0.1, 1000);
        camera.position.set(0, 0, 6);
        camera.lookAt(0, 0, 0);

        const ambientLight = new AmbientLight('#ffffff', 0.15)
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight('#efe8e9', 0.8)
        directionalLight.position.set(-1000, 0, 1000)
        directionalLight.target = planetReducer.planet;
        scene.add(directionalLight);

        // Call user's callback for initialization
        initScene(scene, renderer);

        renderer.setAnimationLoop(handleAnimationFrame);

        return () => {
            renderer.setAnimationLoop(null);
        }

        function handleAnimationFrame(deltaT) {
            deltaT = deltaT / 1000;
            updateScene(deltaT, scene, renderer);
            renderer.render(scene, camera);
        }
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%' }} />
};