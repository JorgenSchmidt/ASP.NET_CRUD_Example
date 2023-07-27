import { Component } from 'react';
import { BackendAdress } from '../AppConfiguration';
import axios from "axios";
import "./MainElements.css";
import SurveyData from '../Entites/SurveyData';
import SurveyValues from '../Entites/SurveyValues';

export default class DataViewByID extends Component {

    response:   any
    element:    SurveyData

    constructor(props: any) {

        super(props)
        
        this.response = null;
        this.element  = new SurveyData(0, "", "", []);
    }

    async componentDidMount() {
        this.response = this.getResponse();
    }

    async getResponse() {
        return axios.get(BackendAdress + "/Survey/get-by-id/" + this.getCurrentPage())
        .then(response => this.setState(
            this.response = response.data
        ))
    }

    getCurrentPage = () => {
        return window.location.href.substr(window.location.href.lastIndexOf('/') + 1, window.location.href.length - 1)
    }

    getElementFromResponse() {
        this.element.Values = [];
        this.element.Id             = this.response.body[0].id;
        this.element.AnomalyType    = this.response.body[0].anomalyType;
        this.element.Description    = this.response.body[0].description;
        this.response.body[0].values.forEach((curEl : any) => {
            this.element.Values.push(
                new SurveyValues (
                    curEl.coord_X,
                    curEl.coord_Y,
                    curEl.value
                )
            );
        });
    }

    parseValListToDisplayElements() 
    {
        var ans = this.element.Values.map(
            (currentObj) => {
                return(
                    <div className='displayElements-DataViewByID'>
                        <p className='font-small'>X : {currentObj.Coord_X}</p>
                        <p className='font-small'>Y : {currentObj.Coord_Y}</p>
                        <p className='font-small'>Значение : {currentObj.Value}</p>
                    </div>
                );
            }
        )

        return ans;
    }

    render () {
        console.log(this.response)
        console.log(this.element)
        if (this.response !== null) {
            if (this.response.status === 200 && this.response.body.length !== 0) {
                this.getElementFromResponse()
                return (
                    <div className='mainElements-DataViewByID'>
                        <p className="font-medium"> Тип аномалии: {this.element.AnomalyType} </p>
                        <p className='font-small'> Описание: {this.element.Description}</p>
                        {this.parseValListToDisplayElements()}
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <p className="font-red">Unknown server error</p>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <p className="font-red">Internal server error</p>
                </div>
            )
        }
    }
}