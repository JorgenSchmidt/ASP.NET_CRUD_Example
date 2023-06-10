import { NavLink } from "react-router-dom";
import "../../index.css"

export default class ViewData {
    anomalyType: string
    description: string
    refto: string

    constructor (anomalyType: string, desc: string, refto: string) {
        this.anomalyType = anomalyType
        this.description = desc
        this.refto = refto
    }
}

export const ViewDataElement = ({anomalyType, description, refto}: ViewData) => {
    return (
        <NavLink to={refto}>
            <div className="mainElements-ViewDataBlock">
                <p className="font-small font-smallbold"> Тип: {anomalyType} </p>
                <p className="font-verysmall font-smallbold"> Описание: {description} </p>
            </div>
        </NavLink>
    )
} 