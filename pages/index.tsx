import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import NextLink from 'next/link';

import Layout from '../lib/components/Layout';

export default function IndexPage() {
    
    return (
        <Layout>
            <Row className='text-center'>
                <Col>
                    <h1 className='display-2'>W<span style={{fontSize: '0.5em', verticalAlign: 'middle'}}>🌎</span>rldGen</h1>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col xs={12} lg={{span: 4, offset: 4}}>
                <ListGroup>
                    <ListGroupMenuItem label="Planet Editor" href="/planet-editor" />
                    <ListGroupMenuItem label="Planet Generator" href="/planet-gen" />
                    <ListGroupMenuItem label="Settings" href="/settings" />
                    <ListGroupMenuItem label="About" href="/about" />
                </ListGroup>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col>
                    <p>An experiment by <a href="https://jimbuck.io">Jim Buck</a>.</p>
                </Col>
            </Row>
        </Layout>);

    function ListGroupMenuItem({label, href}: {label: string, href: string}) {
        return <NextLink href={href} passHref>
            <ListGroup.Item action className='text-center'>{label}</ListGroup.Item>
        </NextLink>
    }
}