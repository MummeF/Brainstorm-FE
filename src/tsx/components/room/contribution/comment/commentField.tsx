import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography, createStyles, Grid, setRef } from '@material-ui/core';
import { MComment } from '../../../../model/contributionModel';
import VoteField from '../voteField';
import { getJsonFromBackend } from '../../../../tools/fetching';
import { VT_CMT_UP, VT_CMT_DN } from '../../../../tools/connections';
import { addVotedComment, checkIfCommentIsVoted } from '../../../../tools/cookieService';
import { useState } from 'react';

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
    const isMobile = React.useRef(window.innerWidth < 480);
    React.useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    });
    const classes = styles();
    const checkVoted = () => {
        return checkIfCommentIsVoted(props.roomId, props.contributionId, props.comment.id);
    }
    const [votedIndicator, setVotedIndicator] = useState(checkVoted());
    const voteUp = () => {
        if (!checkVoted()) {
            getJsonFromBackend(`${VT_CMT_UP}?roomId=${props.roomId}&contributionId=${props.contributionId}&commentId=${props.comment.id}`);
            addVotedComment(props.roomId, props.contributionId, props.comment.id, true);
            setVotedIndicator(checkVoted());
        }
    }
    const voteDown = () => {
        if (!checkVoted()) {
            getJsonFromBackend(`${VT_CMT_DN}?roomId=${props.roomId}&contributionId=${props.contributionId}&commentId=${props.comment.id}`);
            addVotedComment(props.roomId, props.contributionId, props.comment.id, false);
            setVotedIndicator(checkVoted());
        }
    }

    return (
        <>
            <Grid className={classes.root} container direction="row">
                <Grid item xs={props.roomState === 1 ? 1 : isMobile.current ? 3 : 2}>
                    <VoteField votedIndicator={votedIndicator} hideArrow={props.roomState === 2} small vote={props.comment.reputation} onVoteDown={voteDown} onVoteUp={voteUp} />
                </Grid>
                <Grid item xs={props.roomState === 1 ? 11 : isMobile.current ? 9 : 10} className={classes.commentText}>
                    <Typography variant="body2">{props.comment.content}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default CommentField;