function createShip(type, position, orientation) {
    /**TYPES
    1	Carrier	5
    2	Battleship	4
    3	Cruiser	3
    4	Submarine	3
    5	Destroyer	2

    position is the coordinates (x,y) of the first block
    orientation is either horizontal (x) or vertical (y), and only goes (left to right, up to down)
    assume a 10x10 grid, (0,0) in the top left corner, gridA and gridB for the two players
    */

    let length = 0;
    //bocks is an array representing each part of the ship
    //each element (or 'ship block') is an object made of coordinates (x,y) and a isHit boolean
    let blocks = [];
    //Todo, functions to check ship integrity (check blocks) and updated isSunk
    let isSunk = false;

    switch(type){
        case 'Carrier': length = 5; 
            break;
        case 'Battleship': length = 4;
            break;
        case 'Cruiser': length = 3;
            break;
        case 'Submarine': length = 3;
            break;
        case 'Destroyer': length = 2;
            break;
    };

    for(let i=0; i<length; i++){
        /**position + orientation validity test */
        if(orientation == 'x' && (parseInt(position.x) + parseInt(i) >10)){
            //x overflow
            throw new Error('Ship out of x-bounds');
            return;
        }
        if(orientation == 'y' && (parseInt(position.y) + parseInt(i) >10)){
            //y overflow
            //throw 'Ship out of y-bounds';
            throw new Error('Ship out of y-bounds');
            return;
        }
        if(orientation =='x'){
            blocks[i]={x: parseInt(position.x)+parseInt(i), y:parseInt(position.y), isHit: false, parentLength: length, parentOrientation: orientation}
        }
        else if(orientation == 'y'){
            blocks[i]={x: parseInt(position.x), y:parseInt(position.y)+parseInt(i), isHit: false, parentLength: length, parentOrientation: orientation}
        }
        
    };

    function hitBlock(coordinates){
        for(let i=0;i<this.length;i++){
            if(this.blocks[i].x == coordinates.x && this.blocks[i].y == coordinates.y){
                if(this.blocks[i].isHit == false)
                {
                    this.blocks[i].isHit = true;
                    checkSunk();
                    return true;
                }
                else
                {
                    throw new Error('Block already hit')
                }
            }
        }
        throw new Error('Block of given coordinates not found');
    };

    function checkSunk(){
        for(let i=0; i<this.length; i++){
            if(this.blocks[i].isHit==false)
            {
                return false;
            }
        }
        this.isSunk = true;
        return true;
    };

    return {type, length, blocks, isSunk, hitBlock, checkSunk};
    };

