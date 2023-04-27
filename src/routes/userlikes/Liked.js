import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link,useNavigate,useLocation } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../components/khalti/khalti_config";import Header from '../../components/Header'
import Footer from '../../components/Footer';
function Liked() {
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
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8000/api/show/liked/${localStorage.getItem('userId')}`)
          .then((response) => response.json())
          .then((data) => setPopular(data))
          .catch((error) => console.error(error));
      }, []);
      const [product, setSingle] = useState([]);
      const handleSingle = async (id) => {
        try {
          const response = await fetch(`http://localhost:8000/api/show/likes`);
          const data = await response.json();
          setSingle(data);
        } catch (error) {
          console.error(error);
        }
      };

      const navigate = useNavigate();
    const handleSubmit = async (Id) => {
        const response = await fetch('http://localhost:8000/api/add/attribute', {
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
      const handleDelete = async(product_id)=> {
        const response = await fetch('http://localhost:8000/api/user-like', {
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
        window.location.reload(true);
      console.log(data);
    } else {
      console.log(response.status);
    }
      }
  return (
    <div>
                                  <Header/>
                                  <div>
        <section class="bg-light">
        <div class="container py-5">
            <div class="row text-center py-3">
                <div class="col-lg-6 m-auto">
                    <h1 class="h1">Novels You've Liked</h1>
                </div>
            </div>
            <div class="row">
            {popular.map((pord) => (
                 <div class="col-8 col-md-3 mb-3" >
                 <div class="card h-80">
                        <a>
                            <img src={`http://localhost:8000/images/product/${pord.products.image}`}class="card-img-top" alt="..." 
                             style={{
                                maxHeight: "300px",
                                width: "200px",
                                height: "270px",
                              }}
                            />
                        </a>
                        <div class="card-body">
                            <ul class="list-unstyled d-flex justify-content-between">
                                <li>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                </li>
                                <li class="text-muted text-right">{pord.products.flash_product===1?"Premium":"Free"}</li>
                            </ul>
                            <a style={{
                             cursor: 'pointer'
                  
                              }} onClick={async()=>{
                                
                                navigate('/product-details', { state: { product: pord.products } });

                }} class="h2 text-decoration-none text-dark">{pord.products.title}</a>
                            <p class="card-text"
                            style={{
                                "line-height": "1.5em",
                                    height: "3em",
                             overflow: "hidden",
                             cursor: 'pointer'
                  
                              }}
                            >
                              {pord.products.description}
                            </p>
                            <i class="fa fa-trash" style={{ cursor: 'pointer' }} onClick={()=>{
                                handleDelete(pord.products.id);
                                
                            }}></i>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </section>
    </div>
                                  <Footer/>


    </div>
  )
}

export default Liked