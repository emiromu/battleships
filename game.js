function componentABSides(){

    document.querySelector('#sideA').innerHTML=`Player<br>`;
    document.querySelector('#sideB').innerHTML=`AI<br>`;

    for(let i=0;i<11;i++){

        sideArows[i]=document.createElement('div');
        sideArows[i].setAttribute('id',`sideArow${i}`);
        sideArows[i].classList.add('gridRow');   
        document.querySelector('#sideA').appendChild(sideArows[i]);

        sideBrows[i]=document.createElement('div');
        sideBrows[i].setAttribute('id',`sideBrow${i}`);
        sideBrows[i].classList.add('gridRow');   
        document.querySelector('#sideB').appendChild(sideBrows[i]);

        sideACells[i] = [];
        sideBCells[i] = [];

    for(let j=0;j<11;j++){
        if(i==0){
            if(j==0){
                //corner cell
                sideACells[i][j]=document.createElement('div');
                sideACells[i][j].setAttribute('id',`sideAcornerCell`);
                sideACells[i][j].classList.add('legendCell');
                sideACells[i][j].innerHTML=`y→<br>x↓`;
                sideArows[i].appendChild(sideACells[i][j]);
        
                sideBCells[i][j]=document.createElement('div');
                sideBCells[i][j].setAttribute('id',`sideBcornerCell`);
                sideBCells[i][j].classList.add('legendCell');
                sideBCells[i][j].innerHTML=`y→<br>x↓`;
                sideBrows[i].appendChild(sideBCells[i][j]);
            }else{
                sideACells[i][j]=document.createElement('div');
                sideACells[i][j].setAttribute('id',`sideAYCell${j-1}`);
                sideACells[i][j].classList.add('legendCell');
                sideACells[i][j].innerHTML=`${j-1}`
                sideArows[i].appendChild(sideACells[i][j]);
        
                sideBCells[i][j]=document.createElement('div');
                sideBCells[i][j].setAttribute('id',`sideBYCell${j-1}`);
                sideBCells[i][j].classList.add('legendCell');
                sideBCells[i][j].innerHTML=`${j-1}`
                sideBrows[i].appendChild(sideBCells[i][j]);
            }
        }
        else if(j==0){

            sideACells[i][j]=document.createElement('div');
            sideACells[i][j].setAttribute('id',`sideAXCell${i-1}`);
            sideACells[i][j].classList.add('legendCell');
            sideACells[i][j].innerHTML=`${i-1}`
            sideArows[i].appendChild(sideACells[i][j]);
    
            sideBCells[i][j]=document.createElement('div');
            sideBCells[i][j].setAttribute('id',`sideAXCell${i-1}`);
            sideBCells[i][j].classList.add('legendCell');
            sideBCells[i][j].innerHTML=`${i-1}`
            sideBrows[i].appendChild(sideBCells[i][j]);

        }else{
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
}
}
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

const startBtn = document.querySelector('#startGame');
let placeShipType='Carrier';
let placeShipLength=5;

componentABSides();

startBtn.addEventListener('click', function(e){

    while (document.querySelector('#sideA').firstChild) {
        document.querySelector('#sideA').removeChild(document.querySelector('#sideA').firstChild);
    }
    while (document.querySelector('#sideB').firstChild) {
        document.querySelector('#sideB').removeChild(document.querySelector('#sideB').firstChild);
    }
    componentABSides();
    gameboard.clear();
    renderGrids(gameboard);
    while(gameboard.fleetA.length<5){
        switch(placeShipType){
            case 'Carrier':placeShipLength=5
                break;
            case 'Battleship':placeShipLength=4
                break;
            case 'Cruiser':placeShipLength=3
                break;
            case 'Submarine':placeShipLength=3
                break;
            case 'Destroyer':placeShipLength=2
                break;
        }
        try{
            let xPrompt=prompt(`Enter X coordinate for ${placeShipType} (Length:${placeShipLength}) (0-9)`);
            if(xPrompt==null){
                placeShipType='Carrier';
                referee.innerHTML=`Start again by pressing "Start"`;
                return null;
            }
            while (!/^[0-9]+$/.test(xPrompt)) {
                alert("You did not enter a number between 0 and 9");
                xPrompt=prompt(`Enter X coordinate for ${placeShipType} (Length:${placeShipLength}) (0-9)`);
                if(xPrompt==null){
                    placeShipType='Carrier';
                    referee.innerHTML=`Start again by pressing "Start"`;
                    return null;
                }
            }

            let yPrompt=prompt(`Enter Y coordinate for ${placeShipType} (Length:${placeShipLength}) (0-9)`);
            if(yPrompt==null){
                placeShipType='Carrier';
                referee.innerHTML=`Start again by pressing "Start"`;
                return null;
            }
            while (!/^[0-9]+$/.test(yPrompt)) {
                alert("You did not enter a number between 0 and 9");
                yPrompt=prompt(`Enter Y coordinate for ${placeShipType} (Length:${placeShipLength}) (0-9)`);
                if(yPrompt==null){
                    placeShipType='Carrier';
                    referee.innerHTML=`Start again by pressing "Start"`;
                    return null;
                }
            }

            let orientationPrompt=prompt(`Enter orientation for ${placeShipType} (Length:${placeShipLength}) (x or y)`);
            if(orientationPrompt==null){
                placeShipType='Carrier';
                referee.innerHTML=`Start again by pressing "Start"`;;
                return null;
            }
            while (!(orientationPrompt=='x' || orientationPrompt=='y')) {
                alert("You did not enter x or y");
                orientationPrompt=prompt(`Enter orientation for ${placeShipType} (Length:${placeShipLength}) (x or y)`);
                if(orientationPrompt==null){
                    placeShipType='Carrier';
                    referee.innerHTML=`Start again by pressing "Start"`;;
                    return null;
                }
            }

            gameboard.addShip(placeShipType,
            {x:xPrompt,y:yPrompt},
            orientationPrompt,
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
            //legend offset
            randomCoord.x++;
            randomCoord.y++;

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
    for(let i=1; i<11; i++){
        for(let j=1; j<11; j++){
            sideBCells[i][j].addEventListener('click',function(e){
                //Player attack
                gameboard.attack({x:i-1,y:j-1},'B');
                renderGrids(gameboard);

                //AI Riposte
                playerB.playTurn(gameboard,'A')
                renderGrids(gameboard);

                //Check victory
                switch(gameboard.checkVictory()){
                    case 'undecided': referee.innerHTML='Fire at a target by clicking on a cell';
                        break;
                    case 'A': referee.innerHTML='Player Wins';
                    alert(`The Player Wins!`)
                        return;
                    case 'B': referee.innerHTML='AI Wins';
                    alert(`The AI Wins!`)
                        return;
                }
            });
        }
    }
});