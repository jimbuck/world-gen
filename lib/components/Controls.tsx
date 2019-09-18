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
import { useStateArray, useStateArrayPersisted } from '../../common/hooks/use-state-array';
import useStatePersisted from '../../common/hooks/use-state-persisted';
import { PlanetReducer } from '../hooks/use-planet-reducer';
import { guid, randomSeed } from '../../common/services/helpers';
import GraphicsPanel from './panels/GraphicsPanel';

const controls = {
    nameInput: 'nameInput',
    seedInput: 'seedInput',
    autoUpdateCheckbox: 'autoUpdateCheckbox',
    wireframesCheckbox: 'wireframesCheckbox',
    resolutionSlider: 'resolutionSlider',
    radiusSlider: 'radiusSlider',
    rotateCheckbox: 'rotateCheckbox'
};

const tabClasses = 'border-left border-right border-bottom';
const tabStyles = {
    paddingTop: '10px',
    paddingLeft: '6px',
    paddingRight: '6px'
};

export default ({ planetReducer }: { planetReducer: PlanetReducer }) => {
    const [activeTab, setActiveTab] = useStatePersisted('world-gen:active-tab', 'planet-info-tab');

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
                                <InfoPanel {...{ planetReducer }} />
                            </Tab>
                            <Tab id='layers-tab' eventKey='layers-tab' title='Layers' className={tabClasses} style={{ ...tabStyles, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
                                <LayerPanel {...{ planetReducer }} />
                            </Tab>
                            <Tab id='graphics-tab' eventKey='graphics-tab' title='Graphics' className={tabClasses} style={tabStyles}>
                                <GraphicsPanel {...{ planetReducer }} />
                            </Tab>
                        </Tabs>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
