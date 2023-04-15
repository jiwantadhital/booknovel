import React from 'react'
import Khalti from "../components/khalti/khalti"
import KhaltiCheckout from "khalti-checkout-web";
import config from "../components/khalti/khalti_config";

function About() {
  let checkout = new KhaltiCheckout(config);

  return (
    <div>
         <button onClick={()=>{
            checkout.show({amount: 1000});
        }}>Pay</button>
    </div>
  )
}

export default About