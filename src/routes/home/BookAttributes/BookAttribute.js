import React from 'react'
import "../../Book.css"
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link,useNavigate,useLocation } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../../components/khalti/khalti_config";
import Header from '../../../components/Header'
import Footer from '../../../components/Footer';
function BookAttribute() {
    let checkout = new KhaltiCheckout(config);
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
    const [products, setProducts] = useState([]);
    const [novel, setNovel] = useState([]);
    const [pduct, setPduct] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    
  const produc = localStorage.getItem('catId');
  
    // Filter the products based on the search query
    const filteredProducts = pduct.filter(product => {
        return novel.includes(product.id) && product.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      const [categories, setCategories] = useState([]);
  
      useEffect(() => {
          fetch("http://localhost:8000/api/backend/attribute/all")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));
        }, []);
    useEffect(() => {
      fetch(`http://localhost:8000/api/backend/attribute/${produc}`)
        .then((response) => response.json())
        .then((data) => {
            const novelIds = data.novel.map((novel) => novel.id);
      setNovel(novelIds);
        }).catch((error) => console.error(error));
    }, [produc]);

    useEffect(() => {
       
        fetch("http://localhost:8000/api/backend/product/all")
          .then((response) => response.json())
          .then((data) => setPduct(data))
          .catch((error) => console.error(error));
      }, []);
    const [genderCollapsed, setGenderCollapsed] = useState(true);
    const [saleCollapsed, setSaleCollapsed] = useState(true);
    const [productCollapsed, setProductCollapsed] = useState(true);
    const navigate = useNavigate();
  
  return (
    <div>
                                              <Header/>

    {/* Start Content */}
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3">
          <h1 className="h2 pb-4">Categories</h1>
          <ul className="list-unstyled templatemo-accordion">
          <li className="pb-3">
                <a className="d-flex justify-content-between h3 text-decoration-none"
                  onClick={() => setGenderCollapsed(!genderCollapsed)}
                  href="#"
                >
                  All Categories
                  <i className={`fa fa-fw mt-1 ${genderCollapsed ? 'fa-chevron-circle-down' : 'fa-chevron-circle-up'}`}></i>
                </a>
                <ul className={`collapse list-unstyled pl-3 ${genderCollapsed ? '' : 'show'}`}>
                <li><a className="text-decoration-none" style={{ cursor: 'pointer' }} onClick={()=>{
                    navigate('/all');
                      }} >All</a></li>
               {categories.map((category) => (
                  <li><a className="text-decoration-none" style={{ cursor: 'pointer' }} onClick={()=>{
                    localStorage.setItem('catId', (category.id));
                    navigate('/product-attribute',{state: {category}});
                      }}>{category.name}</a></li>
                ))}
                </ul>
              </li>
    
          </ul>
        </div>




          <div class="col-lg-9">
              
              <div class="row">
                  <div class="col-md-6">
                      <ul class="list-inline shop-top-menu pb-3 pt-1">
                          <li class="list-inline-item">
                              <a class="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                          </li>
                          <li class="list-inline-item">
                              <a class="h3 text-dark text-decoration-none mr-3" href="#">Premium</a>
                          </li>
                          <li class="list-inline-item">
                              <a class="h3 text-dark text-decoration-none" href="#">Free</a>
                          </li>
                      </ul>
                  </div>
                  <div class="col-md-6 pb-4">
                      <div class="d-flex">
                          <select class="form-control">
                              <option>Featured</option>
                              <option>A to Z</option>
                              <option>Item</option>
                          </select>
                      </div>
                  </div>
              </div>
              <form action="" method="get" class="modal-content modal-body border-0 p-0">
                  <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          id="inputModalSearch"
          name="q"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

<button type="submit" class="input-group-text bg-success text-light">
                      <i class="fa fa-fw fa-search text-white"></i>
                  </button>
      </div>

          </form>
              <div class="row no-gutters">
              {filteredProducts.map((product) => (
       <div class="col-md-3">
       {novel.includes(product.id) ?(
       <div class="card mb-4 product-wap rounded-0">
           <div class="card rounded-0">
           <img className="cardimg" src={`http://localhost:8000/images/product/${product.image}`} alt="No image" 
            style={{
              maxWidth: "250px",
              maxHeight: "300px",
              width: "auto",
              height: "auto",
            }}
           />
               <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                   <ul class="list-unstyled">
                       <li><a class="btn btn-success text-white"><i class="far fa-heart"></i></a></li>
                       <li><a class="btn btn-success text-white mt-2" onClick={()=>{
                         if(product.flash_product==1 && isLoggedIn==false){
                            navigate('/loginRegister');
                        }
                       else{
                        if(localStorage.getItem("paid")!="1"){
                          checkout.show({amount: 1000});
                      }
                      else if(localStorage.getItem("paid")=="1")
                      navigate('/product-details',{state:{product}});
                       }
}}><i class="far fa-eye"></i></a></li>

<li><a class="btn btn-success text-white mt-2" ><i class="fas fa-cart-plus"></i></a></li>
                   </ul>
               </div>
           </div>
           <div class="card-body">
               <a href="shop-single.html" class="h3 text-decoration-none">{product.title}</a>
               <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                   <li class="pt-2">
                       <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                       <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                       <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                       <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                       <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                   </li>
               </ul>
               <ul class="list-unstyled d-flex justify-content-center mb-1">
                   <li>
                       <i class="text-warning fa fa-star"></i>
                       <i class="text-warning fa fa-star"></i>
                       <i class="text-warning fa fa-star"></i>
                       <i class="text-muted fa fa-star"></i>
                       <i class="text-muted fa fa-star"></i>
                   </li>
               </ul>
               <p class="text-center mb-0">$250.00</p>
           </div>
       </div>
       ):(
        <div style={{ width: 0, height: 0 }}></div>
       )
}
</div>
    ))}
                 
              </div>
              {/* end */}
              <div div="row">
                  <ul class="pagination pagination-lg justify-content-end">
                      <li class="page-item disabled">
                          <a class="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0" href="#" tabindex="-1">1</a>
                      </li>
                      <li class="page-item">
                          <a class="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" href="#">2</a>
                      </li>
                      <li class="page-item">
                          <a class="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" href="#">3</a>
                      </li>
                  </ul>
              </div>
          </div>

      </div>
  </div>
  {/* <!-- End Content -->

  <!-- Start Brands --> */}
  <section class="bg-light py-5">
      <div class="container my-4">
          <div class="row text-center py-3">
              <div class="col-lg-6 m-auto">
                  <h1 class="h1">Our Brands</h1>
                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      Lorem ipsum dolor sit amet.
                  </p>
              </div>
              <div class="col-lg-9 m-auto tempaltemo-carousel">
                  <div class="row d-flex flex-row">
                      {/* <!--Controls--> */}
                      <div class="col-1 align-self-center">
                          <a class="h1" href="#multi-item-example" role="button" data-bs-slide="prev">
                              <i class="text-light fas fa-chevron-left"></i>
                          </a>
                      </div>
                      {/* <!--End Controls-->

                      <!--Carousel Wrapper--> */}
                      <div class="col">
                          <div class="carousel slide carousel-multi-item pt-2 pt-md-0" id="multi-item-example" data-bs-ride="carousel">
                              {/* <!--Slides--> */}
                              <div class="carousel-inner product-links-wap" role="listbox">

                                  {/* <!--First slide--> */}
                                  <div class="carousel-item active">
                                      <div class="row">
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo"/></a>
                                          </div>
                                      </div>
                                  </div>
                                  {/* <!--End First slide-->

                                  <!--Second slide--> */}
                                  <div class="carousel-item">
                                      <div class="row">
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo"/></a>
                                          </div>
                                      </div>
                                  </div>
                                  {/* <!--End Second slide-->

                                  <!--Third slide--> */}
                                  <div class="carousel-item">
                                      <div class="row">
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo"/></a>
                                          </div>
                                          <div class="col-3 p-md-5">
                                              <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo"/></a>
                                          </div>
                                      </div>
                                  </div>
                                  {/* <!--End Third slide--> */}

                              </div>
                              {/* <!--End Slides--> */}
                          </div>
                      </div>
                      {/* <!--End Carousel Wrapper--> */}

                      {/* <!--Controls--> */}
                      <div class="col-1 align-self-center">
                          <a class="h1" href="#multi-item-example" role="button" data-bs-slide="next">
                              <i class="text-light fas fa-chevron-right"></i>
                          </a>
                      </div>
                      {/* <!--End Controls--> */}
                  </div>
              </div>
          </div>
      </div>
  </section>
  {/* <!--End Brands--> */}
  <Footer/>

  </div>
  )
}

export default BookAttribute