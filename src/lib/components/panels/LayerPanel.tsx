
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Octicon, { Trashcan } from '@primer/octicons-react';

import { NumberSlider, Vector2Slider, Vector3Slider} from '../../../common/components/FieldEditors';

import { PlanetLayer, MaskTypes, createContinentNoise, createMoutainNoise, NoiseSettings } from '../../models/planet-settings';
import { PlanetEditorState } from '../../hooks/use-planet-editor-state';
import { guid } from '../../../common/services/helpers';

export default ({ planetState }: { planetState: PlanetEditorState }) => {
    return (
        <ListGroup as="ul" variant='flush'>
            {planetState.layers.current.map((layer, i) => (
                <ListGroup.Item as="li" key={layer.id} style={{backgroundColor: i % 2 === 0 ? '#f8f9fa' : null}}>
                    <Form.Group>
                        <div className='d-flex mb-2'>
                            <Form.Label className='font-weight-bold'>Label:</Form.Label>
                            <Button className='ml-auto btn-sm' variant='outline-danger' onClick={removeLayer(i)}>
                                <Octicon icon={Trashcan} />
                            </Button>
                        </div>
                        <Form.Control type="input" name='label' value='' onChange={handleLayerChange(layer, i)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' label='Enabled' name='enabled' checked={layer.enabled} onChange={handleLayerChange(layer, i)} />
                    </Form.Group>
                    <NumberSlider label="BaseRoughness" min={0.1} max={5} step={0.1} value={layer.noiseSettings.baseRoughness} onChange={handleNoiseChange('baseRoughness', layer, i)} />
                    <NumberSlider label="Roughness" min={0.1} max={5} step={0.1} value={layer.noiseSettings.roughness} onChange={handleNoiseChange('roughness', layer, i)} />
                    <NumberSlider label="Octaves" min={1} max={8} step={1} value={layer.noiseSettings.octaves} onChange={handleNoiseChange('octaves', layer, i)} />
                    <NumberSlider label="Persistence" min={0.1} max={2} step={0.05} value={layer.noiseSettings.persistence} onChange={handleNoiseChange('persistence', layer, i)} />
                    <NumberSlider label="MinValue" min={-1} max={1} step={0.05} value={layer.noiseSettings.minValue} onChange={handleNoiseChange('minValue', layer, i)} />
                    <NumberSlider label="Strength" min={0} max={4} step={0.05} value={layer.noiseSettings.strength} onChange={handleNoiseChange('strength', layer, i)} />
                    <Vector2Slider label="Strech" min={0.1} max={10} step={0.1} value={layer.noiseSettings.strech} onChange={handleNoiseChange('strech', layer, i)} />
                    <Vector3Slider label="Offset" min={-10} max={10} step={0.1} value={layer.noiseSettings.offset} onChange={handleNoiseChange('offset', layer, i)} />
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

    function addLayer(type: string) {
        return function () {
            planetState.layers.push({
                id: guid(),
                enabled: true,
                maskType: planetState.layers.current.length === 0 ? MaskTypes.None : MaskTypes.FirstLayer,
                noiseSettings: type === 'Continents' ? createContinentNoise() : createMoutainNoise()
            });
        }
    }

    function removeLayer(index: number) {
        return function () {
            planetState.layers.removeAt(index);
        }
    }

    function handleNoiseChange(field: keyof NoiseSettings, layer: PlanetLayer, index: number) {
        let fields = { ...layer };

        return function (value: any) {
            fields.noiseSettings[field] = value;
            planetState.layers.update(index, fields);
        };
    }

    function handleLayerChange(layer: PlanetLayer, index: number) {

        let fields = { ...layer };

        return function (e: any) {
            //console.log(`${e.target.name} -> ${e.target.value}`);
            switch (e.target.name) {
                case 'enabled':
                    fields.enabled = e.target.checked;
                    break;
                case 'maskType':
                    fields.maskType = e.target.value;
            }

            planetState.layers.update(index, fields);
        };
    }
}