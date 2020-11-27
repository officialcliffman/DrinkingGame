import React, { useEffect, useState } from 'react';
import { FormGroup, Button, TextField, Select, MenuItem, Checkbox } from '@material-ui/core';

const PlayerSetup = ({ playerInfos, playerID, moves, activePlayers }) => {

    const [allReady, setAllReady] = useState(false);
    useEffect(() => {
        // If it's the first time we join that game, we tell the game. It's going to assign
        // us a default name and color.
        if (!playerInfos.hasOwnProperty(playerID)) {
            moves.join();
        }

        setAllReady(Object.values(playerInfos).every((info) => info.ready));
    }, [playerInfos, moves, playerID]);

    const createLobby = () => {
        let arrayForLobby = [];

        for (const [key, value] of Object.entries(activePlayers)) {
            arrayForLobby.push(
                <FormGroup row key={key}>
                    <Checkbox
                        checked={playerInfos[key] ? playerInfos[key].ready : false}
                        onChange={(e) => moves.setReady(e.target.checked)}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        disabled={key !== playerID}
                    />
                    <TextField value={playerInfos[key] ? playerInfos[key].name : ""} disabled={key !== playerID} onChange={(e) => moves.setName(e.target.value)} />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={playerInfos[key] ? playerInfos[key].color : ""}
                        onChange={(e) => moves.setColor(e.target.value)}
                        disabled={key !== playerID}
                    >
                        <MenuItem value={'0'}>Red</MenuItem>
                        <MenuItem value={'1'}>Blue</MenuItem>
                        <MenuItem value={'2'}>Black</MenuItem>
                        <MenuItem value={'3'}>Green</MenuItem>
                        <MenuItem value={'4'}>Purple</MenuItem>
                        <MenuItem value={'5'}>Brown</MenuItem>
                    </Select>
                    
                </FormGroup>)
        }
        return arrayForLobby;
    }


    return (
        <>
            {createLobby()}
            <Button onClick={() => moves.startGame()}>Start Game</Button>
        </>
    )
}

export default PlayerSetup;