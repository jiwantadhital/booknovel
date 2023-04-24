import React, { useState,useEffect } from 'react';
import { MenuItems } from './MenuItems'
import {Link} from "react-router-dom"
import '../components/Simple.css';
import '../components/Button.css';


function Header() {
    const [isLoggedIn, setActiveTab] = useState(false);
    const datas = localStorage.getItem('token');
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
        if(localStorage.getItem('paid')==="1"){
            handlePaid();
        }
        else{

        }
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setTimeout(() => {
            localStorage.removeItem('userId');
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
                    {/* <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                        <div class="input-group">
                            <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ..."/>
                            <div class="input-group-text">
                                <i class="fa fa-fw fa-search"></i>
                            </div>
                        </div>
                    </div> */}
                    {/* <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
                        <i class="fa fa-fw fa-search text-dark mr-2"></i>
                    </a> */}
                    <Link to="/liked" style={{ textDecoration: 'none' }}>
                    <a class="nav-icon position-relative text-decoration-none" >
                        <i class="far fa-heart" onClick={()=>{
                            
                        }}></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
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
                    localStorage.getItem('userType')==1? <Link to="/loginRegister" style={{ textDecoration: 'none' }}>
                        <button class="login-button" >Write a novel</button>
                        </Link>: 
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