function createGameboard(){

        //two 10x10 grids
        //Grid cell statuses: clear, occupied, miss, hit
        let gridA=[];
        let gridB=[];
        for(let i=0; i<10; i++){
            gridA[i]=[];
            gridB[i]=[];
            for(let j=0; j<10; j++){
                gridA[i][j]={x:i,y:j,status:'clear'};
                gridB[i][j]={x:i,y:j,status:'clear'};
            }
        }

        let fleetA=[];
        let fleetB=[];

        function clear(){
            this.fleetB=[];
            for(let i=0;i<5;i++){
                this.fleetA.pop();
                this.fleetA.pop();
            }

            for(let i=0; i<10; i++){
                for(let j=0; j<10; j++){
                    this.gridA[i][j].status='clear';
                    this.gridB[i][j].status='clear';
                }
            }
            return true;
        }

        function checkAvailableSpace(type,position,orientation,grid){
            let shipLength=0;
            switch(type){
                case 'Carrier':shipLength=5;
                    break;
                case 'Battleship':shipLength=4;
                    break;
                case 'Cruiser':shipLength=3;
                    break;
                case 'Submarine':shipLength=3;
                    break;
                case 'Destroyer':shipLength=2;
                    break;
            }
            if(grid=='A' && orientation=='x'){
                for(let i=0;i<shipLength;i++){
                    if(this.gridA[parseInt(position.x)+i][parseInt(position.y)].status != 'clear'){
                        return false;
                    }
                }
            }
            else if(grid=='A' && orientation=='y'){
                for(let i=0;i<shipLength;i++){
                    if(this.gridA[parseInt(position.x)][parseInt(position.y)+i].status != 'clear'){
                        return false;
                    }
                }
            }
            else if(grid=='B' && orientation=='x'){
                for(let i=0;i<shipLength;i++){
                    if(this.gridB[parseInt(position.x)+i][parseInt(position.y)].status != 'clear'){
                        return false;
                    }
                }
            }
            else if(grid=='B' && orientation=='y'){
                for(let i=0;i<shipLength;i++){
                    if(this.gridB[parseInt(position.x)][parseInt(position.y)+i].status != 'clear'){
                        return false;
                    }
                }
            }
            return true;
        };

        function sunkShipGrid(){
            //fleetA
            for(let i=0; i<this.fleetA.length; i++){
                if(this.fleetA[i].isSunk){
                    for(let j=0; j<this.fleetA[i].blocks.length;j++){
                        this.gridA[this.fleetA[i].blocks[j].x][this.fleetA[i].blocks[j].y].status='sunk';
                    }
                }
            }
            //fleetB
            for(let i=0; i<this.fleetB.length; i++){
                if(this.fleetB[i].isSunk){
                    for(let j=0; j<this.fleetB[i].blocks.length;j++){
                        this.gridB[this.fleetB[i].blocks[j].x][this.fleetB[i].blocks[j].y].status='sunk';
                    }
                }
            }

        return true;
        };

        function addShip(type,position,orientation,grid){

            if(this.checkAvailableSpace(type,position,orientation,grid)==false){
                throw new Error('Position already occupied');
            }
            if(grid=='A'){
                this.fleetA.push(createShip(type,position,orientation));
                //scan through the last ship pushed and update the grid status
                for(let i=0;i<this.fleetA[this.fleetA.length -1].blocks.length;i++){
                    this.gridA[this.fleetA[this.fleetA.length -1].blocks[i].x][this.fleetA[this.fleetA.length -1].blocks[i].y]
                    .status='occupied';
                }
            }
            else if(grid=='B'){
                this.fleetB.push(createShip(type,position,orientation));
                //scan through the last ship pushed and update the grid status
                for(let i=0;i<this.fleetB[this.fleetB.length -1].blocks.length;i++){
                    this.gridB[this.fleetB[this.fleetB.length -1].blocks[i].x][this.fleetB[this.fleetB.length -1].blocks[i].y]
                    .status='occupied';
                }
            }
        };

        function attack(position,grid){
            if(position.x<0 || position.x>9 || position.y<0 || position.y>9 ){
                throw new Error('Out of bounds');
            }
            if(grid=='A'){
                switch(this.gridA[position.x][position.y].status){
                    case 'occupied':
                        for(let i=0; i<this.fleetA.length; i++){
                            for(let j=0; j<this.fleetA[i].blocks.length; j++){
                                if(this.fleetA[i].blocks[j].x == position.x && this.fleetA[i].blocks[j].y == position.y){
                                    this.fleetA[i].hitBlock(position);
                                    this.gridA[position.x][position.y].status='hit';
                                    if(this.fleetA[i].checkSunk()){
                                        //alert(`You have sunk my ${this.fleetA[i].type}!`)
                                        this.sunkShipGrid();
                                    }
                                }
                            }
                        }
                        break;
                    case 'clear':
                        this.gridA[position.x][position.y].status='miss';
                        break;
                    case 'hit':
                        throw new Error('Duplicate attack on coordinates');
                    case 'miss':
                        throw new Error('Duplicate attack on coordinates');
                    case 'sunk':
                        throw new Error('Duplicate attack on coordinates');
                }
            }
            else if(grid=='B'){
                switch(this.gridB[position.x][position.y].status){
                    case 'occupied':
                        for(let i=0; i<this.fleetB.length; i++){
                            for(let j=0; j<this.fleetB[i].blocks.length; j++){
                                if(this.fleetB[i].blocks[j].x == position.x && this.fleetB[i].blocks[j].y == position.y){
                                    this.fleetB[i].hitBlock(position);
                                    this.gridB[position.x][position.y].status='hit';
                                    if(this.fleetB[i].checkSunk()){
                                        //alert(`You have sunk my ${this.fleetB[i].type}!`)
                                        this.sunkShipGrid();
                                    }
                                }
                            }
                        }
                        break;
                    case 'clear':
                        this.gridB[position.x][position.y].status='miss';
                        break;
                    case 'hit':
                        throw new Error('Duplicate attack on coordinates');
                    case 'miss':
                        throw new Error('Duplicate attack on coordinates');
                    case 'sunk':
                        throw new Error('Duplicate attack on coordinates');
                }

            }
        };

        function checkVictory(){
            //return undecided, A, or B
            if(this.fleetA.length != this.fleetB.length){
                throw new Error(`Fleets don't have the same number of ships`);
            }

            //Status=0 : all ships sunk, status=1 : at least one ship not sunk
            let statusA = 0;
            let statusB = 0;
            for(let i=0; i<this.fleetA.length; i++){
                if(this.fleetA[i].isSunk == false){
                    statusA=1;
                }
                if(this.fleetB[i].isSunk == false){
                    statusB=1;
                }
            }

            if(statusA==1 && statusB==1)return 'undecided';
            if(statusA==1 && statusB==0)return 'A';
            if(statusA==0 && statusB==1)return 'B';
            if(statusA==0 && statusB==0)throw new Error('Both fleets fully sunk');
            throw new Error('Unexpected exception');
        };

        
        return{gridA, gridB, fleetA, fleetB, addShip, attack, checkVictory, checkAvailableSpace, clear, sunkShipGrid};
    };

