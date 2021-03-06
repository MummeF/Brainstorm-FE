import { createStyles, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { VotedComment, VotedContribution } from '../../../tools/cookieService';

export interface IVoteFieldProps {
    vote: number;
    onVoteUp(): void;
    onVoteDown(): void;
    hideArrow?: boolean;
    small?: boolean;
    votedIndicator?: VotedComment | VotedContribution;
}

const VoteField: React.FunctionComponent<IVoteFieldProps> = (props: IVoteFieldProps) => {
    const styles = makeStyles((theme: Theme) =>
        createStyles({
            topItem: {
                marginBottom: props.small ? "-0.8em" : "",
            },
            bottomItem: {
                marginTop: props.small ? "-0.9em" : "",
            },
            root: {
                height: "100%",
            },
            positive: {
                color: theme.palette.success.main,
                fontSize: theme.typography.pxToRem(22)
            },
            negative: {
                color: theme.palette.error.main,
                fontSize: theme.typography.pxToRem(22)
            },
            neutral: {
                color: theme.palette.secondary.main
            },
            votedUp: {
                color: props.votedIndicator ? props.votedIndicator.votedUp ? theme.palette.success.main : "" : ""
            },
            votedDown: {
                color: props.votedIndicator ? (!props.votedIndicator.votedUp) ? theme.palette.error.main : "" : ""
            },
            icons: {
                textAlign: "left",
            },
            number: {
                textAlign: "left",
                width: "50%"
            }

        })
    );
    const classes = styles();

    return (
        <>
            <Grid container className={classes.root}
                spacing={props.hideArrow ? 1 : 0}
                direction={props.hideArrow ? "row" : "column"}
                justify={props.hideArrow ? "space-between" : "center"}
                alignItems="center">
                {props.hideArrow ?
                    <Grid item className={classes.icons}>
                        {
                            props.vote > 0 ? <ThumbUpIcon className={classes.positive} />
                                : props.vote === 0 ? <ThumbsUpDownIcon className={classes.neutral} />
                                    : <ThumbDownIcon className={classes.negative} />
                        }
                    </Grid>
                    : <Grid className={classes.topItem} item>
                        <IconButton className={classes.votedUp} size="small" onClick={props.onVoteUp}>
                            <ExpandLessIcon />
                        </IconButton>
                    </Grid>
                }

                <Grid item className={props.hideArrow ? classes.number : ""}>
                    <Typography variant="body1">{props.vote}</Typography>
                </Grid>
                {props.hideArrow ? <></> : <Grid className={classes.bottomItem} item>
                    <IconButton className={classes.votedDown} size="small" onClick={props.onVoteDown}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>}
            </Grid>
        </>
    );
}

export default VoteField;