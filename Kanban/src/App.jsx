import React from 'react';
import KanbanBoard from './assets/Components/Board.jsx';
import Appnav from './assets/Layout/Appnav.jsx';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LoginForm from './assets/authentication/Login.jsx';
import Register from './assets/authentication/register.jsx';

const App = (props) => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route  path='/' element={<LoginForm/>}/>
      <Route path='kanban' element={<div>
          <Appnav/>
          <KanbanBoard/>
    
    </div>}/>
    </Routes>
    
    </BrowserRouter>
    
  );
};

export default App;