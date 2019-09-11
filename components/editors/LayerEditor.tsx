import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Octicon, { Trashcan } from '@primer/octicons-react';
import { Vector3 } from 'three';

import { PlanetLayer, MaskTypes } from '../../models/planet-settings';
import { StateArray } from '../../hooks/use-state-array';
import { guid } from '../../services/helpers';

export default ({ layers }: { seed: string, layers: StateArray<PlanetLayer> }) => {
    return (
        <ListGroup as="ul" variant='flush'>
            {layers.current.map((layer, i) => (
                <ListGroup.Item as="li" key={layer.id} style={{backgroundColor: i % 2 === 0 ? '#f8f9fa' : null}}>
                    <Form.Group>
                        <div className='d-flex mb-2'>
                            <Form.Label >Label:</Form.Label>
                            <Button className='ml-auto btn-sm' variant='outline-danger' onClick={removeLayer(i)}>
                                <Octicon icon={Trashcan} />
                            </Button>
                        </div>
                        <Form.Control type="input" name='label' value={layer.label} onChange={handleLayerChange(layer, i)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' label='Enabled' name='enabled' checked={layer.enabled} onChange={handleLayerChange(layer, i)} />
                    </Form.Group>
                    {i > 0 ? <Form.Group>
                        <Form.Label>Mask:</Form.Label>
                        <select name='maskType' className='form-control' value={layer.maskType} onChange={handleLayerChange(layer, i)}>
                            <option value={MaskTypes.None}>{MaskTypes.None}</option>
                            <option value={MaskTypes.FirstLayer}>{MaskTypes.FirstLayer}</option>
                            <option value={MaskTypes.PrevLayer}>{MaskTypes.PrevLayer}</option>
                        </select>
                    </Form.Group> : null }
                </ListGroup.Item>
            ))}
            <ListGroup.Item as="li">
                <DropdownButton id='addLayerButton' variant='outline-success' className='text-center' title='Add Layer'>
                    <Dropdown.Header>Terrain Presets</Dropdown.Header>
                    <Dropdown.Item onClick={addLayer('Continents')}>Continents</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Mountains')}>Mountains</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Plataues')}>Plataues</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Hills')}>Hills</Dropdown.Item>
                    <Dropdown.Header>Atmosphere Presets</Dropdown.Header>
                    <Dropdown.Item onClick={addLayer('Light Clouds')}>Light Clouds</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Dense Clouds')}>Dense Clouds</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Hurricans')}>Hurricans</Dropdown.Item>
                    <Dropdown.Header>Orbital Presets</Dropdown.Header>
                    <Dropdown.Item onClick={addLayer('Small Rings')}>Small Rings</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Large Rings')}>Large Rings</Dropdown.Item>
                </DropdownButton>
            </ListGroup.Item>
        </ListGroup>
    );

    function addLayer(type) {
        return function () {
            layers.push({
                id: guid(),
                label: `${type} ${layers.current.length}`,
                enabled: true,
                maskType: layers.current.length === 0 ? MaskTypes.None : MaskTypes.FirstLayer,
                noiseSettings: {
                    baseRoughness: 1,
                    roughness: 1.5,
                    persistence: 0.1,
                    octaves: 3,
                    center: new Vector3(0,0,0),
                    minValue: 0.6,
                    strength: 0.5
                }
            });
        }
    }

    function removeLayer(index: number) {
        return function () {
            layers.removeAt(index);
        }
    }

    function handleLayerChange(layer: PlanetLayer, index: number) {

        layer = { ...layer };

        return function (e: any) {
            //console.log(`${e.target.name} -> ${e.target.value}`);
            switch (e.target.name) {
                case 'label':
                    layer.label = e.target.value;
                    break;
                case 'enabled':
                    layer.enabled = e.target.checked;
                    break;
                case 'maskType':
                    layer.maskType = e.target.value;
            }

            layers.update(index, layer);
        };
    }
}