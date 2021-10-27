function createShip(type) {
    /**Your ‘ships’ will be objects that include their length, 
     * where they’ve been hit 
     * and whether or not they’ve been sunk. 
     * 
     * 
    1	Carrier	5
    2	Battleship	4
    3	Cruiser	3
    4	Submarine	3
    5	Destroyer	2
    */
    let length = 0;
    let isHit = false;
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


    return {type, length, isHit, isSunk};
    };
exports.createShip = createShip;