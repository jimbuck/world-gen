import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';

import Octicon, { Check } from '@primer/octicons-react';

import LayerPanel from './panels/LayerPanel';
import InfoPanel from './panels/InfoPanel';

import { PlanetSettings, PlanetLayer, MaskTypes, createContinentNoise, createMoutainNoise } from '../models/planet-settings';
import { EventShare } from '../hooks/use-event-share';
import { useStateArray, useStateArrayPersisted } from '../hooks/use-state-array';
import useStatePersisted from '../hooks/use-state-persisted';
import { guid, randomSeed } from '../services/helpers';
import GraphicsPanel from './panels/GraphicsPanel';

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
    const [activeTab, setActiveTab] = useStatePersisted('world-gen:active-tab', 'planet-info-tab');
    const [name, setName] = useStatePersisted('world-gen:planet-name', 'New Planet');
    const [seed, setSeed] = useStatePersisted('world-gen:seed', randomSeed());
    const [autoUpdate, setAutoUpdate] = useStatePersisted('world-gen:auto-update', true);
    const [wireframes, setWireframes] = useStatePersisted('world-gen:wireframes', true);
    const [resolution, setResolution] = useStatePersisted('world-gen:resolution', 30);
    const [radius, setRadius] = useStatePersisted('world-gen:radius', 1);
    const [color, setColor] = useState('#2D6086');

    const layers = useStateArray<PlanetLayer>([
        //const layers = useStateArrayPersisted<PlanetLayer>('world-gen:layers', [{
        {
            id: guid(),
            label: `Continent Layer`,
            enabled: true,
            maskType: MaskTypes.None,
            noiseSettings: createContinentNoise()
        },
        // {
        //     id: guid(),
        //     label: `Mountain Layer`,
        //     enabled: true,
        //     maskType: MaskTypes.None,
        //     noiseSettings: createMoutainNoise()
        // }
    ]);

    // Trigger a change if auto-update is enabled.
    useEffect(() => {
        if (autoUpdate) emitChanges();
    }, [name, seed, autoUpdate, wireframes, resolution, radius, color, layers]);

    return (
        <>
            <Row>
                <Col><h2>Controls</h2></Col>
            </Row>
            <Row>
                <Col>
                    <Form autoComplete='off' data-lpignore="true">
                        <Tabs id='control-tabs' activeKey={activeTab} onSelect={k => setActiveTab(k)} className='nav-fill' transition={false}>
                            <Tab id='planet-info-tab' eventKey='planet-info-tab' title='Info' className={tabClasses} style={tabStyles} >
                                <InfoPanel {...{ name, seed, radius, color, handleFormChange, handleSeedRandomization, handleColorChange }} />
                            </Tab>
                            <Tab id='layers-tab' eventKey='layers-tab' title='Layers' className={tabClasses} style={{ ...tabStyles, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
                                <LayerPanel seed={seed} layers={layers} />
                            </Tab>
                            <Tab id='graphics-tab' eventKey='graphics-tab' title='Graphics' className={tabClasses} style={tabStyles}>
                                <GraphicsPanel {...{ autoUpdate, wireframes, resolution, handleFormChange }} />
                            </Tab>
                        </Tabs>
                        {autoUpdate ? null : <Button block onClick={emitChanges} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Update <Octicon icon={Check} /></Button>}
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
