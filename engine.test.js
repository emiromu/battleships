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



let gameboard;
  describe('Testing the gameboard creation', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        gameboard = engine.createGameboard();
    });

    test('Empty grids', () => {
        expect(gameboard.gridA.length)
        .toEqual(10)
        expect(gameboard.gridB.length)
        .toEqual(10)
        expect(gameboard.gridA[0].length)
        .toEqual(10)
        expect(gameboard.gridB[9].length)
        .toEqual(10)
        expect(gameboard.gridA[0][0].status)
        .toEqual('clear');
        expect(gameboard.gridA[1][1].status)
        .toEqual('clear');
        expect(gameboard.gridB[2][2].status)
        .toEqual('clear');
        expect(gameboard.gridB[6][7].status)
        .toEqual('clear');
      });

    test('Placing ships', () => {
        expect(gameboard.fleetA.length)
        .toEqual(0);
        expect(gameboard.fleetB.length)
        .toEqual(0);
        gameboard.addShip('Carrier',{x:0,y:0},'x','A');
        gameboard.addShip('Destroyer',{x:6,y:6},'y','B');
        expect(gameboard.fleetA.length)
        .toEqual(1);
        expect(gameboard.fleetB.length)
        .toEqual(1);

        expect(gameboard.gridA[0][0].status)
        .toEqual('occupied');
        expect(gameboard.gridA[1][1].status)
        .toEqual('clear');
        expect(gameboard.gridB[2][2].status)
        .toEqual('clear');
        expect(gameboard.gridB[6][7].status)
        .toEqual('occupied');
      });
  
    test('Attacking', () => {
        gameboard.addShip('Carrier',{x:0,y:0},'x','A');
        gameboard.addShip('Destroyer',{x:6,y:6},'y','B');

        gameboard.attack({x:1,y:0},'A');
        gameboard.attack({x:2,y:2},'B');
        expect(gameboard.gridA[0][0].status)
        .toEqual('occupied');
        expect(gameboard.gridA[1][1].status)
        .toEqual('clear');
        expect(gameboard.gridA[1][0].status)
        .toEqual('hit');
        expect(gameboard.gridB[5][3].status)
        .toEqual('clear');
        expect(gameboard.gridB[2][2].status)
        .toEqual('miss');
    
        expect(() => gameboard.attack({x:50,y:50},'A'))
        .toThrow('Out of bounds');
        expect(() => gameboard.attack({x:1,y:0},'A'))
        .toThrow('Duplicate attack on coordinates');
        gameboard.attack({x:9,y:3},'B');
        expect(() => gameboard.attack({x:9,y:3},'B'))
        .toThrow('Duplicate attack on coordinates');
    });

    test('Victory check', () => {
        gameboard.addShip('Carrier',{x:0,y:0},'x','A');
        gameboard.addShip('Destroyer',{x:6,y:6},'y','B');
        expect(() => gameboard.checkVictory().toEqual('undecided'));
        
        gameboard.attack({x:6,y:6},'B');
        gameboard.attack({x:6,y:7},'B');
        expect(() => gameboard.checkVictory().toEqual('A'));

        gameboard.attack({x:0,y:0},'A');
        gameboard.attack({x:1,y:0},'A');
        gameboard.attack({x:2,y:0},'A');
        gameboard.attack({x:3,y:0},'A');
        gameboard.attack({x:4,y:0},'A');
        expect(() => gameboard.checkVictory().toThrow('Both fleets fully sunk'));
    });
  });

  describe('Testing the players (human + AI)', () => {
    
    beforeEach(() => {
        return;
    });

    test('Creating human player Bob on side A', () => {
        let player = engine.createPlayer('human','Bob','A');

        expect(player.getKind())
        .toEqual('human');
        expect(player.getName())
        .toEqual('Bob');
        expect(player.getSide())
        .toEqual('A');
    });

    test('Creating computer player HAL on side B', () => {
        let player = engine.createPlayer('computer','HAL','B');

        expect(player.getKind())
        .toEqual('computer');
        expect(player.getName())
        .toEqual('HAL');
        expect(player.getSide())
        .toEqual('B');
    });

    test('Testing AI : pick valid target', () => {
        gameboard = engine.createGameboard();
        let computer = engine.createPlayer('computer','HAL','B');

        //Fill grid A with hits
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                gameboard.gridA[i][j].status='hit';
            }
        }
        //testing 1 clear cell at 5*5
        gameboard.gridA[5][5].status='clear';
        expect(computer.lockTarget(gameboard,'A'))
        .toEqual({x:5,y:5});

        //testing 1 occupied cell at 3*4
        gameboard.gridA[5][5].status='miss';
        gameboard.gridA[3][4].status='occupied';
        expect(computer.lockTarget(gameboard,'A'))
        .toEqual({x:3,y:4});
    });

    test('Testing AI : attack designated target', () => {
        gameboard = engine.createGameboard();
        let computer = engine.createPlayer('computer','HAL','B');

        expect(gameboard.gridA[0][0].status)
        .toEqual('clear');
        computer.playTurn(gameboard,'A',{x:0,y:0});
        expect(gameboard.gridA[0][0].status)
        .toEqual('miss');

    });

  });

