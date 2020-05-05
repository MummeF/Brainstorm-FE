import React from "react";
import { Modal, useTheme, makeStyles, Grid, Paper, AppBar, Toolbar, Button, Typography, Icon } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
interface Props {
    open: boolean;
    handleClose(): void;
    body?: JSX.Element;
    title?: string;
    classes: any;
}
interface State {

}

class StyledModalRawCopy extends React.Component<Props> {
    render() {
        const body = this.props.body;
        const classes = this.props.classes;

        return (
            <>
                <Modal
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <>
                        <Grid item
                            zeroMinWidth
                            container
                            direction="column"
                            alignItems="flex-start"
                            justify="flex-start"
                            component={Paper}
                            className={classes.modal}>
                            <Grid item className={classes.header}>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Grid container
                                            direction="row"
                                            alignItems="center"
                                            justify="space-between">
                                            <Grid item><Typography variant="h3">{this.props.title}</Typography></Grid>
                                            <Grid item>
                                                <Button
                                                    
                                                    color="primary"
                                                    variant="text"
                                                    onClick={this.props.handleClose}
                                                    endIcon={<CloseIcon />}></Button>
                                            </Grid>
                                        </Grid>
                                    </Toolbar>
                                </AppBar>
                            </Grid>
                            <Grid item className={classes.body}>
                                {body ? body : <></>}
                                <Grid item>
                                                
                                    </Grid>
                                    <br></br>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={this.props.handleClose}
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                    >
                                        Speichern
                                    </Button>
                            </Grid>
                        </Grid>
                    </>
                </Modal>
            </>);
    }
}
interface RawProps {
    open: boolean;
    body?: JSX.Element;
    title?: string;
    handleClose(): void;
}
export const StyledModalCopy = (props: RawProps) => {
    const theme = useTheme();

    const useStyles = makeStyles({
        header: {
            width: "100%",
        },
        closeBtn: {
            marginRight: theme.spacing(2)
        },
        body: {
            width: "100%",
            margin: "0.5em",
            overflow: "auto"
        },
        modal: {
            width: "80%",
            position: "relative",
            height: "80%",
            top: "10%",
            margin: "auto",
        }
    });
    const classes = useStyles();

    return <StyledModalRawCopy
        title={props.title}
        open={props.open} body={props.body}
        handleClose={props.handleClose}
        classes={classes}
    ></StyledModalRawCopy>
}