import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import SubPage from '../lib/components/SubPage';

export default function AboutPage() {
	return (
		<SubPage header='About'>
			<Row>
				<Col xs={12} lg={{offset: 4, span: 4}}>
					<ListGroup>
						<ListGroup.Item>
							<p>Inspired by and derived from <a href="https://github.com/SebLague" target="_blank" >Sebastian Lague</a>'s work on Procedural Planet Generation in Unity (<a href="https://github.com/SebLague/Procedural-Planets" target="_blank">GitHub</a> | <a href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0cONs3T0By4puYy6GM22ko8" target="_blank">YouTube</a>).</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
		</Row>
		</SubPage>);
}