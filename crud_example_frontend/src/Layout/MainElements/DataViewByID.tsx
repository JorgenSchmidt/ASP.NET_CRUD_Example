import { Component } from 'react';
import { BackendAdress } from '../AppConfiguration';
import axios from "axios";
import "./MainElements.css";
import SurveyData from '../Entites/SurveyData';
import SurveyValues from '../Entites/SurveyValues';
import { NavLink } from "react-router-dom";
import { EventButton } from '../Buttons/EventButton';

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
        return await axios.get(BackendAdress + "/Survey/get-by-id/" + this.getCurrentPage())
        .then(response => this.setState(
            this.response = response.data
        ))
        .catch 
    }

    async deleteCurrentElement (id: string) {
        await axios.delete(
            BackendAdress + "/Survey/delete-entity/" + id
        ).then(
            async function () {
                document.location = await "/"
            }
        ).catch (
            async function (error) {
                console.log(error)
                alert(error)
            }
        )
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
                        <p className='font-small'>X : {currentObj.coord_X}</p>
                        <p className='font-small'>Y : {currentObj.coord_Y}</p>
                        <p className='font-small'>Значение : {currentObj.Value}</p>
                    </div>
                );
            }
        )

        return ans;
    }

    render () {
        let id = this.getCurrentPage()
        if (this.response !== null) {
            if (this.response.status === 200 && this.response.body.length !== 0) {
                this.getElementFromResponse()
                return (
                    <div className='mainElements-DataViewByID'>
                        <p className="font-medium font-center"> Тип аномалии: {this.element.AnomalyType} </p>
                        <p className='font-small font-center'> Описание: {this.element.Description}</p>
                        <p className='font-small font-bold font-smallmargin'> Имеющиеся данные: </p>
                        {this.parseValListToDisplayElements()}
                        <div className='font-center'>
                            <NavLink to = {"/update/" + id} >
                                <div className='rulebutton'>
                                    <p className='font-nomargin font-small font-smallbold'>
                                        Обновить элемент
                                    </p>
                                </div>
                            </NavLink>
                            <EventButton 
                                content = "Удалить элемент"
                                eventname = { async () => {
                                        this.deleteCurrentElement(id) 
                                    }
                                }
                            />
                        </div>
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