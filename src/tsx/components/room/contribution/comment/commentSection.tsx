import { createStyles, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import MContribution from '../../../../model/contributionModel';
import AddComment from './addComment';
import CommentField from './commentField';

export interface ICommentSectionProps {
    contribution: MContribution;
    roomId: number;
    roomState: number;
}



const CommentSection: React.FunctionComponent<ICommentSectionProps> = (props: ICommentSectionProps) => {
    const styles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: "100%",
                borderTop: "1px solid #bababa",
                paddingLeft: "0.5em",
                paddingRight: "0.5em",
            },
            addBtn: {
                textAlign: "right",
                paddingRight: "0.5em",
            },
            comment: {
                width: "100%"
            },
            comments: {
                width: "95%",
                margin: "0.5em",
                overflow: "auto",
                maxHeight: props.roomState !== 2 ? "18em" : "",
            }

        })
    );
    const classes = styles();
    const [addOpen, setAddOpen] = React.useState(false);

    const handleAddOpen = () => {
        setAddOpen(true);
    }
    const handleAddClose = () => {
        setAddOpen(false);
    }

    return (
        <>
            <div className={classes.root}>
                <Grid container direction="column">
                    <Grid container item direction="row">
                        <Grid item xs={9}>
                            <Typography variant="body1" color="textPrimary">Kommentare ({props.contribution.comments?.length ?? 0})</Typography>
                        </Grid>
                        {props.roomState !== 2 ?
                            <Grid className={classes.addBtn} item xs={3}>
                                <IconButton onClick={handleAddOpen}  ><AddCommentIcon /></IconButton>
                            </Grid>
                            : <></>}

                    </Grid>
                    <Grid className={classes.comments} container item direction="row">
                        {
                            props.contribution.comments?.map(comment => (
                                <Grid item xs={12}>
                                    <CommentField roomState={props.roomState} comment={comment} roomId={props.roomId} contributionId={props.contribution.id} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>

            </div>
            <AddComment open={addOpen} handleClose={handleAddClose} roomId={props.roomId} contributionId={props.contribution.id}></AddComment>
        </>
    );
}

export default CommentSection;