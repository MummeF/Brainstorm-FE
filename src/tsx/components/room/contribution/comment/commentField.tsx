import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography, createStyles, Grid } from '@material-ui/core';
import { MComment } from '../../../../model/contributionModel';
import VoteField from '../voteField';
import { getJsonFromBackend } from '../../../../tools/fetching';
import { VT_CMT_UP, VT_CMT_DN } from '../../../../tools/connections';

export interface ICommentProps {
    comment: MComment;
    roomState: number;
    roomId: number;
    contributionId: number;
}

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        commentText: {
            padding: "0.5em",
        }
    })
);

const CommentField: React.FunctionComponent<ICommentProps> = (props: ICommentProps) => {
    const classes = styles();
    const voteUp = () => {
        getJsonFromBackend(`${VT_CMT_UP}?roomId=${props.roomId}&contributionId=${props.contributionId}&commentId=${props.comment.id}`);
    }
    const voteDown = () => {
        getJsonFromBackend(`${VT_CMT_DN}?roomId=${props.roomId}&contributionId=${props.contributionId}&commentId=${props.comment.id}`);
    }

    return (
        <>
            <Grid className={classes.root} container direction="row">
                <Grid item xs={1}>
                    <VoteField hideArrow={props.roomState === 2} small vote={props.comment.reputation} onVoteDown={voteDown} onVoteUp={voteUp} />
                </Grid>
                <Grid item xs={11} className={classes.commentText}>
                    <Typography variant="body2">{props.comment.content}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default CommentField;