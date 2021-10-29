const engine = require('./engine');

  test('Creating a carrier (length 5) at position 0,0 with x-orientation', () => {
    let testShip = engine.createShip('Carrier',{x:0,y:0},'x');
    expect(testShip.type)
    .toEqual('Carrier');
    expect(testShip.length)
    .toEqual(5);
    expect(testShip.blocks)
    .toEqual([{isHit:false,x:0,y:0},{isHit:false,x:1,y:0},{isHit:false,x:2,y:0},{isHit:false,x:3,y:0},{isHit:false,x:4,y:0}]);

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


  test('Creating a battleship (length 4) at position 9,9 with y-orientation', () => {
    expect(() => engine.createShip('Battleship',{x:9,y:9},'y'))
    .toThrow('Ship out of y-bounds');
  });


  test('Creating a gameboard', () => {
    let gameboard = engine.createGameboard()
    expect(gameboard).gridA.length
    .toEqual(100)
    expect(gameboard).gridB.length
    .toEqual(100)

    gameboard.placeShip('Carrier',{x:0,y:0},'x','A');
    expect(gameboard).gridA[0][0].status
    .toEqual('occupied');
    expect(gameboard).gridA[1][1].status
    .toEqual('clear');

    gameboard.hit({x:1,y:0},'A');
    gameboard.hit({x:2,y:2},'B');
    expect(gameboard).gridA[0][0].status
    .toEqual('occupied');
    expect(gameboard).gridA[1][1].status
    .toEqual('clear');
    expect(gameboard).gridA[1][0].status
    .toEqual('hit');
    expect(gameboard).gridB[2][2].status
    .toEqual('miss');

  });

