import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

export default (props) => {
    return <>
        <Head>

        </Head>
        <Container fluid>
            {props.children}
        </Container>
    </>
}