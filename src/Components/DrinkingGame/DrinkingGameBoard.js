import React, { useEffect } from 'react';
import Dice from '../Dice';
import SquareInfo from '../SquareInfo'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import PlayerSetup from '../PlayerSetup';
import Rules from '../Rules';
import '../../App.css';

export const DrinkingGameBoard = (props) => {

	// Checks to see if the current player is poisoned
	useEffect(() => {
		if (props.G.playerInfos[props.ctx.currentPlayer] !== undefined && props.G.playerInfos[props.ctx.currentPlayer].poison) {
			props.moves.rollDie(0);
		};
	}, [props.ctx.currentPlayer]);

	// Checks the rules for each square by action -- see Rules.js
	const handleSquareRule = () => {
		const playerPosition = props.G.playerPosition[props.ctx.currentPlayer];
		if (playerPosition !== undefined) {
			if (Rules[playerPosition].action === "doNothing") {
				props.moves.doNothing();
			} else if (Rules[playerPosition].action === "move") {
				props.moves.move(Rules[playerPosition].amount);
			} else if (Rules[playerPosition].action === "money") {
				props.moves.money(Rules[playerPosition].amount);
			} else if (Rules[playerPosition].action === "double") {
				props.moves.double();
			} else if (Rules[playerPosition].action === "poison") {
				props.moves.poison(Rules[playerPosition].amount);
			} else {
				props.moves.doNothing();
			}
		}
	}

	// Triggers the rollDie move and passes the randomly generated number
	const rollDoneCallback = (num) => {
		props.moves.rollDie(num);
	}
	const colors = ['red', 'blue', 'black', 'green', 'purple', 'brown'];

	// Assigns the players icons colors to match the ones selected in the player setup
	const getPieces = (arrayOfPlayers) => {
		let tempArray = [];
		if (arrayOfPlayers !== [] && arrayOfPlayers !== undefined) {
			tempArray = arrayOfPlayers.map(player => {

				return <div style={{ color: colors[props.G.playerInfos[player].color] }}><DirectionsWalkIcon color={"inherit"} /></div>
			}
			)
		}
		return tempArray;
	}

	// Handles the users choice on continuing at a checkpoint
	const handleContinueClick = (cont, square) => {
		props.moves.checkpointReached(cont, square);
	}

	// Handle the users choice on the poison squares
	const handlePoisonButton = () => {
			props.moves.endPoison()


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
					<div className={getPlayerClass(i)} style={{ backgroundColor: colors[props.G.playerInfos[i].color] }}>
						<p style={{ backgroundColor: 'inherit', marginLeft: '10px', color: 'white', height: '5px' }}>{props.G.playerInfos[i].name}</p>
						<p style={{ backgroundColor: 'inherit', marginLeft: '10px', color: 'white', height: '5px' }}>${props.G.playerInfos[i].money}</p>
					</div>
				</>)
		}
		return tempArray;
	}

	// Build Board
	let numSquare = 55;
	const getRow = (i) => {
		let tempArray = [];
		if (i % 2 === 0) {
			numSquare -= 7;
			for (let j = 0; j < 8; j++) {
				tempArray.push(<td id={numSquare} style={{ height: 100, width: 100, backgroundColor: Rules[numSquare].color }}>{getPieces(props.G.cells[numSquare])}</td>)
				numSquare++;
			}
			numSquare -= 9;
		} else {
			for (let j = 0; j < 8; j++) {
				tempArray.push(<td id={numSquare} style={{ height: 100, width: 100, backgroundColor: Rules[numSquare].color }}>{getPieces(props.G.cells[numSquare])}</td>)
				numSquare--;
			}
		}
		return tempArray;
	}

	const getBoard = () => {
		let tempArray = [];
		for (let i = 0; i < 7; i++) {
			tempArray.push(<tr>
				{getRow(i)}
			</tr>);
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
						{getBoard()}
					</table>
					<Dice rollDoneCallback={rollDoneCallback} />

					<SquareInfo
						newSquare={props.G.newSquare}
						playerPosition={props.G.playerPosition}
						handleContinueClick={handleContinueClick}
						handleSquareRule={handleSquareRule}
						currentPlayer={props.ctx.currentPlayer}
						closeAllModal={props.G.closeAllModal}
						playerID={props.playerID}
						playerMoney={props.G.playerInfos[props.ctx.currentPlayer].money}
						playerCheckpoint={props.G.playerInfos[props.ctx.currentPlayer].checkpoint}
						poison={props.G.playerInfos[props.ctx.currentPlayer].poison}
						handlePoisonButton={handlePoisonButton}
					/>

				</>
			}
		</>
	);
}