function createPlayer(kind,name,side){
        return{
            getKind(){
                return kind;
            },
            getName(){
                return name;
            },
            getSide(){
                return side;
            },
            //AI FUNCTIONS
            randomCoordinates(){
                let x = Math.floor(Math.random() * 10);
                let y = Math.floor(Math.random() * 10);
                return {x,y};
            },
            lockTarget(gameboard,targetGrid){
                let targetCoord = this.randomCoordinates();
                //Keep picking at random if the target cell has already been attacked
                if(targetGrid=='A'){
                    while(gameboard.gridA[targetCoord.x][targetCoord.y].status=='miss' 
                    || gameboard.gridA[targetCoord.x][targetCoord.y].status=='hit')
                    {
                        targetCoord = this.randomCoordinates();
                    }
                }else if(targetGrid=='B'){
                    while(gameboard.gridB[targetCoord.x][targetCoord.y].status=='miss' 
                    || gameboard.gridB[targetCoord.x][targetCoord.y].status=='hit')
                    {
                        targetCoord = this.randomCoordinates();
                    }
                }
                return targetCoord;
            },
            playTurn(gameboard,targetGrid,targetCoord){
                //attack at target coordinates, if coordinates undefined, pick at random
                if(targetCoord==undefined)targetCoord=this.lockTarget(gameboard,targetGrid);
                gameboard.attack(targetCoord,targetGrid);
            }

        };
    };

function renderGrids(gameboard){
    for(let i=1;i<11;i++){
        for(let j=1;j<11;j++){
            switch(gameboard.gridA[parseInt(i)-parseInt(1)][parseInt(j)-parseInt(1)].status){
                case 'clear': document.querySelector(`#sideACell${i}-${j}`).style.backgroundColor = 'white';
                    break;
                case 'occupied':document.querySelector(`#sideACell${i}-${j}`).style.backgroundColor = "blue";
                    break;
                case 'hit':document.querySelector(`#sideACell${i}-${j}`).style.backgroundColor = "orange";
                    break;
                case 'miss':document.querySelector(`#sideACell${i}-${j}`).style.backgroundColor = "gray";
                    break;
                case 'sunk':document.querySelector(`#sideACell${i}-${j}`).style.backgroundColor = "red";
                    break;
                default:document.querySelector(`#sideACell${i}-${j}`).style.backgroundColor = "white";
                    break;
            }

            switch(gameboard.gridB[parseInt(i)-parseInt(1)][parseInt(j)-parseInt(1)].status){
                case 'clear': document.querySelector(`#sideBCell${i}-${j}`).style.backgroundColor = 'white';
                    break;
                case 'occupied':document.querySelector(`#sideBCell${i}-${j}`).style.backgroundColor = "white";
                    break;
                case 'hit':document.querySelector(`#sideBCell${i}-${j}`).style.backgroundColor = "orange";
                    break;
                case 'miss':document.querySelector(`#sideBCell${i}-${j}`).style.backgroundColor = "gray";
                    break;
                case 'sunk':document.querySelector(`#sideBCell${i}-${j}`).style.backgroundColor = "red";
                    break;
                default:document.querySelector(`#sideBCell${i}-${j}`).style.backgroundColor = "white";
                    break;
            }
        }
    }
};

exports.createShip = createShip;
exports.createGameboard = createGameboard;
exports.createPlayer = createPlayer;
