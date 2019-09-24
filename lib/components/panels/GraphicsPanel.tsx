import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { SliderPicker } from 'react-color';
import Octicon, { Sync } from '@primer/octicons-react';

export default ({ autoUpdate, wireframes, resolution, rotate, handleFormChange }: {
		autoUpdate: boolean,
		wireframes: boolean,
		resolution: number,
		rotate: boolean,
		handleFormChange: (e: any) => void
}) => {

		return (
				<>
						<Form.Group>
								<Form.Check type='checkbox' label='Auto Update' checked={autoUpdate} onChange={handleFormChange} />
						</Form.Group>
						<Form.Group>
								<Form.Check type='checkbox' label='Wireframes' checked={wireframes} onChange={handleFormChange} />
						</Form.Group>
						<Form.Group>
								<Form.Label>Resolution: {resolution}</Form.Label>
								<Form.Control type="range" min={2} max={64} step={1} value={resolution+''} onChange={handleFormChange} />
						</Form.Group>
						<Form.Group>
								<Form.Check type='checkbox' label='Rotate' checked={rotate} onChange={handleFormChange} />
						</Form.Group>
				</>
		);
}