export default class DataAddEntity 
{
    Position:   number;
    coord_X:    number;
    coord_Y:    number;
    Value:      number;

    constructor (position: number, x: number, y: number, value: number) {
        this.Position   = position
        this.coord_X    = x
        this.coord_Y    = y
        this.Value      = value
    }
}