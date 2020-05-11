import { Button, createStyles, Grid, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CRT_ROOM } from '../tools/connections';
import { getJsonFromBackend } from '../tools/fetching';
export interface ICreateRoomProps {

}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      margin: "auto",
      padding: "1em"
    }
  })
);
const CreateRoom: React.FunctionComponent<ICreateRoomProps> = (props: ICreateRoomProps) => {
  const [topic, setTopic] = useState("");
  const [roomId, setRoomId] = useState();
  const [redirect, setRedirect] = useState(false);

  const classes = styles();
  if (redirect) {
    return <Redirect to={"/room/" + roomId}></Redirect>
  }
  return (
    <>
      <Typography variant="h3">Raum erstellen</Typography>
      <br />
      <Paper className={classes.root} elevation={2}>
        <Grid
          container
          direction="column"
          spacing={1}>
          <Grid item>
            <Typography variant="h4">Thema</Typography>
            <Typography variant="body2">Lege ein Thema für Deinen Raum fest</Typography>
          </Grid>
          <Grid item>
            <TextField size="small" variant="outlined" label="Thema" value={topic} onChange={(e) => setTopic(e.target.value)}></TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => {
              getJsonFromBackend(CRT_ROOM + '?topic=' + topic)
                .then(res => {
                  setRoomId(res);
                  setRedirect(true);
                })
            }}>Erstellen und beitreten</Button>
          </Grid>
        </Grid>

      </Paper>
    </>
  );
}

export default CreateRoom;