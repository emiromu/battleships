const engine = require('./engine');

  test('Creating a carrier (length 5, not hit, not sunk)', () => {
    expect(engine.createShip('Carrier'))
    .toEqual({type:'Carrier', length:5, isHit:false, isSunk:false});
  });

  test('Creating a battleship (length 4, not hit, not sunk)', () => {
    expect(engine.createShip('Battleship'))
    .toEqual({type:'Battleship', length:4, isHit:false, isSunk:false});
  });

  test('Creating a cruiser (length 3, not hit, not sunk)', () => {
    expect(engine.createShip('Cruiser'))
    .toEqual({type:'Cruiser', length:3, isHit:false, isSunk:false});
  });

  test('Creating a submarine (length 3, not hit, not sunk)', () => {
    expect(engine.createShip('Submarine'))
    .toEqual({type:'Submarine', length:3, isHit:false, isSunk:false});
  });

  test('Creating a destroyer (length 2, not hit, not sunk)', () => {
    expect(engine.createShip('Destroyer'))
    .toEqual({type:'Destroyer', length:2, isHit:false, isSunk:false});
  });