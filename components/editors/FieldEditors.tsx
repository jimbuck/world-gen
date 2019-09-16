import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Vector2, Vector3 } from 'three';

const sliderStyle = {
	height: '24px'
};

export function NumberSlider(props: { label: string, min: number, max: number, step: number, value: number, onChange: (value: number) => void }) {
	const isInt = Number.isInteger(props.min) && Number.isInteger(props.max) && Number.isInteger(props.step);

	return (
		<Form.Group>
			<Form.Label><strong>{props.label}:</strong> {props.value}</Form.Label>
			<Form.Control type="range" min={props.min} max={props.max} step={props.step} value={props.value + ''} onChange={handleChange} style={sliderStyle} />
		</Form.Group>
	);

	function handleChange(e: any) {
		const newValue = isInt ? parseInt(e.target.value, 10) : parseFloat(e.target.value);
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