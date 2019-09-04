import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Octicon, { Trashcan } from '@primer/octicons-react';

import { NoiseLayer, MaskTypes } from '../../models/planet-settings';
import guid from '../../services/guid';

export default ({ layers, onLayerChange }: {layers: NoiseLayer[], onLayerChange: (e: NoiseLayer[]) => void}) => {
    

    return (
        <ListGroup as="ul" variant='flush'>
            {layers.map((layer, i) => (
                <ListGroup.Item as="li" key={layer.id} style={{backgroundColor: i % 2 === 0 ? '#f8f9fa' : null}}>
                    <Form.Group>
                        <div className='d-flex mb-2'>
                            <Form.Label >Name:</Form.Label>
                            <Button className='ml-auto btn-sm' variant='outline-danger' onClick={removeLayer(i)}>
                                <Octicon icon={Trashcan} />
                            </Button>
                        </div>
                        <Form.Control type="input" name='name' value={layer.name} onChange={handleLayerChange(layer, i)} />
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
                    <Dropdown.Item onClick={addLayer('Continents')}>Continents</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Mountains')}>Mountains</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Plataues')}>Plataues</Dropdown.Item>
                    <Dropdown.Item onClick={addLayer('Hills')}>Hills</Dropdown.Item>
                </DropdownButton>
            </ListGroup.Item>
        </ListGroup>
    );

    function addLayer(type) {
        return function () {
            onLayerChange([...layers, {
                id: guid(),
                name: `${type} Layer ${layers.length}`,
                enabled: true,
                maskType: layers.length === 0 ? MaskTypes.None : MaskTypes.FirstLayer
            }]);
        }
    }

    function removeLayer(index: number) {
        return function () {
            onLayerChange([...layers.slice(0, index), ...layers.slice(index + 1)]);
        }
    }

    function handleLayerChange(layer: NoiseLayer, index: number) {

        layer = { ...layer };

        return function (e: any) {
            console.log(`${e.target.name} -> ${e.target.value}`);
            switch (e.target.name) {
                case 'name':
                    layer.name = e.target.value;
                    break;
                case 'enabled':
                    layer.enabled = e.target.checked;
                    break;
                case 'maskType':
                    layer.maskType = e.target.value;
            }

            onLayerChange([...layers.slice(0, index), layer, ...layers.slice(index + 1)]);
        };
    }
}