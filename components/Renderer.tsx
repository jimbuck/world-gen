
import { useEffect, useRef } from 'react';
import {
    WebGLRenderer, Scene, PerspectiveCamera, Color,
    AxesHelper,
    AmbientLight,
    PointLight} from 'three';


export default ({ initScene, updateScene }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
       
    useEffect(() => {
        let frameId: number;
        canvasRef.current.width = window.outerWidth / 1.5;
        canvasRef.current.height = canvasRef.current.width * (9/16);

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
        initScene(scene, renderer, glCtx)

        // When browser will be ready to repaint canvas,
        // this.handleAnimationFrame will be called
        frameId = window.requestAnimationFrame(handleAnimationFrame)

        return () => {
            window.cancelAnimationFrame(frameId);
        }

        function handleAnimationFrame() {
            const deltaT = Date.now() * 0.001;
            updateScene(deltaT, scene, renderer, glCtx);
            renderer.render(scene, camera);
            frameId = window.requestAnimationFrame(handleAnimationFrame);
        }
    });

    return <canvas ref={canvasRef} />
};