import { useState, useEffect } from "react";
import {useNavigate,useLocation } from "react-router-dom";
function BestCategories() {
    const [categories, setCategories] = useState([]);
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
    useEffect(() => {
        fetch("http://localhost:8000/api/backend/attribute/popular")
          .then((response) => response.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error(error));
      }, []);
  return (
    <div>
        <section class="container py-5">
        <div class="row text-center pt-3">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">Categories of The Month</h1>
                <p>
                    These are the best categories that users have read
                </p>
            </div>
        </div>
        <div class="row">
        {categories.map((category) => (
            <div class="col-10 col-md-3 p-5 mt-3">
                <a href="#"><img src="./assets/img/rom.png" class="rounded-circle img-fluid border"/></a>
                <h5 class="text-center mt-3 mb-3">{category.name}</h5>
                <p class="text-center"><a class="btn btn-success" onClick={()=>{
                    localStorage.setItem('catId', (category.id));
                    handleSubmit(category.id);
navigate('/product-attribute',{state:{category}});
  }}>Go Read</a></p>
            </div>
        ))}
        </div>
    </section>
         
    </div>
  )
}

export default BestCategories