import khaltiKey from "./khaltikey";

const handleSubmit = async () => {
   await new Promise(resolve => setTimeout(resolve, 1000));
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
    localStorage.setItem('paid', 1);
   
    console.log("all done");
  } else {
    console.log("Error");
    // Error - display the error message
  }

};

let config = {
    // replace this key with yours
    "publicKey": khaltiKey.publicTextKey,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
      onSuccess(payload) {
        console.log(payload);
        // hit merchant api for initiating verification
       handleSubmit();
 
      console.log("done");

      },

      // onError handler is optional
      onError(error) {

        // handle errors
        console.log("error");
      },
      onClose() {

        console.log('widget is closing');
      }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };
  


export default config;