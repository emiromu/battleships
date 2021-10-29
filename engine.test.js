const engine = require('./engine');


describe('Testing the battleship creation', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        return;
    });

    test('Creating a carrier (length 5) at position 0,0 with x-orientation', () => {
        let testShip = engine.createShip('Carrier',{x:0,y:0},'x');
        expect(testShip.type)
        .toEqual('Carrier');
        expect(testShip.length)
        .toEqual(5);
        expect(testShip.blocks)
        .toEqual([{isHit:false,x:0,y:0},{isHit:false,x:1,y:0},{isHit:false,x:2,y:0},{isHit:false,x:3,y:0},{isHit:false,x:4,y:0}]);
    });

    test('Hits for Carrier at position 0,0 with x-orientation', () => {
        let testShip = engine.createShip('Carrier',{x:0,y:0},'x');

        testShip.hitBlock({x:0,y:0});
        expect(testShip.blocks[0].isHit)
        .toEqual(true);
    
        expect(() => testShip.hitBlock({x:0,y:0}))
        .toThrow('Block already hit');
        expect(() => testShip.hitBlock({x:5,y:5}))
        .toThrow('Block of given coordinates not found');
    
        expect(testShip.isSunk)
        .toEqual(false);
        testShip.hitBlock({x:1,y:0});
        testShip.hitBlock({x:2,y:0});
        testShip.hitBlock({x:3,y:0});
        testShip.hitBlock({x:4,y:0});
        testShip.checkSunk()
        expect(testShip.isSunk)
        .toEqual(true);
    });
    
    test('Check Sunk for Carrier at position 0,0 with x-orientation', () => {
        let testShip = engine.createShip('Carrier',{x:0,y:0},'x');
    
        testShip.hitBlock({x:0,y:0});
        testShip.hitBlock({x:2,y:0});
        expect(testShip.isSunk)
        .toEqual(false);
        testShip.hitBlock({x:1,y:0});
        testShip.hitBlock({x:3,y:0});
        testShip.hitBlock({x:4,y:0});
        testShip.checkSunk()
        expect(testShip.isSunk)
        .toEqual(true);
    });

    test('Creating a battleship out of bounds (error throw)', () => {
        expect(() => engine.createShip('Battleship',{x:9,y:9},'y'))
        .toThrow('Ship out of y-bounds');
      });
});




  describe('Testing the gameboard creation', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        let gameboard = engine.createGameboard();
      return gameboard;
    });
  
    test('Empty grids', () => {
        expect(gameboard).gridA.length
        .toEqual(100)
        expect(gameboard).gridB.length
        .toEqual(100)
        expect(gameboard).gridA[0][0].status
        .toEqual('clear');
        expect(gameboard).gridA[1][1].status
        .toEqual('clear');
        expect(gameboard).gridB[2][2].status
        .toEqual('clear');
        expect(gameboard).gridB[6][7].status
        .toEqual('clear');
      });

    test('Placing ships', () => {
        gameboard.placeShip('Carrier',{x:0,y:0},'x','A');
        gameboard.placeShip('Destroyer',{x:6,y:6},'y','B');
        expect(gameboard).gridA[0][0].status
        .toEqual('occupied');
        expect(gameboard).gridA[1][1].status
        .toEqual('clear');
        expect(gameboard).gridB[2][2].status
        .toEqual('clear');
        expect(gameboard).gridB[6][7].status
        .toEqual('occupied');
      });
  
    test('Attacking', () => {
        gameboard.placeShip('Carrier',{x:0,y:0},'x','A');
        gameboard.placeShip('Destroyer',{x:6,y:6},'y','B');

        gameboard.attack({x:1,y:0},'A');
        gameboard.attack({x:2,y:2},'B');
        expect(gameboard).gridA[0][0].status
        .toEqual('occupied');
        expect(gameboard).gridA[1][1].status
        .toEqual('clear');
        expect(gameboard).gridA[1][0].status
        .toEqual('hit');
        expect(gameboard).gridB[5][3].status
        .toEqual('clear');
        expect(gameboard).gridB[2][2].status
        .toEqual('miss');
    
        expect(() => gameboard.attack({x:50,y:50},'A'))
        .toThrow('Out of bounds');
    });

    test('Victory check', () => {
        expect(() => gameboard.checkVictory())
        .toEqual('undecided');
        gameboard.attack({x:6,y:6},'B');
        gameboard.attack({x:6,y:7},'B');
        expect(() => gameboard.checkVictory())
        .toEqual('A');
    });
  });



