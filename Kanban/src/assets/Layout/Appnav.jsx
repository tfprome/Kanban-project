import React from 'react';
import { useNavigate } from 'react-router-dom';

const Appnav = ({children}) => {
    const navigate=useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/')
    }



    return (
        
        <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Kanban Board</a>
          <form className="d-flex">
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </form>
        </div>
      </nav>
    );
};

export default Appnav;
