export default class SurveyValues {
    Coord_X:    number
    Coord_Y:    number
    Value:      number

    constructor (x: number, y: number, value: number) {
        this.Coord_X    = x
        this.Coord_Y    = y
        this.Value      = value
    }
}