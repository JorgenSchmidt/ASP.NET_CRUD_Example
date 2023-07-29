export default class DataUpdateEntity {
    position:   number
    id:         number
    coord_X:    number
    coord_Y:    number
    Value:      number

    constructor (pos: number, id: number, x: number, y: number, value: number) {
        this.position   = pos
        this.id         = id
        this.coord_X    = x
        this.coord_Y    = y
        this.Value      = value
    }
}