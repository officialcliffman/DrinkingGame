import { TicTacToeBoard } from './Board';
import { TicTacToe } from './Game';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import React, { useEffect, useState } from 'react';

const MainGame = ({ matchID, lobbyClient }) => {
    const [playerInfo, setPlayerInfo] = useState({
        playerID: undefined,
        playerCredentials: undefined,
    })
    const [gameState, setGameState] = useState(<></>)
    console.log(matchID)
    console.log(lobbyClient)

    useEffect(async () => {
        setGameState(await getPlayers());
    }, []);

    const getPlayers = async () => {
        const DrinkingGameClient = Client({
            game: TicTacToe,
            board: TicTacToeBoard,
            numPlayers: 6,
            multiplayer: SocketIO({ server: 'localhost:8000' }),
        });
        const match = await lobbyClient.getMatch('TicTacToe', matchID);
        let playerID = null;
        let playerCredentials = null;
        playerID = window.localStorage.getItem(`playerID for matchID=${matchID}`);
        playerCredentials = window.localStorage.getItem(
            `playerCredentials for matchID=${matchID}`
        );
        console.log(playerID)
        if (playerID != null && playerCredentials != null) {
            setPlayerInfo({
                playerID,
                playerCredentials,
            });
        }else{

            playerID = "0";
            const thereIsRoom = match.players.some((player, i) => {
                playerID = i.toString();
                return !player.hasOwnProperty("name");
            });

            if (!thereIsRoom) {
                alert("This game is full!");
                return;
            } else {
                alert("There is room")
            }
            const resp = await lobbyClient.joinMatch("TicTacToe", matchID, {
                playerID,
                playerName: playerID,
            });
            playerCredentials = resp.playerCredentials.toString();
            setPlayerInfo({
                playerCredentials,
                playerID,
            });
            window.localStorage.setItem(`playerID for matchID=${matchID}`, playerID);
            window.localStorage.setItem(
                `playerCredentials for matchID=${matchID}`,
                playerCredentials
            );
        }
        console.log(matchID)
        return(
            <>
                {playerID === null ?
                    <div>Loading...</div>
                    :
                    <DrinkingGameClient playerID={playerID} matchID={matchID} credentials={playerCredentials}/>
                }
            </>
        )
    }

   


    // const { playerCredentials } = await lobbyClient.joinMatch(
    //     'TicTacToe',
    //     matchID,
    //     {
    //       playerID: '0',
    //       playerName: 'Jon',
    //     }
    //   );


    // const [dice, setDice] = useState(1);

    return (
        <>

            {gameState}
            {/* <DrinkingGameClient playerID="1" />        */}
        </>
    )
}



export default MainGame;
