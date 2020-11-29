import React from 'react';
import Dice from './Dice';
import SquareInfo from './SquareInfo'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import PlayerSetup from './PlayerSetup';
import '../App.css';

export const TicTacToeBoard = (props) => {

	// Triggers the rollDie move and passes the randomly generated number
	const rollDoneCallback = (num) => {
		props.moves.rollDie(num);
	}
	const colors = ['red', 'blue', 'black', 'green', 'purple', 'brown'];

	// Assigns the players icons colors to match the ones selected in the player setup
	const getPieces = (arrayOfPlayers) => {
		let tempArray = [];
		if (arrayOfPlayers !== []) {
			tempArray = arrayOfPlayers.map(player => {

				return <div style={{ color: colors[props.G.playerInfos[player].color] }}><DirectionsWalkIcon color={"inherit"} /></div>
			}
			)
		}
		return tempArray;
	}

	// Gets the class names depending on whether its the current player
	const getPlayerClass = (player) => {
		if (player.toString() === props.ctx.currentPlayer) {
			return "users active-player"
		} else {
			return "users"
		}
	}

	// This will create the player profiles that you see on the right of the screen
	const getPlayers = () => {
		let tempArray = [];
		for (let i = 0; i < props.G.numPlayers; i++) {
			tempArray.push(
				<>
					<div className={getPlayerClass(i)} style={{backgroundColor: colors[props.G.playerInfos[i].color]}}>
						<p style={{ backgroundColor: 'inherit', marginLeft: '10px',color: 'white' }}>{props.G.playerInfos[i].name}</p>
					</div>
				</>)
		}
		return tempArray;
	}

	return (
		<>
			{/* If the game hasn't started yet and players are still on the lobby screen */}
			{props.ctx.phase === "setup" ?
				<>
					<PlayerSetup matchID={props.matchID} playerInfos={props.G.playerInfos} playerID={props.playerID} moves={props.moves} maxPlayers={props.ctx.activePlayers} />
				</>
				:
				<>
					{/* If the game has started */}
					<div style={{ float: 'right', width: '200px' }}>
						{getPlayers()}
					</div>

					<h1>Drinking Game</h1>
					<table id="t01" border={1}>
						<tr>
							<td id="1" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[1])}</td>
							<td id="2" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[2])}</td>
							<td id="3" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[3])}</td>
							<td id="4" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[4])}</td>
							<td id="5" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[5])}</td>
							<td id="6" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[6])}</td>
							<td id="7" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[7])}</td>
							<td id="8" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[8])}</td>
							<td id="9" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[9])}</td>
							<td id="10" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[10])}</td>
						</tr>
						<tr>
							<td id="11" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[11])}</td>
							<td id="12" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[12])}</td>
							<td id="13" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[13])}</td>
							<td id="14" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[14])}</td>
							<td id="15" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[15])}</td>
							<td id="16" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[16])}</td>
							<td id="17" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[17])}</td>
							<td id="18" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[18])}</td>
							<td id="19" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[19])}</td>
							<td id="20" style={{ height: 100, width: 100 }}>{getPieces(props.G.cells[20])}</td>
						</tr>
					</table>
					<Dice rollDoneCallback={rollDoneCallback} />

					<SquareInfo newSquare={props.G.newSquare} cells={props.G.cells}/>

				</>
			}
		</>
	);
}
