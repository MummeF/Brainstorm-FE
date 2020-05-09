import { Typography } from '@material-ui/core';
import * as React from 'react';

export interface I404Props {

}

const Page404: React.FunctionComponent<I404Props> = (props: I404Props) => {

    return (
        <>
            <Typography variant="h3">Page not found :-(</Typography>
        </>
    );
}

export default Page404;