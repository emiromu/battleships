const gameboard = createGameboard();
let playerA = createPlayer('human','Human','A');
let playerB = createPlayer('computer','Computer','B');

    /**INIT DOM GRIDS */
const sideA = document.querySelector('#sideA');
const sideB = document.querySelector('#sideB');
const referee = document.querySelector('#referee');

let sideArows = [];
let sideBrows = [];
let sideACells = [];
let sideBCells = [];

for(let i=0;i<10;i++){
    sideArows[i]=document.createElement('div');
    sideArows[i].setAttribute('id',`sideArow${i}`);
    sideArows[i].classList.add('gridRow');   
    if(i==0)sideArows[i].classList.add('gridRowTop');  
    if(i==9)sideArows[i].classList.add('gridRowBottom');  
    document.querySelector('#sideA').appendChild(sideArows[i]);

    sideBrows[i]=document.createElement('div');
    sideBrows[i].setAttribute('id',`sideBrow${i}`);
    sideBrows[i].classList.add('gridRow');  
    if(i==0)sideBrows[i].classList.add('gridRowTop');  
    if(i==9)sideBrows[i].classList.add('gridRowBottom');  
    document.querySelector('#sideB').appendChild(sideBrows[i]);

    sideACells[i] = [];
    sideBCells[i] = [];
    for(let j=0;j<10;j++){
        sideACells[i][j]=document.createElement('div');
        sideACells[i][j].setAttribute('id',`sideACell${i}-${j}`);
        sideACells[i][j].classList.add('gridCell');
        sideArows[i].appendChild(sideACells[i][j]);

        sideBCells[i][j]=document.createElement('div');
        sideBCells[i][j].setAttribute('id',`sideBCell${i}-${j}`);
        sideBCells[i][j].classList.add('gridCell');
        sideBrows[i].appendChild(sideBCells[i][j]);
    }
}


const startBtn = document.querySelector('#startGame');
let placeShipType='Carrier';

startBtn.addEventListener('click', function(e){

    gameboard.clear();
    renderGrids(gameboard);
    while(gameboard.fleetA.length<5){
        try{
            gameboard.addShip(placeShipType,
            {x:prompt(`Enter X coordinate for ${placeShipType} (0-9)`),y:prompt(`Enter Y coordinate for ${placeShipType} (0-9)`)},
            prompt(`Enter orientation for ${placeShipType} (x or y)`),
            'A');
            renderGrids(gameboard);
            switch(placeShipType){
                case 'Carrier': placeShipType='Battleship';
                    break;
                case 'Battleship': placeShipType='Cruiser';
                    break;
                case 'Cruiser': placeShipType='Submarine';
                    break;
                case 'Submarine': placeShipType='Destroyer';
                    break;
                case 'Destroyer': placeShipType='Carrier';
                    break;
            }
        }
        catch(err){
            alert(err);
        }
    }
    referee.innerHTML='Placing AI Ships...';

    while(gameboard.fleetB.length<5){
        try{
            let placeOrientation='x';
            if(Math.random()<0.5){
                placeOrientation='x';
            }else{placeOrientation='y'}
            let randomCoord = playerB.randomCoordinates();

            gameboard.addShip(placeShipType,randomCoord,placeOrientation,'B');
            switch(placeShipType){
                case 'Carrier': placeShipType='Battleship';
                    break;
                case 'Battleship': placeShipType='Cruiser';
                    break;
                case 'Cruiser': placeShipType='Submarine';
                    break;
                case 'Submarine': placeShipType='Destroyer';
                    break;
                case 'Destroyer': placeShipType='Carrier';
                    break;
            }
        }
        catch(err){
        //console.log(err);
        }
    }
    renderGrids(gameboard);


    referee.innerHTML='Fire at a target by clicking on a cell';
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            sideBCells[i][j].addEventListener('click',function(e){
                //Player attack
                gameboard.attack({x:i,y:j},'B');
                renderGrids(gameboard);

                //AI Riposte
                playerB.playTurn(gameboard,'A')
                renderGrids(gameboard);

                //Check victory
                switch(gameboard.checkVictory()){
                    case 'undecided': referee.innerHTML='undecided';
                        break;
                    case 'A': referee.innerHTML='Player Wins';
                    alert(`Todo: wrap up game`)
                        break;
                    case 'B': referee.innerHTML='AI Wins';
                    alert(`Todo: wrap up game`)
                        break;
                }
            });
        }
    }


    //Main game loop
    /*
    while(gameboard.checkVictory=='undecided') //other states are A or B
    {
    }*/
});