const engine = require('./engine');

  test('Creating a carrier (length 5) at position 0,0 with x-orientation', () => {
    expect(engine.createShip('Carrier',{x:0,y:0},'x'))
    .toEqual({
    type:'Carrier',
    length:5,
    blocks: [{isHit:false,x:0,y:0},{isHit:false,x:1,y:1},{isHit:false,x:2,y:2},{isHit:false,x:3,y:3},{isHit:false,x:4,y:4}],
    isSunk:false
    });
  });

  test('Creating a battleship (length 4) at position 9,9 with y-orientation', () => {
    expect(() => engine.createShip('Battleship',{x:9,y:9},'y'))
    .toThrow('Ship out of y-bounds');
  });
