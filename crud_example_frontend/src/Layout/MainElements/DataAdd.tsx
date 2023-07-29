import { Component } from "react";
import axios from "axios";
import "./MainElements.css";
import { EventButton } from "../Buttons/EventButton";
import { BackendAdress } from "../AppConfiguration";
import DataAddEntity from "../Entites/VisualEntities/DataAddEntity";

class DataAdd extends Component {

    AnomalyType     : string
    TypeIsCorrect   : boolean 

    Description     : string
    DescrIsCorrect  : boolean

    DataAddEntities : Array<DataAddEntity>
    EntitiesDisplay : any

    IsFirstStart    : boolean

    constructor (props: any) 
    {
        super(props)

        this.AnomalyType    = ""
        this.TypeIsCorrect  = false

        this.Description    = ""
        this.DescrIsCorrect = false

        this.DataAddEntities = []
        this.EntitiesDisplay = null

        this.IsFirstStart    = true

    }

    onChangeMainParametersHandler = (field: string, value: string) => 
    { 
        switch (field) 
        {
            case "anomalyType" :
                this.AnomalyType = value
            break;

            case "description" :
                this.Description = value
            break;
        }
    }

    async paramsIsCorrect () 
    {
        await this.setState(
            () => this.TypeIsCorrect = this.AnomalyType === "" ? false : true
        )
        await this.setState(
            () => this.DescrIsCorrect = this.Description === "" ? false : true
        )
    }

    async sendRequest () 
    {
        await axios.post (
            BackendAdress + "/Survey/add-entity",
            {
                "anomalyType" : this.AnomalyType,
                "description" : this.Description,
                "values" : this.DataAddEntities
            }
        ).then (
            async function () {
                document.location = await "/";
            }
        )
        .catch (
            async function (error) {
                alert(error)
            }
        )
    }

    parseListToDisplayElements ( ) {
        var ans = this.DataAddEntities.map (
            (currentObj) => {
                return (
                    <div className="mainElements-DataAdd-dataAddPattern">
                        <p className="font-medium"> Элемент данных №: {currentObj.Position + 1} </p>
                        <p className="font-small font-nomargin font-red">Внимание! Дробные числа записываются через точку!</p>
                        <p className="font-medium"> X: </p>
                        <input 
                            type = "text"
                            onChange={event => { 
                                this.onChangeDataParametersHandler("X", currentObj.Position, parseFloat(event.target.value))
                            }}
                        />
                        <p className="font-medium"> Y: </p>
                        <input 
                            type = "text"
                            onChange={event => { 
                                this.onChangeDataParametersHandler("Y", currentObj.Position, parseFloat(event.target.value))
                            }}
                        />
                        <p className="font-medium"> Значение: </p>
                        <input 
                            type = "text"
                            onChange={event => { 
                                this.onChangeDataParametersHandler("VAL", currentObj.Position, parseFloat(event.target.value))
                            }}
                        />
                    </div>
                )
            }
        )
        return ans;
    }

    onChangeDataParametersHandler(field: string, index: number, value: number) {

        switch(field) {
            case "X" :
                this.DataAddEntities[index].coord_X = value
            break;

            case "Y" :
                this.DataAddEntities[index].coord_Y = value
            break;

            case "VAL" :
                this.DataAddEntities[index].Value = value
            break;
        }
        
    }

    render () {
        if (this.IsFirstStart) 
        {
            this.IsFirstStart = false
            this.DataAddEntities.push(new DataAddEntity(0, 0, 0, 0))
        }

        this.EntitiesDisplay = this.parseListToDisplayElements()

        return(
            <div className="mainElements-DataAdd">
                <p className="font-large font-bold font-center"> Добавить элемент </p>
                <div className="mainElements-DataAdd-internal">
                    <p className="font-medium"> Тип аномалии: </p>
                    <input 
                        type = "text"
                        onChange={event => {this.onChangeMainParametersHandler("anomalyType", event.target.value)}}
                    />
                    <p className="font-medium"> Описание: </p>
                    <input 
                        type = "text"
                        onChange={event => {this.onChangeMainParametersHandler("description", event.target.value)}}
                    />
                </div>
                {this.EntitiesDisplay}
                <EventButton
                    content="Добавить данные"
                    eventname={ async () => {
                        // first parameter of constructor is crutch (for correct indexing)
                        this.DataAddEntities.push(new DataAddEntity(this.DataAddEntities.length, 0, 0, 0))
                        this.EntitiesDisplay = this.parseListToDisplayElements()
                        this.setState({})
                    }}
                />
                <EventButton
                    content="Отправить"
                    eventname={ async () => {
                        await this.paramsIsCorrect();
                        if (this.TypeIsCorrect && this.DescrIsCorrect) 
                        {
                            this.sendRequest();
                        }
                        else if (!this.TypeIsCorrect) 
                        {
                            alert("Введите тип аномалии");
                        }
                        else if (!this.DescrIsCorrect) 
                        {
                            alert("Введите описание");
                        }
                    }}
                />
            </div>
        )
    }
    
}

export default DataAdd