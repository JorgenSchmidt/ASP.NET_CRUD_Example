import SurveyValues from "./SurveyValues"

export default class SurveyData {
    Id: number
    AnomalyType: string
    Description: string
    Values: Array<SurveyValues>

    constructor (id:number, anomalyType: string, descripion: string, values: Array<SurveyValues>) {
        this.Id = id
        this.AnomalyType = anomalyType
        this.Description = descripion
        this.Values = values
    }
}