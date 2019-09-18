import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../components/Layout';


export default () => {
    return typeof window === 'undefined' ? null : (
        <Layout>
            <Row>
                <Col>
                    <h1>Home</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    Main menu...
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