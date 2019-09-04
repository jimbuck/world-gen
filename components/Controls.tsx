import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';

import LayerEditor from './editors/LayerEditor';

import {PlanetSettings, NoiseLayer, MaskTypes} from '../models/planet-settings';
import { EventShare } from '../hooks/event-share';
import guid from '../services/guid';

const controls = {
    nameInput: 'nameInput',
    seedInput: 'seedInput',
    autoUpdateCheckbox: 'autoUpdateCheckbox',
    wireframesCheckbox: 'wireframesCheckbox',
    resolutionSlider: 'resolutionSlider',
    radiusSlider: 'radiusSlider'
};

const tabClasses = 'border-left border-right border-bottom';
const tabStyles = {
    paddingTop: '10px',
    paddingLeft: '6px',
    paddingRight: '6px'
};

export default ({ controlChanges }: { controlChanges: EventShare<Partial<PlanetSettings>> }) => {
    const [name, setName] = useState('My New Planet');
    const [seed, setSeed] = useState('' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [wireframes, setWireframes] = useState(true);
    const [resolution, setResolution] = useState(8);
    const [radius, setRadius] = useState(1);
    const [layers, setLayers] = useState<NoiseLayer[]>([{
        id: guid(),
        name: "Layer 0",
        enabled: true,
        maskType: MaskTypes.None
    }]);

    if(autoUpdate) emitChanges();

    return (
        <>
            <Row>
                <Col><h2>Controls</h2></Col>
            </Row>
            <Row>
                <Col>
                    <Form autoComplete='off'>
                        <Tabs id='control-tabs' defaultActiveKey='planet-info-tab' className='nav-fill'>
                            <Tab id='planet-info-tab' eventKey='planet-info-tab' title='Details' className={tabClasses} style={tabStyles} >
                                <Form.Group controlId={controls.nameInput}>
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="input" value={name+''} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.seedInput}>
                                    <Form.Label>Seed:</Form.Label>
                                    <Form.Control type="input" value={seed+''} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.radiusSlider}>
                                    <Form.Label>Radius: {radius}</Form.Label>
                                    <Form.Control type="range" min={0.25} max={16} step={0.05} value={radius+''} onChange={handleFormChange} />
                                </Form.Group>                                
                            </Tab>
                            <Tab id='layers-tab' eventKey='layers-tab' title='Layers' className={tabClasses} style={{...tabStyles, paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
                                <LayerEditor layers={layers} onLayerChange={handleLayersChange} />
                            </Tab>
                            <Tab id='graphics-tab' eventKey='graphics-tab' title='Graphics' className={tabClasses} style={tabStyles}>
                                <Form.Group controlId={controls.autoUpdateCheckbox}>
                                    <Form.Check type='checkbox' label='Auto Update' checked={autoUpdate} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.wireframesCheckbox}>
                                    <Form.Check type='checkbox' label='Wireframes' checked={wireframes} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group controlId={controls.resolutionSlider}>
                                    <Form.Label>Resolution: {resolution}</Form.Label>
                                    <Form.Control type="range" min={2} max={64} step={1} value={resolution+''} onChange={handleFormChange} />
                                </Form.Group>
                            </Tab>
                        </Tabs>
                        {autoUpdate ? null : <Button block onClick={emitChanges} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>Update</Button>} 
                    </Form>           
                </Col>
            </Row>
        </>
    );

    function handleFormChange(e: any) {
        switch (e.target.id) {
            case controls.nameInput:
                setName(e.target.value);
                break;
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

    function handleLayersChange(updatedLayers: NoiseLayer[]) {
        setLayers(updatedLayers);
    }

    function emitChanges() {
        controlChanges.emit({ name, seed, resolution, radius, wireframes, planetLayers: layers });
    }
}
