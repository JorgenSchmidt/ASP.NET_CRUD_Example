import axios from "axios";
import { Component } from "react";
import { BackendAdress } from "../AppConfiguration";
import SurveyData from "../Entites/SurveyData";
import SurveyValues from "../Entites/SurveyValues";
import "./MainElements.css";
import { ViewDataElement } from "./ViewDataElement";

class DataView extends Component {

    // Fields
    status: number
    elements: Array<SurveyData>
    response: any
    currentElementsDisplays: any

    constructor(props: any) {
        super(props)

        this.status = 0
        this.elements = []
        this.response = null
        this.currentElementsDisplays = null
    }

    // Life cycle methods
    componentDidMount() {
        this.response = this.getResponse()
    }

    // Methods
    getResponse() {
        return axios.get(BackendAdress + "/Survey/get-all")
            .then(response => this.setState(
                this.response = response.data
            ))
    }

    parseJsonToList () {
        this.elements = []
        for (let i = 0; i< this.response.body.length; i++) {
            var vals:SurveyValues[] = [];
            for (let n = 0; n<this.response.body[i].values.length; n++) {
                vals.push(
                    new SurveyValues (
                        this.response.body[i].values[n].coord_X,
                        this.response.body[i].values[n].coord_Y,
                        this.response.body[i].values[n].value
                    )
                )
            }
            this.elements.push (
                new SurveyData (
                    this.response.body[i].id,
                    this.response.body[i].anomalyType,
                    this.response.body[i].description,
                    vals
                )
            )
        }
    }

    parseListToDisplayElements () {
        var ans = this.elements.map(
            (currentObj) => {
                return(
                    <ViewDataElement 
                        anomalyType = {currentObj.AnomalyType}
                        description = {currentObj.Description}
                        refto = {"/el/" + currentObj.Id}
                    />
                )
            }
        )

        this.currentElementsDisplays = ans
    }

    render () {
        if (this.response !== null) {
            if (this.response.status !== 500) {
                this.parseJsonToList()
                this.parseListToDisplayElements()
                return(
                    <div className="mainElements-DataView">
                        <p className="font-large font-bold">Список элементов: </p>
                        {this.currentElementsDisplays}
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <p className="font-red">Internal Server Error</p>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <p className="font-red">Cant upload page</p>
                </div>
            )
        }
    }
}

export default DataView