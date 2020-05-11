import { Card, CardContent, Grid, makeStyles, Typography, useTheme, setRef, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React, { useState } from "react";
import MContribution from "../../model/contributionModel";
import { REM_CTRBT } from "../../tools/connections";
import { deleteAndGetJsonFromBackend } from "../../tools/fetching";
import EditModal from "./editModal";

interface Props {
    contribution: MContribution;
    roomId: number;
}

export default function Contribution(props: Props) {
    const theme = useTheme();
    const [mobileDialOpen, setMobileDialOpen] = useState(false);

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

    const deleteContribution = () => {
        deleteAndGetJsonFromBackend(REM_CTRBT + '?roomId=' + props.roomId + '&contributionId=' + props.contribution.id);
        setMobileDialOpen(false);
        // Erfolgreich? Ausgabe
    }

    const DeleteAndEditButtons = () => {
        if (isMobile.current) {
            if (mobileDialOpen) {
                return <Grid container direction="row">
                    <Grid item xs={6}>
                        <IconButton size="small"
                            onClick={handleEditOpen}
                            className={classes.editBtn}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton size="small"
                            onClick={deleteContribution}
                            className={classes.deleteBtn}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>;
            } else {
                return <IconButton onClick={() => setMobileDialOpen(true)} size="small">
                    <EditIcon />
                </IconButton>
            }

        } else {
            return <SpeedDial
                ariaLabel=""
                icon={<EditIcon />}
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
            </SpeedDial>
        }
    }

    return (<>
        <Card className={classes.root}>
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
        </Card>
        <EditModal open={editOpen} handleClose={handleEditClose} roomId={props.roomId} contribution={props.contribution}></EditModal>
    </>);
}