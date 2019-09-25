import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import GitHubCorner from './GitHubCorner';

import 'bootstrap/dist/css/bootstrap.min.css';

export default (props: {children: any[]}) => {
    return <>
        <Head>
            <title>WorldGen - Jim Buck</title>
        </Head>
        <GitHubCorner />
        <Container fluid>
            {props.children}
        </Container>
    </>
}