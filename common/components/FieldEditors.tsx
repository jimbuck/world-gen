import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Octicon, { Sync } from '@primer/octicons-react';
import InputGroup from 'react-bootstrap/InputGroup';
import { Vector2, Vector3 } from 'three';

import { randomSeed } from '../services/helpers';
import { SliderPicker } from 'react-color';

const sliderStyle = {
	height: '24px'
};

export function TextBox(props: { label: string, value: string, onChange: (value: string) => void }) {
	return (
		<Form.Group>
			<Form.Label><strong>{props.label}:</strong> {props.value + ''}</Form.Label>
			<Form.Control type="text" value={props.value + ''} onChange={handleChange} />
		</Form.Group>
	);

	function handleChange(e: any) {
		props.onChange && props.onChange(e.target.value);
	}
}

export function SeedInput(props: { label?: string, value: string, onChange: (value: string) => void }) {
	return (
		<Form.Group>
			<Form.Label>{props.label || 'Seed'}:</Form.Label>
				<InputGroup>
						<Form.Control type="input" value={props.value + ''} onChange={handleChange} />
						<InputGroup.Append>
								<Button variant="outline-secondary" title='Randomize' onClick={handleRandomization}>
										<Octicon icon={Sync} />
								</Button>
						</InputGroup.Append>
				</InputGroup>
		</Form.Group>
	);

	function handleRandomization() {
		props.onChange && props.onChange(randomSeed());
	}

	function handleChange(e: any) {
		props.onChange && props.onChange(e.target.value);
	}
}

export function ColorPicker(props: { label: string, value: string, onChange: (value: string) => void }) {
	
	return (
		<Form.Group>
			<Form.Label>{props.label}: {props.value}</Form.Label>
			<SliderPicker color={props.value} onChangeComplete={handleChange} />
		</Form.Group>
	);

	function handleChange(e: any) {
		props.onChange && props.onChange(e.hex.toUpperCase());
	}
}

export function NumberSlider(props: { label: string, min: number, max: number, step: number, value: number, onChange: (value: number) => void }) {
	return (
		<Form.Group>
			<Form.Label><strong>{props.label}:</strong> {props.value}</Form.Label>
			<Form.Control type="range" min={props.min} max={props.max} step={props.step} value={props.value + ''} onChange={handleChange} style={sliderStyle} />
		</Form.Group>
	);

	function handleChange(e: any) {
		const newValue = parseFloat(e.target.value);
		props.onChange && props.onChange(newValue);
	}
}

export function Vector2Slider({ label, min, max, step, value, onChange }: { label: string, min: Vector2 | number, max: Vector2 | number, step?: Vector2 | number, value: Vector2, onChange: (value: Vector2) => void }) {
	step = typeof step === 'undefined' ? 1 : step;

	let vectorMin = typeof min === 'number' ? new Vector2(min, min) : min;
	let vectorMax = typeof max === 'number' ? new Vector2(max, max) : max;
	let vectorStep = typeof step === 'number' ? new Vector2(step, step) : step;

	return (<Form.Group>
		<Form.Label className='font-weight-bold mb-0'>{label}:</Form.Label>
		<Row>
			<Col xs={2}>X: {value.x}</Col>
			<Col className='pl-0'><Form.Control type="range" min={vectorMin.x} max={vectorMax.x} step={vectorStep.x} value={value.x + ''} onChange={handleChange('x')} style={sliderStyle} /></Col>
		</Row>
		<Row>
			<Col xs={2}>Y: {value.y}</Col>
			<Col className='pl-0'><Form.Control type="range" min={vectorMin.y} max={vectorMax.y} step={vectorStep.y} value={value.y + ''} onChange={handleChange('y')} style={sliderStyle} /></Col>
		</Row>
	</Form.Group>);

	function handleChange(part: 'x' | 'y') {
		return (e: any) => {
			const newValue = parseFloat(e.target.value);
			if (onChange) {
				if (part === 'x') {
					onChange(new Vector2(newValue, value.y));
				} else {
					onChange(new Vector2(value.x, newValue));
				}
			}
		}
	}
}

export function Vector3Slider({ label, min, max, step, value, onChange }: { label: string, min: Vector3 | number, max: Vector3 | number, step?: Vector3 | number, value: Vector3, onChange: (value: Vector3) => void }) {
	step = typeof step === 'undefined' ? 1 : step;

	let vectorMin = typeof min === 'number' ? new Vector3(min, min, min) : min;
	let vectorMax = typeof max === 'number' ? new Vector3(max, max, max) : max;
	let vectorStep = typeof step === 'number' ? new Vector3(step, step, step) : step;

	return (<Form.Group>
		<Form.Label className='font-weight-bold mb-0'>{label}:</Form.Label>
		<Row>
			<Col xs={2}>X: {value.x}</Col>
			<Col className='pl-0'><Form.Control type="range" min={vectorMin.x} max={vectorMax.x} step={vectorStep.x} value={value.x + ''} onChange={handleChange('x')} style={sliderStyle} /></Col>
		</Row>
		<Row>
			<Col xs={2}>Y: {value.y}</Col>
			<Col className='pl-0'><Form.Control type="range" min={vectorMin.y} max={vectorMax.y} step={vectorStep.y} value={value.y + ''} onChange={handleChange('y')} style={sliderStyle} /></Col>
		</Row>
		<Row>
			<Col xs={2}>Z: {value.z}</Col>
			<Col className='pl-0'><Form.Control type="range" min={vectorMin.z} max={vectorMax.z} step={vectorStep.z} value={value.z + ''} onChange={handleChange('z')} style={sliderStyle} /></Col>
		</Row>
	</Form.Group>);

	function handleChange(part: 'x' | 'y' | 'z') {
		return (e: any) => {
			const newValue = parseFloat(e.target.value);
			if (onChange) {
				switch (part) {
					case 'x':
						onChange(new Vector3(newValue, value.y, value.z));
						break;
					case 'y':
						onChange(new Vector3(value.x, newValue, value.z));
						break;
					case 'z':
						onChange(new Vector3(value.x, value.y, newValue));
						break;
				}
			}
		}
	}
}

export function CheckboxInput(props: { label: string, value: boolean, onChange: (value: boolean) => void }) {
	
	return (
		<Form.Group>
			<Form.Check type='checkbox' label={props.label} checked={props.value} onChange={handleChange} />
		</Form.Group>
	);

	function handleChange(e: any) {
		props.onChange && props.onChange(e.target.checked);
	}
}