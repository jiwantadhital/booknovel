import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link,useNavigate,useLocation } from "react-router-dom";
import KhaltiCheckout from "../../components/khalti/khalti";
import config from "../../components/khalti/khalti_config";
function Recommended() {
    let checkout = new KhaltiCheckout(config);   

    const navigate = useNavigate();


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
      const sendData = async(product_id,datass)=> {
        const response = await fetch('http://localhost:8000/api/add/userLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_id" : localStorage.getItem('userId'),
        "product_id" : product_id,
        "attribute_id" : datass
      }),
    });
}
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
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api/show/userData")
          .then((response) => response.json())
          .then((data) => setPopular(data))
          .catch((error) => console.error(error));
      }, []);
  return (
    <div>
    <section class="bg-light">
    <div class="container py-5">
        <div class="row text-center py-3">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">Recommended for you Novels</h1>
                <p>
                    
                </p>
            </div>
        </div>
        <div class="row">
        {popular.map((product) => (
            <div class="col-8 col-md-4 mb-3" >
                <div class="card h-80">
                    <a>
                        <img src={`http://localhost:8000/images/product/${product.image}`}class="card-img-top" alt="..." 
                         style={{
                            maxHeight: "220px",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                    </a>
                    <div class="card-body">
                        <ul class="list-unstyled d-flex justify-content-between">
                            <li>
                                <i class="text-warning fa fa-star"></i>
                                <li class="text-muted text-right">{product.comments.isEmpty?(product.comments.map(comment => comment.likes).reduce((accumulator, currentValue) => accumulator + currentValue, 0)/product.comments.length):"0"}</li>
                            </li>
                            <li class="text-muted text-right">{product.flash_product===1?"Premium":"Free"}</li>
                        </ul>
                        <a style={{
                         cursor: 'pointer'
              
                          }} onClick={()=>{
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
            }} class="h2 text-decoration-none text-dark">{product.title}</a>
                        <p class="card-text"
                        style={{
                            "line-height": "1.5em",
                                height: "3em",
                         overflow: "hidden",
                         cursor: 'pointer'
              
                          }}
                        >
                         { product.description}
                        </p>
                        <p class="text-muted">Reviews (12)</p>
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

export default Recommended