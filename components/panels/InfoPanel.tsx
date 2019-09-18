import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { SliderPicker } from 'react-color';
import Octicon, { Sync } from '@primer/octicons-react';

import { PlanetReducer, PlanetEditorState } from '../../hooks/use-planet-reducer';
import { randomSeed } from '../../services/helpers';
import { NumberSlider } from '../editors/FieldEditors';

const controls = {
    nameInput: 'nameInput',
    seedInput: 'seedInput',
    radiusSlider: 'radiusSlider',
    colorPicker: 'colorPicker'
};

export default ({ planetReducer }: {
    planetReducer: PlanetReducer
}) => {

    return (
        <>
            <Form.Group controlId={controls.nameInput}>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="input" value={planetReducer.planet.name+''} onChange={handleFormChange('name')}/>
            </Form.Group>
            <Form.Group controlId={controls.seedInput}>
                <Form.Label>Seed:</Form.Label>
                <InputGroup>
                    <Form.Control type="input" value={planetReducer.planet.seed + ''} onChange={handleFormChange('seed')} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" title='Randomize' onClick={handleSeedRandomization}>
                            <Octicon icon={Sync} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
            <NumberSlider label='Radius' min={0.25} max={16} step={0.05} value={planetReducer.planet.radius} onChange={handleFormChange('radius')} />
            {/* <Form.Group>
                <Form.Label>Color: {color}</Form.Label>
                <SliderPicker color={color} onChangeComplete={(e) => handleColorChange(e.hex.toUpperCase())} />
            </Form.Group> */}
        </>
    );

    function handleFormChange(field: keyof PlanetEditorState) {
        return function (e: any) {
            planetReducer.dispatch({
                field,
                value: e.target.value
            });
        }
    }

    function handleFloatChange(field: keyof PlanetEditorState) {
        return function (e: any) {
            planetReducer.dispatch({
                field,
                value: Number.parseFloat(e.target.value)
            });
        }
    }

    function handleSeedRandomization() {
        planetReducer.dispatch({
            field: 'seed',
            value: randomSeed()
        });
    }
}
