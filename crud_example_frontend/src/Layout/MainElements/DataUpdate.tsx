import { Component } from 'react';
import { BackendAdress } from '../AppConfiguration';
import axios from "axios";
import "./MainElements.css";
import SurveyData from '../Entites/SurveyData';
import DataUpdateEntity from '../Entites/VisualEntities/DataUpdateEntity';
import { EventButton } from '../Buttons/EventButton';
import { NavLink } from "react-router-dom";

class DataUpdate extends Component 
{
    response:           any
    element:            SurveyData
    updateEntities:     Array<DataUpdateEntity>
    isFirstStart:       boolean
    mainVisElements:    any
    dataVisElements:    any

    constructor(props: any) {

        super(props)
        
        this.response           = null;
        this.element            = new SurveyData(0, "", "", []);
        this.updateEntities     = []
        this.isFirstStart       = true
        this.mainVisElements    = null
        this.dataVisElements    = null
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

    async sendRequest () {
        await axios.put(
            BackendAdress + "/Survey/update-entity/",
            {
                "id" : this.element.Id,
                "anomalyType" : this.element.AnomalyType,
                "description" : this.element.Description,
                "values" : this.updateEntities
            }
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
            this.updateEntities.push(
                new DataUpdateEntity (
                    this.updateEntities.length,
                    curEl.id,
                    curEl.coord_X,
                    curEl.coord_Y,
                    curEl.value
                )
            );
        });
    }

    onChangeMainParametersHandler = (field: string, value: string) => 
    { 
        switch (field) 
        {
            case "anomalyType" :
                this.element.AnomalyType = value
            break;

            case "description" :
                this.element.Description = value
            break;
        }
    }

    getMainVisualElements () {
        return (
            <div className='mainElements-DataUpdate-MainVisualElements'>
                <p className='font-medium'> Наименование типа аномалии: {this.element.AnomalyType} </p>
                <input
                    type = "text"
                    onChange={ event => {
                        this.onChangeMainParametersHandler("anomalyType", event.target.value);
                    }}
                />
                <p className='font-medium'> Наименование типа аномалии: {this.element.Description} </p>
                <input
                    type = "text"
                    onChange={ event => {
                        this.onChangeMainParametersHandler("description", event.target.value);
                    }}
                />
            </div>
        ) 
    }

    onChangeDataParametersHandler(field: string, index: number, value: number) {

        switch(field) {
            case "X" :
                this.updateEntities[index].coord_X = value
            break;

            case "Y" :
                this.updateEntities[index].coord_Y = value
            break;

            case "VAL" :
                this.updateEntities[index].Value = value
            break;
        }
        
    }

    getDataVisualElements () {
        let ans = this.updateEntities.map(
            (currentObj) => {
                return (
                    <div className='mainElements-DataUpdate-DataVisualElements'>
                        <p className="font-medium font-bold"> Элемент данных объекта #{currentObj.id} </p>
                        <p className="font-small font-nomargin font-red">Внимание! Дробные числа записываются через точку!</p>
                        <p className="font-medium"> X: {currentObj.coord_X} </p>
                        <input 
                            type = "text"
                            onChange={event => { 
                                this.onChangeDataParametersHandler("X", currentObj.position, parseFloat(event.target.value))
                            }}
                        />
                        <p className="font-medium"> Y: {currentObj.coord_Y} </p>
                        <input 
                            type = "text"
                            onChange={event => { 
                                this.onChangeDataParametersHandler("Y", currentObj.position, parseFloat(event.target.value))
                            }}
                        />
                        <p className="font-medium"> Значение: {currentObj.Value} </p>
                        <input 
                            type = "text"
                            onChange={event => { 
                                this.onChangeDataParametersHandler("VAL", currentObj.position, parseFloat(event.target.value))
                            }}
                        />
                    </div>
                )
            }
        ) 
        return ans
    }

    render () {
        if (this.response !== null) {
            if (this.response.status === 200 && this.response.body.length !== 0) { 
                if (this.isFirstStart) 
                {
                    this.getElementFromResponse()
                    this.mainVisElements = this.getMainVisualElements()
                    this.dataVisElements = this.getDataVisualElements()
                    this.isFirstStart = false;
                }

                return (
                    <div className="mainElements-DataUpdate">
                        <p className="font-large font-bold font-center"> Обновление данных по объекту #{this.getCurrentPage()}</p>
                        {this.mainVisElements}
                        {this.dataVisElements}
                        <div className='mainElements-DataUpdate-ButtonBox'>
                            <EventButton
                                content='Изменить данные'
                                eventname={ 
                                    async () => {
                                        await {}
                                        this.sendRequest()
                                    }
                                }
                            />
                            <NavLink to = {"/el/" + this.getCurrentPage()} >
                                <div className='rulebutton'>
                                    <p className='font-nomargin font-small font-smallbold'>
                                        Назад
                                    </p>
                                </div>
                            </NavLink>
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
        else 
        {
            return (
                <div>
                    <p className="font-red">Internal server error</p>
                </div>
            )
        }
    }
}

export default DataUpdate;