import { Button, createStyles, FormControlLabel, Grid, Paper, Switch, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PasswordInput from '../components/common/passwordInput';
import { CRT_ROOM, SET_PWD } from '../tools/connections';
import { getJsonFromBackend, postStringToBackend } from '../tools/fetching';



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
  const [publicRoom, setPublicRoom] = useState(false);
  const [password, setPassword] = useState("");



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
            <FormControlLabel
              control={
                <Switch
                  checked={publicRoom}
                  onChange={() => setPublicRoom(!publicRoom)}
                  name="publicRoom"
                />}
              label="Öffentlicher Raum"
            />

            {publicRoom ? <>
              <Grid item>
                <PasswordInput onPasswordChange={(next) => setPassword(next)} password={password} />
              </Grid>
            </> : <></>}
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={() => {
              getJsonFromBackend(CRT_ROOM + '?topic=' + topic + '&isPublic=' + publicRoom + '&moderatorId=bla')
                .then(res => {
                  setRoomId(res);
                  setRedirect(true);
                  return res;
                })
                .then(res => {
                  if (password) {
                    postStringToBackend(SET_PWD + '?roomId=' + res, password)
                  }
                });
            }}>Erstellen und beitreten</Button>
          </Grid>
        </Grid>

      </Paper>
    </>
  );
}

export default CreateRoom;