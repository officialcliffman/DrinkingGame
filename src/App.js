import './App.css';
import {TicTacToeBoard} from './Components/Board';
import { TicTacToe } from './Components/Game';
import { Client } from 'boardgame.io/react';

const DrinkingGameClient = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
});

const App = () => {
    // const [dice, setDice] = useState(1);
    
    return(    
        <>    
            <DrinkingGameClient />
            
        </>
    )
}



export default App;
