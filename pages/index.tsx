import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Mesh, BoxGeometry, MeshBasicMaterial, 
    Scene, AmbientLight, PointLight, MeshPhongMaterial, Vector3 } from 'three';

import Layout from '../components/Layout';
import Renderer from '../components/Renderer';
import { Planet } from '../models/planet';

export default () => {
    let planet: Planet;
    const initScene = (scene: Scene, renderer, context) => {
        let material = new MeshPhongMaterial({
            color: '#1c17a6',
            specular: '#ffffff'
        });

        planet = new Planet(16, material);
        planet.position.x = planet.position.y = planet.position.z = 0;
        scene.add(planet);

        const ambientLight = new AmbientLight('#ffffff', 0.5)
        scene.add(ambientLight);

        const pointLight = new PointLight('#ffffff', 1.0)
        pointLight.position.set(5, 10, 5)
        scene.add(pointLight);
    };

    const updateScene = (scene: Scene, renderer, context) => {
        planet.rotation.x += 0.01;
        planet.rotation.y += 0.01;

        console.log(scene.children);
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
                </Col>
            </Row>
        </Layout>)
}; 
