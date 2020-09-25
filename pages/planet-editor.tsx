import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SubPage from '../lib/components/SubPage';
import Controls from '../lib/components/Controls';
import { usePlanetEditorState } from '../lib/hooks/use-planet-editor-state';
import SceneDisplay from '../lib/components/SceneDisplay';
import PlanetEditorSceneManager from '../lib/scenes/planet-editor-scene';

const sceneManager = new PlanetEditorSceneManager();

export default function PlanetEditor () {
	const planetState = usePlanetEditorState(sceneManager.planet);

	return (
		<SubPage header='Planet Editor'>
			<Row style={{ height: '' }}>
				<Col lg={6} xs={12} className="display">
					<SceneDisplay sceneManager={sceneManager} />
				</Col>
				<Col lg={6} xs={12} className="controls">
					<Controls {...{ planetState }}  />
				</Col>
			</Row>
		</SubPage>);
}