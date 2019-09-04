import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import {PlanetSettings} from '../models/planet-settings';
import { EventShare } from '../hooks/event-share';

const controls = {
    seedInput: 'seedInput',
    autoUpdateCheckbox: 'autoUpdateCheckbox',
    wireframesCheckbox: 'wireframesCheckbox',
    resolutionSlider: 'resolutionSlider',
    radiusSlider: 'radiusSlider',
};

export default ({controlChanges}: {controlChanges: EventShare<Partial<PlanetSettings>>}) => {
    const [seed, setSeed] = useState('' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [wireframes, setWireframes] = useState(true);
    const [resolution, setResolution] = useState(8);
    const [radius, setRadius] = useState(1);

    //console.log(`Rendering Controls...`, {seed, autoUpdate, wireframes, resolution, radius});

    if(autoUpdate) emitChanges();

    return (
        <>
            {/* <Row>
                <Col><h2>Controls</h2></Col>
            </Row> */}
            <Row>
                <Col>
                    <Form>
                        <Tabs id='control-tabs' defaultActiveKey='planet-info-tab'>
                            <Tab id='planet-info-tab' eventKey='planet-info-tab' title='Details'>
                                <Form.Group controlId={controls.seedInput}>
                                    <Form.Label>Seed:</Form.Label>
                                    <Form.Control type="input" value={seed+''} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.wireframesCheckbox}>
                                    <Form.Check type='checkbox' label='Wireframes' checked={wireframes} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.radiusSlider}>
                                    <Form.Label>Radius: {radius}</Form.Label>
                                    <Form.Control type="range" min={0.25} max={16} step={0.05} value={radius+''} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.resolutionSlider}>
                                    <Form.Label>Resolution: {resolution}</Form.Label>
                                    <Form.Control type="range" min={2} max={64} step={1} value={resolution+''} onChange={handleFormChange} />
                                </Form.Group>
                            </Tab>
                        </Tabs>
                        <Form.Group controlId={controls.autoUpdateCheckbox}>
                            <Form.Check type='checkbox' label='Auto Update' checked={autoUpdate} onChange={handleFormChange} />
                        </Form.Group>
                        {autoUpdate ? null : <Button block onClick={emitChanges}>Update</Button>}
                    </Form>
                </Col>
            </Row>
        </>
    );

    function handleFormChange(e: any) {
        switch (e.target.id) {
            case controls.seedInput:
                setSeed(e.target.value);
                break;
            case controls.autoUpdateCheckbox:
                setAutoUpdate(e.target.checked);
                break;
            case controls.wireframesCheckbox:
                setWireframes(e.target.checked);
                break;
            case controls.resolutionSlider:
                setResolution(parseInt(e.target.value, 10));
                break;
            case controls.radiusSlider:
                setRadius(parseFloat(e.target.value));
                break;
        }
    }

    function emitChanges() {
        controlChanges.emit({ seed, resolution, radius, wireframes });
    }
}
