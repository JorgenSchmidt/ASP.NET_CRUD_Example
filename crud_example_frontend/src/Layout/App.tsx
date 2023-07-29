import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './AppStyles.css';
import { NavButton } from './Buttons/NavButton';
import DataAdd from './MainElements/DataAdd';
import DataView from './MainElements/DataView';
import DataViewByID from './MainElements/DataViewByID';
import DataUpdate from './MainElements/DataUpdate';

class App extends Component {
  render() {
    return (
      <div className="main">

        <div className="main-header">
          <p className="font-medium font-bold font-justify font-white">
            Формат данных:
          </p>
          <p className="font-small font-bold font-justify font-white font-indent">
            ID
          </p>
          <p className="font-small font-bold font-justify font-white font-indent">
            AnomalyType
          </p>
          <p className="font-small font-bold font-justify font-white font-indent">
            List: SurveyValues 
          </p>
          <p className="font-small font-bold font-justify font-white font-twiceindent">
            Coord_X
          </p>
          <p className="font-small font-bold font-justify font-white font-twiceindent">
            Coord_Y
          </p>
          <p className="font-small font-bold font-justify font-white font-twiceindent">
            Value
          </p>
          <div className="main-menu">
            <NavButton content="Список имеющихся данных" refto="/"/>
            <NavButton content="Добавить новый элемент" refto="/add"/>
          </div>
        </div>

        <div className="main-main">
          <Routes>
            <Route path="/" element={<DataView/>}/>
            <Route path="el/:name" element={<DataViewByID/>}/>
            <Route path="/add" element={<DataAdd/>}/>
            <Route path="/update/:name" element = {<DataUpdate/>}/>
          </Routes>
        </div>

      </div>
    )
  }
}

export default App;