// Game State
const players = ['O', 'X'];
const gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer;
let gameBoardElem;
let hacker;

function myF() {  
  const createButton = document.createElement('button')
  createButton.innerText = 'Clik_me'
  createButton.addEventListener('click', () => {
    hacker = true;
  });
  document.body.appendChild(createButton)
}


// Element creation
const createTitle = title => {
  const titleElem = document.createElement('h1');

  titleElem.textContent = title;
  titleElem.style.textAlign = 'center';
  titleElem.style.color = '#1d7f85';

  document.body.appendChild(titleElem);
};

const makeGameBoardElem = () => {
  const gameBoardElem = document.createElement('div');

  gameBoardElem.classList.add('game-board');

  return gameBoardElem;
};

const makeSquareElem = squareNumber => {
  const squareElement = document.createElement('div');
  squareElement.classList.add('game-square');

  squareElement.addEventListener(
    'click',
    event => {
      const { target } = event;
      target.textContent = currentPlayer;
      gameBoard[squareNumber] = currentPlayer;
      checkBoard();
      switchPlayer();
    },
    { once: true }
  );
  return squareElement;
};

// Game Control
const switchPlayer = () => {
  if (hacker !== true)
  {      
    if (currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0];
    }
  }
};

  const checkBoard = () => {
    // gameBoard
    // ['0', '1', '2']
    // ['3', '4', '5']
    // ['6', '7', '8']
    const winningStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let winState of winningStates) {
      const [position1, position2, position3] = winState;
      if (
        gameBoard[position1] !== '' &&
        gameBoard[position1] === gameBoard[position2] &&
        gameBoard[position1] === gameBoard[position3]
      ) {
        completeGame(`${gameBoard[position1]} player Wins!`);
      }
    }
    
    if (
      gameBoard[0] !== '' &&
      gameBoard[0] === gameBoard[1] 
    ) {
      myF();
    }


    const allSquaresUsed = gameBoard.every(square => square !== '');

    if (allSquaresUsed) {
      completeGame(`It's a draw!`);
    }
  };



  const completeGame = message => {
    const overlayElem = document.createElement('div');
    overlayElem.style.position = 'fixed';
    overlayElem.style.top = '0';
    overlayElem.style.left = '0';
    overlayElem.style.bottom = '0';
    overlayElem.style.right = '0';
    overlayElem.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlayElem.style.display = 'flex';
    overlayElem.style.flexDirection = 'column';
    overlayElem.style.justifyContent = 'center';
    overlayElem.style.alignItems = 'center';
    overlayElem.style.textAlign = 'center';

    const messageElem = document.createElement('h2');
    messageElem.textContent = message;
    messageElem.style.color = 'white';
    messageElem.style.fontSize = '100px';

    overlayElem.appendChild(messageElem);

    const restartButtonElem = document.createElement('button');
    restartButtonElem.textContent = 'Restart';
    restartButtonElem.style.fontSize = '50px';
    restartButtonElem.style.backgroundColor = 'transparent';
    restartButtonElem.style.color = 'white';
    restartButtonElem.style.border = '10px solid white';
    restartButtonElem.style.padding = '10px 30px';

    restartButtonElem.addEventListener('click', () => {
      resetGame();
      document.body.removeChild(overlayElem);
    });

    overlayElem.appendChild(restartButtonElem);

    document.body.appendChild(overlayElem);
  };

  // Initalisation
  const resetGame = () => {
    if (gameBoardElem) {
      // Old game board exists
      document.body.removeChild(gameBoardElem);
      hacker = false;
    }

    gameBoardElem = makeGameBoardElem();

    for (let row = 0; row < 9; row++) {
      gameBoardElem.appendChild(makeSquareElem(row));
    }

    currentPlayer = players[0];
    gameBoard.fill('');

    document.body.appendChild(gameBoardElem);
  };
  createTitle('Tic-tac-toe');
  resetGame();
