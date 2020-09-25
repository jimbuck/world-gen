
import { useLayoutEffect, useRef } from 'react';

import SceneManager from '../scenes/base-scene-manager';

export default function SceneDisplay ({sceneManager}: {sceneManager: SceneManager}) {
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