import React, { useState,useEffect } from 'react';
import { MenuItems } from './MenuItems'
import {Link} from "react-router-dom"
import '../components/Simple.css';
import '../components/Button.css';


function Header() {
    const handlePaid = async () => {
        const response = await fetch('http://localhost:8000/api/add/paid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": localStorage.getItem('forPaid')
          }),
        });
      
        const data = await response.json();
        if (response.ok) {
         
          console.log(data);
        } else {
          console.log("Error");
          // Error - display the error message
        }
      
      };  
    const [isLoggedIn, setActiveTab] = useState(false);
    const datas = localStorage.getItem('token');
    const handleTabClick = () => {
        if(datas != null){
            setActiveTab(true);
         }
      };
      useEffect(() => {
        if(datas != null){
            setActiveTab(true);
         }
      }, isLoggedIn);

     const logout=()=>{
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('userId');
          setTimeout(() => {
              window.location.href = '/'; 
          window.location.reload(true);
            }, 500);

    

      }
  return (
    <div>
            <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">

            <a class="navbar-brand text-success logo h1 align-self-center" href="index.html">
                E-Novel
            </a>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div class="flex-fill">
                    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        {
                            MenuItems.map((e,index)=>{
                                return(
                                    <li key={index}>
                                    <Link to={e.url} style={{ textDecoration: 'none' }}>
                                <a style={{ textDecoration: 'none' }} className={e.cName} href="index.html">{e.title}</a>
                                </Link>
                            </li>
                                );
                            })
                        }
                       
                    </ul>
                </div>
                <div class="navbar align-self-center d-flex">
                    <Link to="/liked" style={{ textDecoration: 'none' }}>
                    <a class="nav-icon position-relative text-decoration-none" >
                        <i class="far fa-heart" onClick={()=>{
                            
                        }}></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"></span>
                    </a>
                    </Link>
                    <a class="nav-icon position-relative text-decoration-none" href="#">
                   { 
                  isLoggedIn==false? <Link to="/loginRegister" style={{ textDecoration: 'none' }}>
                        <button class="login-button" >Login</button>
                        </Link>: 
                         <button class="login-button" onClick={logout} >Logout</button>
                        
                    }
                    <a>         </a>
                    {
                    localStorage.getItem('userType')==1?
                        <button class="login-button" onClick={()=>{
                            window.location.href = 'http://localhost:8000/login';
                        }}>Write a novel</button>
                        : 
                        <a></a>
                        
                    }

                    </a>
                </div>
            </div>

        </div>
    </nav>
    <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="w-100 pt-1 mb-5 text-right">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" method="get" class="modal-content modal-body border-0 p-0">
                <div class="input-group mb-2">
                    <input type="text" class="form-control" id="inputModalSearch" name="q" placeholder="Search ..."/>
                    <button type="submit" class="input-group-text bg-success text-light">
                        <i class="fa fa-fw fa-search text-white"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Header