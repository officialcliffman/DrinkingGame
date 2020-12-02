import React, { useState } from 'react';
import { Button, TextField, FormGroup, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MainGame from './Components/MainGame'
import { LobbyClient } from 'boardgame.io/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css"

//  For deployment
// const { protocol, hostname, port } = window.location;
// const server = `${protocol}//${hostname}:${port}`;
// For local
const server = "http://localhost:8000";
const App = () => {
    const [joinMatchID, setJoinMatchID] = useState("");
    const [showError, setShowError] = useState(false);
    /**
     * Create a lobby which is hosted on the server - for deployment
     */
    const lobbyClient = new LobbyClient({ server: server });
    // For local

    /**
     * Creates a match on the lobbyClient and returns a matchID
     */
    const createMatch = async () => {
        const { matchID } = await lobbyClient.createMatch("DrinkingGame", {
            numPlayers: 6,
        })
        // Changes URL to end with /match/matchID
        window.location.href = `/match/${matchID}`;
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const joinMatch = async () => {
        try {
            const match = await lobbyClient.getMatch('DrinkingGame', joinMatchID);
            window.location.href = `/match/${joinMatchID}`;
            setJoinMatchID("");
        } catch {
            setShowError(true)
        }
    };

    /**
     * Changes what's being displayed based on the URL
     */
    return (
        <div>
            <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error">Could not find a match with that ID.</Alert>
            </Snackbar>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/match/:matchID"
                        render={(props) => {
                            const { matchID } = props.match.params;
                            return (
                                <>
                                    <MainGame {...{ matchID, lobbyClient, server }} />
                                </>
                            );
                        }}
                    />
                    <Route path="/"
                        render={(props) => {
                            return (

                                <div className={"main-menu"}>
                                    <h1 className={"main-menu-header"}>Welcome to Drinking Game</h1>
                                    <Button className={"main-menu-button"} onClick={() => createMatch()}>Create game</Button>
                                    <h2 className={"main-menu-header"}>Or</h2>
                                    <div className={"join-game"}>
                                        <FormGroup row key={"join-game"}>
                                            <label className={"main-menu-header"} style={{fontSize: '24px'}}>Join Game: </label>
                                            <TextField
                                                value={joinMatchID}
                                                onChange={(e) => setJoinMatchID(e.target.value)}
                                            />
                                            <Button onClick={() => joinMatch()}>Join</Button>
                                        </FormGroup>
                                    </div>
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