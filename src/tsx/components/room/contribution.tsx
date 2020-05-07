import { Card, CardContent, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React from "react";
import ContributionModel from "../../model/contributionModel";
import { REM_CTRBT } from "../../tools/connections";
import { deleteAndGetJsonFromBackend } from "../../tools/fetching";
import EditModal from "./editModal";

interface Props {
    contribution: ContributionModel;
    roomId: number;
}

export default function Contribution(props: Props) {
    const theme = useTheme();

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
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const deleteContribution = () => {
        deleteAndGetJsonFromBackend(REM_CTRBT + '?roomId=' + props.roomId + '&contributionId=' + props.contribution.id);
        // Erfolgreich? Ausgabe
    }
    return (<>
        <Card className={classes.root}>
            <CardContent>
                <Grid direction="row"
                    container
                    justify="space-between"
                    alignItems="flex-start">
                    <Grid item xs={11}><Typography className={classes.text} variant="body1">{props.contribution.content}</Typography></Grid>
                    {/* hier unter Umständen bearbeiten einfügen */}
                    <Grid item xs={1}>
                        {/* <IconButton className={classes.deleteBtn} onClick={deleteContribution} aria-label="delete picture" component="span">
                            <DeleteIcon />
                        </IconButton> */}
                        <SpeedDial
                            ariaLabel=""
                            icon={<EditIcon />}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            open={dialOpen}
                            direction={"left"}
                        >
                            <SpeedDialAction
                                className={classes.deleteBtn}
                                key={"Delete"}
                                icon={<DeleteIcon />}
                                tooltipTitle={"Delete"}
                                onClick={deleteContribution}
                            />
                            <SpeedDialAction
                                className={classes.editBtn}
                                key={"Edit"}
                                icon={<EditIcon />}
                                tooltipTitle={"Edit"}
                                onClick={handleEditOpen}
                            />
                        </SpeedDial>
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
        <EditModal open={editOpen} handleClose={handleEditClose} roomId={props.roomId} contribution={props.contribution}></EditModal>
    </>);
}