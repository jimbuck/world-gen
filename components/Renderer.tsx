
import { useEffect, useRef } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, PointLight } from 'three';

export default ({ initScene, updateScene }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
       
    useEffect(() => {
        canvasRef.current.width = 800;
        canvasRef.current.height = canvasRef.current.width * (9/16);

        const renderer = new WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true
        });
        const glCtx = renderer.getContext();

        let frameId: number;
        function handleAnimationFrame() {
            updateScene(scene, renderer, glCtx);
            renderer.render(scene, camera);
            frameId = window.requestAnimationFrame(handleAnimationFrame);
        }

        const scene = new Scene();

        const camera = new PerspectiveCamera(60, canvasRef.current.width / canvasRef.current.height, 0.1, 1000);
        camera.position.z = 5;

        // Call user's callback for initialization
        initScene(scene, renderer, glCtx)

        // When browser will be ready to repaint canvas,
        // this.handleAnimationFrame will be called
        frameId = window.requestAnimationFrame(handleAnimationFrame)

        return () => {
            window.cancelAnimationFrame(frameId)
        }
    });

    return <canvas ref={canvasRef} />
};