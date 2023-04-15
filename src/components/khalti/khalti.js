import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khalti_config";

function khalti() {
    let checkout = new KhaltiCheckout(config);

  return (
    <div>
        <button onClick={()=>{
            checkout.show({amount: 1000});
        }}>Pay</button>
    </div>
  )
}

export default khalti