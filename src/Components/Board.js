import React from 'react';
import Dice from './Dice';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
export const TicTacToeBoard = (props) => {

	const rollDoneCallback = (num) => {
		console.log('You rolled a ' + num)
		props.moves.rollDie(num);
      }

	const handleDiceRoll = () => {
		console.log(props.G)
		props.moves.rollDie();
    }
	//   const onClick = (id) => {
	//     this.props.moves.clickCell(id);
	//   }

	//   render() {
	//     let winner = '';
	//     if (this.props.ctx.gameover) {
	//       winner =
	//         this.props.ctx.gameover.winner !== undefined ? (
	//           <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
	//         ) : (
	//           <div id="winner">Draw!</div>
	//         );
	//     }

	

	const getPieces = (arrayOfPlayers) => {
		let tempArray = [];
		if(arrayOfPlayers !== []){
			tempArray = arrayOfPlayers.map(player => <div style={{color:player}}><DirectionsWalkIcon color={"inherit"}/></div>)
		}
		return tempArray;

	}

	return (
		<div>
			<h1>Drinking Game</h1>
			<table id="t01" border={1}>
				<tr>
					<td id="1" style={{height: 100, width: 100}}>{getPieces(props.G.cells[1])}</td>
					<td id="2" style={{height: 100, width: 100}}>{getPieces(props.G.cells[2])}</td>
					<td id="3" style={{height: 100, width: 100}}>{getPieces(props.G.cells[3])}</td>
					<td id="4" style={{height: 100, width: 100}}>{getPieces(props.G.cells[4])}</td>
					<td id="5" style={{height: 100, width: 100}}>{getPieces(props.G.cells[5])}</td>
					<td id="6" style={{height: 100, width: 100}}>{getPieces(props.G.cells[6])}</td>
					<td id="7" style={{height: 100, width: 100}}>{getPieces(props.G.cells[7])}</td>
					<td id="8" style={{height: 100, width: 100}}>{getPieces(props.G.cells[8])}</td>
					<td id="9" style={{height: 100, width: 100}}>{getPieces(props.G.cells[9])}</td>
					<td id="10" style={{height: 100, width: 100}}>{getPieces(props.G.cells[10])}</td>
				</tr>
				<tr>
					<td id="11" style={{height: 100, width: 100}}>{getPieces(props.G.cells[11])}</td>
					<td id="12" style={{height: 100, width: 100}}>{getPieces(props.G.cells[12])}</td>
					<td id="13" style={{height: 100, width: 100}}>{getPieces(props.G.cells[13])}</td>
					<td id="14" style={{height: 100, width: 100}}>{getPieces(props.G.cells[14])}</td>
					<td id="15" style={{height: 100, width: 100}}>{getPieces(props.G.cells[15])}</td>
					<td id="16" style={{height: 100, width: 100}}>{getPieces(props.G.cells[16])}</td>
					<td id="17" style={{height: 100, width: 100}}>{getPieces(props.G.cells[17])}</td>
					<td id="18" style={{height: 100, width: 100}}>{getPieces(props.G.cells[18])}</td>
					<td id="19" style={{height: 100, width: 100}}>{getPieces(props.G.cells[19])}</td>
					<td id="20" style={{height: 100, width: 100}}>{getPieces(props.G.cells[20])}</td>
				</tr>
			</table>
			{/* <p>{dice}</p> */}
			<Dice rollDoneCallback={rollDoneCallback}/>
		</div>
	);
}
