import React from 'react';
import { Button } from '@material-ui/core';
import MainGame from './Components/MainGame'
import { LobbyClient } from 'boardgame.io/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css"

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
     * Changes what's being displayed based on the URL
     */
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/match/:matchID"
                        render={(props) => {
                            const { matchID } = props.match.params;
                            return (
                                <>
                                    <MainGame {...{ matchID, lobbyClient }} />
                                </>
                            );
                        }}
                    />
                    <Route path="/"
                        render={(props) => {
                            return (

                                <div className={"main-menu"}>
                                    <h1 className={"main-menu-header"}>Welcome to Drinking Game</h1>
                                    <Button className={"main-menu-button"} variant="contained" onClick={() => createMatch()}>Create game</Button>

                                </div>
                            );
                        }}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;