import React from 'react';
import { Typography, TextField, Button } from "@material-ui/core";
import getFromBackend, { getJsonFromBackend } from '../tools/fetching';
import { RND_ROOM_ID } from '../tools/connections';



interface Room {
  id: number;
}

interface Props {

}
interface State {
  fetched: boolean;
  id: number | undefined;
}

class CreateRoom extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      fetched: false,
      id: undefined,
    };
  }
  render() {


    return (
      <>
        <Typography variant="h3">Ein Meeting erstellen</Typography>
        <br></br>
        <Button variant="contained" color="primary"
          onClick={() =>
            getJsonFromBackend(RND_ROOM_ID)
              .then(data => {
                console.log(data)
                this.setState({ fetched: true, id: data.id })
              }
              )}>
          Raum erstellen
      </Button>
        {
          this.state.fetched ?
            <>
              <br />
              <br />
              <Typography>Deine Raum-ID: {this.state.id}</Typography>
              <Button variant="contained" color="primary" href="/room">
                Teilnehmen
        </Button>
            </>
            : <></>
        }

      </>
    );
  }
}


export default CreateRoom;