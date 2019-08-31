import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const controls = {
    autoUpdateCheckbox: 'autoUpdateCheckbox',
    resolutionSlider: 'resolutionSlider',
    radiusSlider: 'radiusSlider',
}

export default () => {
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [resolution, setResolution] = useState(8);
    const [radius, setRadius] = useState(1);

    return (
        <Form>
            <Form.Group controlId={controls.autoUpdateCheckbox}>
                <Form.Label>Auto-Update: {autoUpdate}</Form.Label>
                <Form.Check type='checkbox' checked={autoUpdate} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group controlId={controls.radiusSlider}>
                <Form.Label>Radius: {radius}</Form.Label>
                <Form.Control type="range" min={1} max={16} step={0.25} value={radius+''} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group controlId={controls.resolutionSlider}>
                <Form.Label>Resolution: {resolution}</Form.Label>
                <Form.Control type="range" min={1} max={64} step={1} value={resolution+''} onChange={handleFormChange} />
            </Form.Group>
            {autoUpdate ? null : <Button block>Update</Button>}
        </Form>
    );

    function handleFormChange(e: any) {
        switch (e.target.id) {
            case controls.autoUpdateCheckbox:
                setAutoUpdate(e.target.checked);
                break;
            case controls.resolutionSlider:
                setResolution(parseInt(e.target.value, 10));
                break;
            case controls.radiusSlider:
                setRadius(parseFloat(e.target.value));
                break;
        }
    }
}
