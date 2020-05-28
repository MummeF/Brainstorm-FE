import { Card, CardContent, Grid, IconButton, makeStyles, setRef, Typography, useTheme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React, { useState } from "react";
import MContribution from "../../../model/contributionModel";
import { REM_CTRBT, VT_CTRBT_DN, VT_CTRBT_UP } from "../../../tools/connections";
import { addVotedContribution, checkIfContributionIsVoted } from "../../../tools/cookieService";
import getFromBackend, { deleteAndGetJsonFromBackend } from "../../../tools/fetching";
import CommentSection from "./comment/commentSection";
import EditModal from "./editModal";
import SubjectModal from "./subjectModal";
import VoteField from "./voteField";



interface Props {
    contribution: MContribution;
    roomId: number;
    roomState?: number;
    subjects?: string[];
}

export default function Contribution(props: Props) {
    const theme = useTheme();
    const [mobileDialOpen, setMobileDialOpen] = useState(false);


    const checkVoted = () => {
        return checkIfContributionIsVoted(props.roomId, props.contribution.id)
    }
    const [votedIndicator, setVotedIndicator] = useState(checkVoted());


    const isMobile = React.useRef(window.innerWidth < 480);
    React.useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    });


    const useStyles = makeStyles({
        root: {
            width: "100%",
            backgroundColor: theme.palette.grey[300],
        },
        text: {
            overflow: "auto",
        },
        deleteBtn: {
            color: theme.palette.error.main
        },
        editBtn: {
            color: theme.palette.success.main
        },

        commentPanel: {
            maxHeight: "10em",
            width: "100%",
        }

    });
    const classes = useStyles();


    const [dialOpen, setDialOpen] = React.useState(false);
    const handleOpen = () => {
        setDialOpen(true);
    };

    const handleClose = () => {
        setDialOpen(false);
    };

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setEditOpen(true);
        setMobileDialOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };
    const [subjectOpen, setSubjectOpen] = React.useState(false);

    const handleSubjectOpen = () => {
        setSubjectOpen(true);
        setMobileDialOpen(false);
    };

    const handleSubjectClose = () => {
        setSubjectOpen(false);
    };

    const deleteContribution = () => {
        deleteAndGetJsonFromBackend(REM_CTRBT + '?roomId=' + props.roomId + '&contributionId=' + props.contribution.id);
        setMobileDialOpen(false);
    }

    const DeleteAndEditButtons = () => {
        if (props.roomState !== 1) {
            return <></>;
        }
        if (isMobile.current) {
            if (mobileDialOpen) {
                return <Grid container direction="row">
                    <Grid item xs={4}>
                        <IconButton size="small"
                            onClick={handleSubjectOpen}
                            className={classes.editBtn}>
                            <PostAddIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton size="small"
                            onClick={handleEditOpen}
                            className={classes.editBtn}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton size="small"
                            onClick={deleteContribution}
                            className={classes.deleteBtn}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>

                </Grid>;
            } else {
                return <IconButton onClick={() => setMobileDialOpen(true)} size="small">
                    <MoreHorizIcon />
                </IconButton>
            }

        } else {
            return <SpeedDial
                ariaLabel=""
                icon={<MoreHorizIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={dialOpen}
                direction="left"
            >
                <SpeedDialAction
                    className={classes.deleteBtn}
                    key="Delete"
                    icon={<DeleteIcon />}
                    tooltipTitle="Delete"
                    onClick={deleteContribution}
                />
                <SpeedDialAction
                    className={classes.editBtn}
                    key="Edit"
                    icon={<EditIcon />}
                    tooltipTitle="Edit"
                    onClick={handleEditOpen}
                />
                <SpeedDialAction
                    className={classes.editBtn}
                    key="Add Subject"
                    icon={<PostAddIcon />}
                    tooltipTitle="Add Subject"
                    onClick={handleSubjectOpen}
                />
            </SpeedDial>
        }
    }

    const voteUp = () => {
        if (!checkVoted()) {
            getFromBackend(`${VT_CTRBT_UP}?roomId=${props.roomId}&contributionId=${props.contribution.id}`)
            addVotedContribution(props.roomId, props.contribution.id, true);
            setVotedIndicator(checkVoted());
        }
    }


    const voteDown = () => {
        if (!checkVoted()) {
            getFromBackend(`${VT_CTRBT_DN}?roomId=${props.roomId}&contributionId=${props.contribution.id}`)
            addVotedContribution(props.roomId, props.contribution.id, false);
            setVotedIndicator(checkVoted());
        }
    }

    return (<>
        <Card className={classes.root}>
            <Grid container
                direction="row">
                {props.roomState !== 0 ? <Grid item xs={1}>
                    <VoteField vote={props.contribution.reputation}
                        votedIndicator={votedIndicator}
                        hideArrow={props.roomState === 2}
                        onVoteDown={voteDown}
                        onVoteUp={voteUp} />
                </Grid> : <></>}

                <Grid item xs={props.roomState !== 0 ? 11 : 12}>
                    <CardContent>

                        <Grid direction="row"
                            container
                            justify="space-between"
                            alignItems="flex-start">
                            <Grid item xs={isMobile.current ? 9 : 11}><Typography className={classes.text} variant="body1">{props.contribution.content}</Typography></Grid>
                            {/* hier unter Umständen bearbeiten einfügen */}
                            <Grid item xs={isMobile.current ? mobileDialOpen ? 3 : 1 : 1}>
                                <DeleteAndEditButtons />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>


            </Grid>
            {props.roomState !== 0 ? <Grid direction="row"
                container
                justify="space-between"
                alignItems="flex-start">
                <Grid item xs={12}>
                    <CommentSection roomState={props.roomState!} roomId={props.roomId} contribution={props.contribution} />
                </Grid>
            </Grid> : <></>}


        </Card>
        <EditModal open={editOpen} handleClose={handleEditClose} roomId={props.roomId} contribution={props.contribution}></EditModal>
        <SubjectModal subjects={props.subjects ? props.subjects : []} open={subjectOpen} handleClose={handleSubjectClose} roomId={props.roomId} contribution={props.contribution} />
    </>);
}