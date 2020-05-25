import MRoom from "../../../model/roomModel";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { Paper, makeStyles, Grid, Typography, setRef, IconButton, Button, TextField } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import ReactToPrint from 'react-to-print';
import ShareIcon from '@material-ui/icons/Share';
import CheckIcon from '@material-ui/icons/Check';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Printable from "../../common/printable";
import Contribution from "../contribution/contribution";
import PrintIcon from '@material-ui/icons/Print';

interface Props {
    room: MRoom;
}

export default function ResultPaper(props: Props) {
    const isMobile = useRef(window.innerWidth < 480);
    useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    })


    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "80%",
            minHeight: "10em",
            padding: "0.5em",
        },
        contribution: {
            width: "100%",
        },
        share: {
            paddingRight: "1em",
            textAlign: "right",
            width: "100%",
        },
        linkInput: {
            direction: "rtl",
        },
        stateField: {
            textAlign: "right",
            width: "100%"
        }
    });
    const classes = useStyles();



    const [share, setShare] = useState(false);
    const [copied, setCopied] = useState(false);

    let prevSubject: string = "";
    const contributions: JSX.Element[] = props.room.contributions?.sort((a, b) => {
        if (!a.subject) {
            return 1;
        }
        if (!b.subject) {
            return 0;
        }
        return (a.subject).toLowerCase().localeCompare((b.subject).toLowerCase());
    })
        .map(cont => {
            let Subject = () => { return <></> };
            if (prevSubject !== cont.subject) {
                prevSubject = cont.subject;
                Subject = () => {
                    return <Grid item xs={12}>
                        <Typography variant="h4">{cont.subject ? cont.subject : "Kein Titel zugeordnet"}</Typography>
                    </Grid>
                }
            }
            return <>
                <Subject />
                <Grid item key={cont.id} xs={isMobile.current ? 12 : 6}>
                    <Contribution roomState={2} roomId={props.room.id} contribution={cont}></Contribution>
                </Grid>
            </>
        }
        );

    const Container = () => {
        return <>
            <Paper elevation={1} className={classes.root} >
                <br />
                <Grid container direction="row" spacing={2}>
                    {contributions}
                </Grid>
            </Paper>
        </>;
    }



    const ShareButton = () => {
        if (isMobile.current) {
            return <IconButton aria-label="shareIcon" onClick={() => setShare(true)}><ShareIcon /></IconButton>
        } else {
            return <Button startIcon={<ShareIcon />} variant="text" color="secondary" onClick={() => setShare(true)}>Share Link</Button>
        }
    }

    const CopyButton = () => {
        if (copied) {
            return <Button startIcon={<CheckIcon />} variant="text" color="secondary">Copied</Button>;
        } else {
            return <CopyToClipboard text={window.location.href} onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setShare(false);
                }, 2000);
            }}>
                <Button variant="text" color="secondary" startIcon={<FileCopyIcon />}>Copy Link</Button>
            </CopyToClipboard>
        }
    }
    const CopyField = () => {
        return <>
            {isMobile.current ? <></> : <TextField className={classes.linkInput} size="small" variant="outlined" disabled value={window.location.href}></TextField>}
            <CopyButton />
        </>
    }

    const PrintButton = () => {
        if (isMobile.current) {
            return <IconButton aria-label="printbutton"><PrintIcon /></IconButton>
        }
        return <Button startIcon={<PrintIcon />} variant="text" color="secondary" >Print</Button>
    }

    const printRef: MutableRefObject<undefined | Printable> = useRef();

    return <>
        <Grid container direction="row">
            <Grid item xs={8}>
                <Typography variant="h3">Brainstorm beendet: {props.room.topic ? props.room.topic : ('Raum ' + props.room.id)}</Typography>
            </Grid>
            <Grid className={classes.share} item xs={3}>
                {share ? <CopyField /> : <ShareButton />}
            </Grid>
            <Grid className={classes.share} item xs={1}>
                <ReactToPrint
                    trigger={PrintButton}
                    content={() => printRef.current!}
                />
            </Grid>
        </Grid>
        <Grid container direction="row">
            <Grid item>
                <Typography variant="body1">{props.room.description}</Typography>
            </Grid>
        </Grid>
        <Printable ref={(ref) => setRef(printRef, ref)}>
            <Container />
        </Printable>
    </>
}