import { DrinkingGameBoard } from './Board';
import { DrinkingGame } from './Game';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import React, { useEffect, useState, useCallback } from 'react';

const MainGame = ({ matchID, lobbyClient, server }) => {
    /**
     * Creates a state to save the gameState
     */
    const [gameState, setGameState] = useState(<></>)

    /**
     * A function which gets the game state
     */
    const getPlayers = useCallback( async () => {

        // Creates the game client
        const DrinkingGameClient = Client({
            game: DrinkingGame,
            board: DrinkingGameBoard,
            numPlayers: 6,
            multiplayer: SocketIO({ server: server }),
        });

        // Gets the match that matches the ID and checks if the user has already joined this game, if they have assign playerID and playerCredentials
        const match = await lobbyClient.getMatch('DrinkingGame', matchID);
        let playerID = null;
        let playerCredentials = null;
        playerID = window.localStorage.getItem(`playerID for matchID=${matchID}`);
        playerCredentials = window.localStorage.getItem(
            `playerCredentials for matchID=${matchID}`
        );

        // If the user hasn't already joined this match, assign them a new unique playerID and playerCredentials
        if (playerID === null && playerCredentials === null) {
            playerID = "0";

            // Checks to see if the game is full
            const thereIsRoom = match.players.some((player, i) => {
                playerID = i.toString();
                return !player.hasOwnProperty("name");
            });
            if (!thereIsRoom) {
                alert("This game is full!");
                return;
            }

            // Join the game with the newly assigned playerID
            const resp = await lobbyClient.joinMatch("DrinkingGame", matchID, {
                playerID,
                playerName: playerID,
            });
            playerCredentials = resp.playerCredentials.toString();

            // Setting the users ID and credentials for this session
            window.localStorage.setItem(`playerID for matchID=${matchID}`, playerID);
            window.localStorage.setItem(
                `playerCredentials for matchID=${matchID}`,
                playerCredentials
            );
        }
        
        // Return the game client with the details which link the match and the player together
        return(
            <>
                {playerID === null ?
                    <div>Loading...</div>
                    :
                    <DrinkingGameClient playerID={playerID} matchID={matchID} credentials={playerCredentials}/>
                }
            </>
        )
    },[lobbyClient, matchID, server]);

    // On load, get the state of the match
    useEffect(() => {
        const getGameState = async () => {
            setGameState(await getPlayers());
        }
        getGameState();
    }, [getPlayers]);

    // Return the final game state
    return (
        <>
            {gameState}
        </>
    )
}



export default MainGame;
