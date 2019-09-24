
import { useLayoutEffect, useRef } from 'react';

import SceneManager from '../scenes/base-scene-manager';

export default ({sceneManager}: {sceneManager: SceneManager}) => {
    console.log(`Rendering SceneDisplay...`);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        console.log('Starting scene...');
        sceneManager.init(canvasRef.current);
        sceneManager.start();

        return () => {
            console.log('Stopping scene...');
            sceneManager.stop();
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%' }} />
}