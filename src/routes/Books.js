import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link,useNavigate } from "react-router-dom";
import "./Book.css"
import KhaltiCheckout from "khalti-checkout-web";
import config from "../components/khalti/khalti_config";
import Header from '../components/Header'
import Footer from '../components/Footer';
import axios from 'axios';




function Books() {
    let checkout = new KhaltiCheckout(config);   
    const handlePaid = async () => {
        const response = await fetch('http://localhost:8000/api/add/paid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": localStorage.getItem('userId')
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
      const sendData = async(product_id,datas)=> {
        const response = await fetch('http://localhost:8000/api/add/userLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_id" : localStorage.getItem('userId'),
        "product_id" : product_id,
        "attribute_id" : datas
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      // Error - display the error message
    }
      }
      const addLikes = async(product_id)=> {
        const response = await fetch('http://localhost:8000/api/add/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_id" : localStorage.getItem('userId'),
        "product_id" : product_id,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      // Error - display the error message
    }
      }
      
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
    const [id, setId] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const handleSubmit = async (Id) => {
    const response = await fetch('http://localhost:8000/api/add/favourite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Id
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      // Error - display the error message
    }

  };
  useEffect(() => {
      fetch("http://localhost:8000/api/backend/attribute/all")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error(error));
    }, []);
  // Filter the products based on the search query
  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/backend/product/all")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);
  const [genderCollapsed, setGenderCollapsed] = useState(true);
  const [saleCollapsed, setSaleCollapsed] = useState(true);
  const [productCollapsed, setProductCollapsed] = useState(true);
  const navigate = useNavigate();

  const sendAttribute = async(attribu) => {
    let datas = attribu.map((data) => {
        return data.id;
    });
    // use the datas array here
}

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
                
                    <div class="col-md-6 pb-4">
                        <div class="d-flex">
                            <select class="form-control">
                                <option>All</option>
                                <option>Premium</option>
                                <option>Free</option>
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
                <div class="row">
                {filteredProducts.map((product) => (
         <div class="col-md-3">
         <div class="card mb-4 product-wap rounded-0">
             <div class="card rounded-0">
             <img className="cardimg" src={`http://localhost:8000/images/product/${product.image}`} alt="No image" 
              style={{
                // maxWidth: "250px",
                maxHeight: "300px",
                width: "auto",
                height: "270px",
              }}
             />
                 <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                     <ul class="list-unstyled">{
                       isLoggedIn==true?  <li><a class="btn btn-success text-white" onClick={()=>{
                          addLikes(product.id);
                         }}><i class="far fa-heart"></i></a></li>:<li></li>
                        }
                         <li><a class="btn btn-success text-white mt-2" onClick={()=>{
                                        let datas = product.attributes.map((data) => {
                                            return data.id;
                                        });
                                        sendData(product.id,datas);
                                            handleSubmit(product.id);
                                            if(product.flash_product==1 && isLoggedIn==false){
                                                
                                                navigate('/loginRegister');
                                            }
                                           else{
                                            if(product.flash_product==1&& localStorage.getItem("paid")!="1"){
                                                checkout.show({amount: 1000});
                                                // handlePaid();
                                            }
                                            else {
                                            navigate('/product-details',{state:{product}});
                                           }
                                        }
                        
                        }}>
                            <i class="far fa-eye"></i></a></li>

 
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
                 <p class="text-center mb-0">{product.flash_product==1?"Premium":"Free"}</p>
             </div>
         </div>
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
   
    {/* <!--End Brands--> */}
    <Footer/>

    </div>
  )
}

export default Books
