import React from "react";
import { makeStyles, Card, CardContent, Typography, CardActions, Button, useTheme } from "@material-ui/core";

interface Props {
    content: string;
}

export default function Contribution(props: Props) {
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            width: "100%",
            overflow: "auto",
            backgroundColor: theme.palette.grey[300],
        }
    });
    const classes = useStyles();
    return (<>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body1">{props.content}</Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    </>);
}