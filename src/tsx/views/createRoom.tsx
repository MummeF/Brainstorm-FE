import { Button, createStyles, FormControlLabel, Grid, Paper, Switch, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PasswordInput from '../components/common/passwordInput';
import { CRT_ROOM, SET_PWD, SET_MOD_PWD } from '../tools/connections';
import { getJsonFromBackend, postStringToBackend } from '../tools/fetching';
import { useCookies } from 'react-cookie';
import { v4 as generateRndModId } from 'uuid';


export interface ICreateRoomProps {

}


const CreateRoom: React.FunctionComponent<ICreateRoomProps> = (props: ICreateRoomProps) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [roomId, setRoomId] = useState();
  const [redirect, setRedirect] = useState(false);
  const [publicRoom, setPublicRoom] = useState(false);
  const [password, setPassword] = useState("");
  const [modPassword, setModPassword] = useState("");
  const [modPwRequired, setModPwRequired] = useState(false)

  const styles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "80%",
        margin: "auto",
        padding: "1em"
      },
    })
  );

  const [cookies, setCookie] = useCookies(['modId']);

  const setModId: Promise<boolean> = new Promise(async (resolve, reject) => {
    if (!cookies.modId) {
      const modId: string = generateRndModId();
      await setCookie('modId', modId, { sameSite: "strict", path: "/", secure: true })
      if (!cookies.modId) {
        return reject();
      }
    }
    return resolve(true);
  })


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
            <Typography variant="h4">Beschreibung</Typography>
            <Typography variant="body2">Beschreibe dein Thema mit kurzen Worten</Typography>
          </Grid>
          <Grid item>
            <TextField size="small" variant="outlined" label="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value)}></TextField>
          </Grid>
          <Grid item>
            <Typography variant="h4">Moderator Passwort</Typography>
            <Typography variant="body2">Setze ein Passwort, mit dem du die Moderatorrechte anfordern kannst, falls diese verloren gehen!</Typography>
          </Grid>
          <Grid item>
            <PasswordInput errorText={modPwRequired ? 'Passwort ist erforderlich!' : ''} onPasswordChange={(next) => setModPassword(next)} password={modPassword} />
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
                <Typography variant="h4">Raum Passwort</Typography>
                <Typography variant="body2">Setze ein Passwort für den Raum, damit nur deine Kollegen dem Raum beitreten können!</Typography>
              </Grid>
              <Grid item>
                <PasswordInput optional onPasswordChange={(next) => setPassword(next)} password={password} />
              </Grid>
            </> : <></>}
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={async () => {
              setModId
                .then(res => {
                  if (!modPassword) {
                    setModPwRequired(true);
                    return;
                  }
                  getJsonFromBackend(CRT_ROOM + '?topic=' + topic + '&isPublic=' + publicRoom + '&description=' + description + '&moderatorId=' + cookies.modId)
                    .then(res => {
                      setRoomId(res);
                      setRedirect(true);
                      return res;
                    })
                    .then(res => {
                      postStringToBackend(SET_MOD_PWD + '?roomId=' + res, modPassword)
                      return res;
                    })
                    .then(res => {
                      if (password) {
                        postStringToBackend(SET_PWD + '?roomId=' + res, password)
                      }
                      return res;
                    });
                });
            }}>Erstellen und beitreten</Button>
          </Grid>
        </Grid>

      </Paper>
    </>
  );
}

export default CreateRoom;