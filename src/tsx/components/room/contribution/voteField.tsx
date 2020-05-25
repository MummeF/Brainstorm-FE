import { createStyles, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

export interface IVoteFieldProps {
    vote: number;
    onVoteUp(): void;
    onVoteDown(): void;
    hideArrow?: boolean;
    small?: boolean;
}



const VoteField: React.FunctionComponent<IVoteFieldProps> = (props: IVoteFieldProps) => {
    const styles = makeStyles((theme: Theme) =>
        createStyles({
            topItem: {
                marginBottom: props.small ? "-20%" : "",
            },
            bottomItem: {
                marginTop: props.small ? "-25%" : "",
            },
            root: {
                height: "100%",
            }

        })
    );
    const classes = styles();

    return (
        <>
            <Grid container className={classes.root} direction="column" justify="center" alignItems="center">

                <Grid className={classes.topItem} item>
                    {props.hideArrow ? <></> : <IconButton size="small" onClick={props.onVoteUp}>
                        <ExpandLessIcon />
                    </IconButton>}
                </Grid>
                <Grid item>
                    <Typography variant="body1">{props.vote}</Typography>
                </Grid>
                <Grid className={classes.bottomItem} item>
                    {props.hideArrow ? <></> : <IconButton size="small" onClick={props.onVoteDown}>
                        <ExpandMoreIcon />
                    </IconButton>}

                </Grid>
            </Grid>
        </>
    );
}

export default VoteField;