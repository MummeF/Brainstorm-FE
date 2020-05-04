import React from 'react';
import { Typography, TextField, Button } from "@material-ui/core";
import getFromBackend, { getJsonFromBackend } from '../tools/fetching';
import { RND_ROOM_ID } from '../tools/connections';
import { Redirect } from 'react-router-dom';



interface Room {
  id: number;
}

interface Props {

}
interface State {
  fetched: boolean;
  redirect: boolean;
  roomId: number | undefined;
}

class CreateRoom extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      fetched: false,
      roomId: undefined,
      redirect: false,
    };
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: "/room/" + this.state.roomId
      }}></Redirect>
    } else {
      return (
        <>
          <Typography variant="h3">Ein Meeting erstellen</Typography>
          <br></br>
          <Button variant="contained" color="primary"
            onClick={() =>
              getJsonFromBackend(RND_ROOM_ID)
                .then(data => {
                  console.log(data)
                  this.setState({ fetched: true, roomId: data.id })
                }
                )}>
            Raum erstellen
          </Button>
          {
            this.state.fetched ?
              <>
                <br />
                <br />
                <Typography>Deine Raum-ID: {this.state.roomId}</Typography>
                <Button variant="contained" color="primary" onClick={() => this.setState({ redirect: true })}>
                  Teilnehmen
                </Button>
              </>
              : <></>
          }
        </>
      );
    }
  }
}


export default CreateRoom;