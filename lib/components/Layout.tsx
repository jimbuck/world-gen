import { ComponentPropsWithoutRef } from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import { isClient } from '../../common/services/helpers';
import GitHubCorner from './GitHubCorner';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

export default (props: {children: any[]}) => {
    const baseHref = (!isClient || window.location.href.includes('localhost')) ? '/' : '/world-gen';
    return <>
        <Head>
            <title>WorldGen - Jim Buck</title>
            <base href={baseHref} />
        </Head>
        <GitHubCorner />
        <Container fluid>
            {props.children}
        </Container>
    </>;
}