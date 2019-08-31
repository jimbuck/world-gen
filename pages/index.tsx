import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../components/Layout';
import Display from '../components/Display';
import Controls from '../components/Controls';
import { useEventShare } from '../hooks/use-event-share';
import PlanetSettings from '../models/planet-settings';


export default () => {
    const controlChanges = useEventShare<PlanetSettings>();
    
    return (
        <Layout>
            <Row>
                <Col>
                    <h1>Planet Builder</h1>
                </Col>
            </Row>
            <Row style={{height: ""}}>
                <Col xs={9} className="display">
                    <Display controlChanges={controlChanges} />
                </Col>
                <Col xs={3} className="controls">
                    <Controls controlChanges={controlChanges} />
                </Col>
            </Row>
        </Layout>)
}; 
