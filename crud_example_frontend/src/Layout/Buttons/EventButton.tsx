import './ButtonStyles.css';

interface IEventButton {
    content: string,
    eventname: () => void
}

export const EventButton = ({content, eventname} : IEventButton ) => {
    return (
        <div className="rulebutton" onClick={eventname}>
            <p className="font-nomargin font-small font-smallbold"> {content} </p>
        </div>  
    )
}