import React from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'

const Dice = ({rollDoneCallback}) => {
    /**
     * The dice component
     */
    return (
      <div>
        <ReactDice
          numDice={1}
          rollDone={rollDoneCallback}
          outline={true}
          faceColor={"#ffffff"}
          dotColor={"#000000"}
          rollTime={0.5}
        />
      </div>
    )
  
}

export default Dice;
