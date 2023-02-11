import { NavLink } from 'react-router-dom';
import './ButtonStyles.css';

interface INavButton {
    content: string,
    refto: string
}

export const NavButton = ({content, refto} : INavButton ) => {
    return (
        <NavLink to={refto}>
            <div className="navbutton">
                <p className="font-nomargin font-small font-smallbold"> {content} </p>
            </div>  
        </NavLink>
    )
}