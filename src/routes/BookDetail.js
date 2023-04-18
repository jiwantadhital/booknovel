import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./home/Home.css";
import Details from "./home/BookDetails/Details";
import Comments from "./home/BookDetails/Comments";
import Chapters from "./home/BookDetails/Chapters";
import Header from '../components/Header'
import Footer from '../components/Footer';
function BookDetail() {
    // const [products, setProducts] = useState([]);
    // const [attribute, setAttribute] = useState([]);

    const location = useLocation();
    const product = location.state.product;
    const [attribute, setAttribute] = useState([]);

    // Fetch all products from the API
    const [products, setProducts] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api/backend/product/all")
        .then((response) => response.json())
        .then((data) => setProducts(data)).then(()=>{
          handleAttri();
        })
        .catch((error) => console.error(error));
    }, []);
    
    // Filter products based on attributes
    const filteredProducts = products.filter(produc => {
      // Get the list of attribute ids for the current product
      const attributeIds = produc.attributes.map(attribute => attribute.id);
      // Check if any of the attribute ids are in the attribute list
      return attributeIds.some(id => attribute.includes(id));
    });
  const [activeTab, setActiveTab] = useState("details");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleAttri = (tab) => {
    setAttribute(product.attributes.map((atri)=>atri.id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return <Details product = {product} />;
      case "comments":
        return <Comments product = {product}/>;
      case "chapters":
        return <Chapters product = {product} />;
      default:
        return null;
    }
  };
  return (
    
    <div >
                                <Header/>

     {/* <!-- Open Content --> */}
    <section class="bg-light">
        <div class="container pb-5">
            <div class="row">
                <div class="col-lg-5 mt-5">
                    <div class="card mb-3">
                        <img class="card-img img-fluid" src={`http://localhost:8000/images/product/${product.image}`} alt="Card image cap" id="product-detail"/>
                    </div>
                    <div class="row">
      
                    </div>
                </div>
                {/* <!-- col end --> */}
                <div class="col-lg-7 mt-5">
                  
                    <div class="card">
                    <div>
      <div className="tab">
        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => handleTabClick("details")}
        >
          Details
        </button>
        <button
          className={activeTab === "comments" ? "active" : ""}
          onClick={() => handleTabClick("comments")}
        >
          Comments
        </button>
        <button
          className={activeTab === "chapters" ? "active" : ""}
          onClick={() => handleTabClick("chapters")}
        >
          Chapters
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
                    
                    </div>
                    
                </div>
                
            </div>
        </div>
    </section>
    {/* {/* <!-- Close Content -->

       <!-- Start Article --> */}
    <section class="py-5">
            <div class="row text-left p-2 pb-3">
                <h4>Related Novels</h4>
            </div>
            <div className="container1">
            {/* <!--Start Carousel Wrapper--> */}
                        <div id="multi-item-example" class="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                            {/* <!--Start Slides--> */}
                            <div class="carousel-inner product-links-wap" role="listbox">

                                {/* <!--First slide--> */}
                                    <div class="row-1">
                                    {filteredProducts.map((product) => (
                                    <div class="col-2">
                                    <div class="p-2 pb-3">
                    <div class="product-wap card rounded-0">
                        <div class="card rounded-0">
                            <img class="card-img rounded-0 img-fluid" src={`http://localhost:8000/images/product/${product.image}`}
                            style={{
                              maxHeight: "200px",
                              width: "auto",
                              height: "auto",
                            }}
                            />
                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul class="list-unstyled">
                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
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
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-muted fa fa-star"></i>
                                </li>
                            </ul>
                            <p class="text-center mb-0">{product.flash_product==1?"Premium":"Free"}</p>
                        </div>
                    </div>
                </div>
                </div>
                                    ))}
       
        
                                   
                                    </div>
                             
                        </div>

</div>      
</div> 


    </section>
    {/* // <!-- End Article --> */}
    <Footer/>

    </div>
  );
}

export default BookDetail