import React from 'react';
import { Button } from '@material-ui/core';
import MainGame from './Components/MainGame'
import { LobbyClient } from 'boardgame.io/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {

    const lobbyClient = new LobbyClient({ server: 'http://localhost:8000', });
    const createMatch = async () => {
        const { matchID } = await lobbyClient.createMatch("TicTacToe", {
            numPlayers: 6,
        })


        window.location.href = `/match/${matchID}`;
    }

    const listPlayers = async (matchID) => {
        const matches = await lobbyClient.getMatch('TicTacToe', matchID);
        console.log(matches)
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/match/:matchID"
                    render={(props) => {
                        const { matchID } = props.match.params;
                        return (
                            <>
                                <h1>LOBBY + {matchID}</h1>
                                <button onClick={() => listPlayers(matchID)}>listPlayers</button>
                                <MainGame {...{ matchID, lobbyClient }} />
                            </>
                        );
                    }}
                />
                <Route path="/"
                    render={(props) => {
                        return (

                            <div>
                                <h1>Select Number of Players</h1>
                                <Button variant="contained" onClick={() => createMatch()}>Create game</Button>
                                
                            </div>
                        );
                    }}>
                </Route>
            </Switch>
        </BrowserRouter>

    )
}

export default App;