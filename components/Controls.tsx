import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';

import { Vector3 } from 'three';

import Octicon, { Check } from '@primer/octicons-react';

import LayerEditor from './editors/LayerEditor';
import InfoEditor from './editors/InfoEditor';

import {PlanetSettings, PlanetLayer, MaskTypes} from '../models/planet-settings';
import { EventShare } from '../hooks/use-event-share';
import { useStateArray } from '../hooks/use-state-array';
import {guid, randomSeed} from '../services/helpers';

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
    const [name, setName] = useState('New Planet');
    const [seed, setSeed] = useState(randomSeed());
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [wireframes, setWireframes] = useState(true);
    const [resolution, setResolution] = useState(30);
    const [radius, setRadius] = useState(1);
    const [color, setColor] = useState('#2D6086');
    
    const layers = useStateArray<PlanetLayer>([{
        id: guid(),
        label: `Layer 0`,
        enabled: true,
        maskType: MaskTypes.None,
        noiseSettings: {
            baseRoughness: 1,
            roughness: 1.5,
            persistence: 0.1,
            octaves: 3,
            center: new Vector3(0,0,0),
            minValue: 0.6,
            strength: 0.5
        }
    }]);

    // Trigger a change if auto-update is enabled.
    useEffect(() => {
        if (autoUpdate) emitChanges();
    });

    return (
        <>
            <Row>
                <Col><h2>Controls</h2></Col>
            </Row>
            <Row>
                <Col>
                    <Form autoComplete='off' data-lpignore="true">
                        <Tabs id='control-tabs' defaultActiveKey='planet-info-tab' className='nav-fill' transition={false}>
                            <Tab id='planet-info-tab' eventKey='planet-info-tab' title='Info' className={tabClasses} style={tabStyles} >
                                <InfoEditor {...{ name, seed, radius, color, handleFormChange, handleSeedRandomization, handleColorChange }}  />                             
                            </Tab>
                            <Tab id='layers-tab' eventKey='layers-tab' title='Layers' className={tabClasses} style={{...tabStyles, paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
                                <LayerEditor seed={seed} layers={layers} />
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
                        {autoUpdate ? null : <Button block onClick={emitChanges} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>Update <Octicon icon={Check} /></Button>} 
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

    function handleColorChange(newColor: string) {
        setColor(newColor);
    }

    function handleSeedRandomization() {
        setSeed(randomSeed());
    }

    function emitChanges() {
        controlChanges.emit({ name, seed, resolution, radius, color, wireframes, planetLayers: layers.current });
    }
}
