import React from 'react';
import { Button } from '@material-ui/core';
import MainGame from './Components/MainGame'
import { LobbyClient } from 'boardgame.io/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {

    /**
     * Create a lobby which is hosted on the server
     */
    const lobbyClient = new LobbyClient({ server: 'http://localhost:8000', });

    /**
     * Creates a match on the lobbyClient and returns a matchID
     */
    const createMatch = async () => {
        const { matchID } = await lobbyClient.createMatch("TicTacToe", {
            numPlayers: 6,
        })
        // Changes URL to end with /match/matchID
        window.location.href = `/match/${matchID}`;
    }


    /**
     * Will be removed at some point but gets all players that are connected to the match
     */
    const listPlayers = async (matchID) => {
        const matches = await lobbyClient.getMatch('TicTacToe', matchID);
        console.log(matches)
    }

    /**
     * Changes what's being displayed based on the URL
     */
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