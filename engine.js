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
        if(orientation == 'x' && (position.x + i >10)){
            //x overflow
            throw new Error('Ship out of x-bounds');
            return;
        }
        if(orientation == 'y' && (position.y + i >10)){
            //y overflow
            //throw 'Ship out of y-bounds';
            throw new Error('Ship out of y-bounds');
            return;
        }
        if(orientation =='x'){
            blocks[i]={x: position.x+i, y:position.y, isHit: false}
        }
        else if(orientation == 'y'){
            blocks[i]={x: position.x, y:position.y+i, isHit: false}
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
exports.createShip = createShip;


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
        return{gridA, gridB};
    };
exports.createGameboard = createGameboard;