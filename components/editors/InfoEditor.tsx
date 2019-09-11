import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { SliderPicker } from 'react-color';
import Octicon, { Sync } from '@primer/octicons-react';

const controls = {
    nameInput: 'nameInput',
    seedInput: 'seedInput',
    radiusSlider: 'radiusSlider',
    colorPicker: 'colorPicker'
};

export default ({ name, seed, radius, color, handleFormChange, handleSeedRandomization, handleColorChange }: {
    name: string,
    seed: string,
    radius: number,
    color: string,
    handleFormChange: (e: any) => void,
    handleSeedRandomization: () => void,
    handleColorChange: (newColor: string) => void
}) => {

    return (
        <>
            <Form.Group controlId={controls.nameInput}>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="input" value={name+''} onChange={handleFormChange} data-lpignore="true"/>
            </Form.Group>
            <Form.Group controlId={controls.seedInput}>
                <Form.Label>Seed:</Form.Label>
                <InputGroup>
                    <Form.Control type="input" value={seed + ''} onChange={handleFormChange} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" title='Randomize' onClick={handleSeedRandomization}>
                            <Octicon icon={Sync} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId={controls.radiusSlider}>
                <Form.Label>Radius: {radius}</Form.Label>
                <Form.Control type="range" min={0.25} max={16} step={0.05} value={radius+''} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Color: {color}</Form.Label>
                <SliderPicker color={color} onChangeComplete={(e) => handleColorChange(e.hex.toUpperCase())} />
            </Form.Group>
        </>
    );
}
