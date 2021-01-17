import React, { useEffect } from 'react';
import Dice from '../Dice';
import SquareInfo from '../SquareInfo'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import PlayerSetup from '../PlayerSetup';
import Rules from '../Rules';
import '../../App.css';

export const PobololomolonoBoard = (props) => {

	const isCorrect = (e) => {
		console.log(props.G.pobo[props.G.currentLetter])
		console.log(props.G.pobo)
		console.log(e.key)
		if (e.key === props.G.pobo[props.G.currentLetter]) {
			console.log("we made it")
			props.moves.letterPressed();
			
		}
	}

	useEffect(() => {
		console.log("hi")
		document.removeEventListener('keypress', isCorrect);
		document.addEventListener('keypress', isCorrect);
	}, [])


	// const randomlyPlaceDiv = () => {
	// 	const randomTop = ;
	// 	const randomLeft = getRandomInt(50, window.innerWidth - 50);
	// 	return (

	// 	)
	// }

	// Gets the class names depending on whether its the current player
	const getPlayerClass = (player) => {
		if (player.toString() === props.ctx.currentPlayer) {
			return "users active-player"
		} else {
			return "users"
		}
	}

	const colors = ['red', 'blue', 'black', 'green', 'purple', 'brown'];

	// This will create the player profiles that you see on the right of the screen
	const getPlayers = () => {
		let tempArray = [];
		for (let i = 0; i < props.G.numPlayers; i++) {
			tempArray.push(
				<>
					<div className={getPlayerClass(i)} style={{ backgroundColor: colors[props.G.playerInfos[i].color] }}>
						<p style={{ backgroundColor: 'inherit', marginLeft: '10px', color: 'white', height: '5px' }}>{props.G.playerInfos[i].name}</p>
					</div>
				</>
			)
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

					<div className={'pobololomolono'} >
						<div style={{ float: 'right', width: '200px' }}>
							{getPlayers()}
						</div>
						<p className={'pobo-word'}>POBOLOLOMOLONO</p>
					</div>
				</>
			}
		</>
	);
}
