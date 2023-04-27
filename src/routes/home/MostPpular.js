import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link,useNavigate,useLocation } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../components/khalti/khalti_config";
import "./Home.css"
function MostPpular() {
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
      function getStarRating(averageLikes) {
        const rating = Math.round(averageLikes * 2) / 2;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      
        let stars = "";
      
        for (let i = 0; i < fullStars; i++) {
          stars += '<i class="text-warning fa fa-star"></i>';
        }
      
        if (halfStar) {
          stars += '<i class="text-warning fa fa-star-half"></i>';
        }
      
        for (let i = 0; i < emptyStars; i++) {
          stars += '<i class="text-muted fa fa-star"></i>';
        }
      
        return stars;
      }
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api/backend/product/popular")
          .then((response) => response.json())
          .then((data) => setPopular(data))
          .catch((error) => console.error(error));
      }, []);
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
  return (
    <div>
        <section class="bg-light">
        <div class="container py-5">
            <div class="row text-center py-3">
                <div class="col-lg-6 m-auto">
                    <h1 class="h1">Popular Novels</h1>
                    <p>
                    Most popular novels for all the users
                    </p>
                </div>
            </div>
            <div class="row">
            {popular.map((product) => (
                <div class="col-12 col-md-4 mb-4" >
                    <div class="card h-100">
                        <a>
                            <img src={`http://localhost:8000/images/product/${product.image}`}class="card-img-top" alt="..." 
                             style={{
                                maxHeight: "300px",
                                width: "auto",
                                height: "auto",
                              }}
                            />
                        </a>
                        <div class="card-body">
                            <ul class="list-unstyled d-flex justify-content-between">
                            <li dangerouslySetInnerHTML={{ __html: getStarRating(product.comments.reduce((total, comment) => total + comment.likes, 0) / product.comments.length) }}></li>

                                <li class="text-muted text-right">{product.flash_product===1?"Premium":"Free"}</li>
                            </ul>
                            <a style={{
                             cursor: 'pointer'
                  
                              }} onClick={()=>{
                    handleSubmit(product.id);
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
                }} class="h2 text-decoration-none text-dark">{product.title}</a>
                            <p class="card-text"
                            style={{
                                "line-height": "1.5em",
                                    height: "3em",
                             overflow: "hidden",
                             cursor: 'pointer'
                  
                              }}
                            >
                              {product.description}
                            </p>
                            <p class="text-muted">Reviews ({product.comments.length})</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </section>
    </div>
  )
}

export default MostPpular