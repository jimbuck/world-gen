import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Scene, AmbientLight, PointLight } from 'three';

import Layout from '../components/Layout';
import Renderer from '../components/Renderer';
import Controls from '../components/Controls';
import { Planet } from '../models/planet';


export default () => {
    
    let planet: Planet;
    const initScene = (scene: Scene, renderer, context) => {
        console.log(`Initializing scene...`);
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

    return (
        <Layout>
            <Row>
                <Col>
                    <h1>Planet Builder</h1>
                </Col>
            </Row>
            <Row style={{height: ""}}>
                <Col xs={9} className="display">
                    <Renderer initScene={initScene} updateScene={updateScene} />
                </Col>
                <Col xs={3} className="controls">
                    <Row>
                        <Col><h2>Controls</h2></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Controls />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>)
}; 
