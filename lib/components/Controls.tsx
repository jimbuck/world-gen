import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';

import LayerPanel from './panels/LayerPanel';
import InfoPanel from './panels/InfoPanel';

import { useStatePersisted } from '../../common/hooks/use-state-persisted';
import { PlanetEditorState } from '../hooks/use-planet-editor-state';
import GraphicsPanel from './panels/GraphicsPanel';

const tabClasses = 'border-left border-right border-bottom';
const tabStyles = {
	paddingTop: '10px',
	paddingLeft: '6px',
	paddingRight: '6px'
};

export default ({ planetState }: { planetState: PlanetEditorState }) => {
	const [tab, setTab] = useStatePersisted('world-gen:active-tab', 'planet-info-tab');

	return (
		<>
			<Row>
				<Col><h2>Controls</h2></Col>
			</Row>
			<Row>
				<Col>
					<Form autoComplete='off' data-lpignore="true">
						<Tabs id='control-tabs' activeKey={tab} onSelect={setTab} className='nav-fill' transition={false}>
							<Tab id='planet-info-tab' eventKey='planet-info-tab' title='Info' className={tabClasses} style={tabStyles} >
								<InfoPanel {...{ planetState }} />
							</Tab>
							<Tab id='layers-tab' eventKey='layers-tab' title='Layers' className={tabClasses} style={{ ...tabStyles, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
								<LayerPanel {...{ planetState }} />
							</Tab>
							<Tab id='graphics-tab' eventKey='graphics-tab' title='Graphics' className={tabClasses} style={tabStyles}>
								<GraphicsPanel {...{ planetState }} />
							</Tab>
						</Tabs>
					</Form>
				</Col>
			</Row>
		</>
	);
}
