function createShip(type, position, orientation) {
    /**TYPES
    1	Carrier	5
    2	Battleship	4
    3	Cruiser	3
    4	Submarine	3
    5	Destroyer	2

    position is the coordinates (x,y) of the first block
    orientation is either horizontal (x) or vertical (y), and only goes (left to right, up to down)
    assume a 10x10 grid, (0,0) in the top left corner
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
        blocks[i]={x: position.x+i, y:position.y+i, isHit: false}
    };

    return {type, length, blocks, isSunk};
    };
exports.createShip = createShip;