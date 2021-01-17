import React, { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css"
import Pobololomolono from './Components/Pobololomolono/Pobololomolono';
import BoardGame from './Components/DrinkingGame/BoardGame';

const App = () => {
    const [showError, setShowError] = useState(false);

    /**
     * Creates a match on the lobbyClient and returns a matchID
     */
    const pobololomolono = async () => {
        // Changes URL to end with pobololomolono
        window.location.href = `/pobololomolono`;
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const drinkingGame = async () => {
        // Changes URL to end with pobololomolono
        window.location.href = `/drinkinggame`;
    }

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
                        path="/pobololomolono"
                    >

                        <Pobololomolono />
                    </Route>

                    <Route
                        path="/drinkinggame"
                    >
                        <BoardGame />

                    </Route>
                    <Route path="/"
                        render={(props) => {
                            return (

                                <div className={"main-menu"}>
                                    <h1 className={"main-menu-header"}>Welcome Games Hub!</h1>

                                    <Button className={"main-menu-button"} onClick={() => drinkingGame()}>Drinking Game</Button>
                                    <br></br>
                                    <Button className={"main-menu-button"} onClick={() => pobololomolono()}>Pobololomolono</Button>

                                </div>
                            );
                        }}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div >
    )
}

export default App;