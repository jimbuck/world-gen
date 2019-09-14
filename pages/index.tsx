import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../components/Layout';
import Display from '../components/Display';
import Controls from '../components/Controls';
import { useEventShare } from '../hooks/use-event-share';
import {PlanetSettings} from '../models/planet-settings';


export default () => {
    const controlChanges = useEventShare<PlanetSettings>();

    return typeof window === 'undefined' ? null : (
        <Layout>
            <Row>
                <Col>
                    <h1>WorldGen</h1>
                </Col>
            </Row>
            <Row style={{height: ""}}>
                <Col lg={6} xs={12} className="display">
                    <Display controlChanges={controlChanges} />
                </Col>
                <Col lg={6} xs={12} className="controls">
                    <Controls controlChanges={controlChanges} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Inspired by and derived from <a href="https://github.com/SebLague" target="_blank" >Sebastian Lague</a>'s 
                    work on Procedural Planet Generation in Unity (<a href="https://github.com/SebLague/Procedural-Planets" target="_blank">GitHub</a> | <a href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0cONs3T0By4puYy6GM22ko8" target="_blank">YouTube</a>).</p>
                </Col>
            </Row>
        </Layout>);
}