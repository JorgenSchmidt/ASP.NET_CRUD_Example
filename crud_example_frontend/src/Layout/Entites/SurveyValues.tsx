export default class SurveyValues {
    coord_X:    number
    coord_Y:    number
    Value:      number

    constructor (x: number, y: number, value: number) {
        this.coord_X    = x
        this.coord_Y    = y
        this.Value      = value
    }
}