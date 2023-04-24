import khaltiKey from "./khaltikey";

const handleSubmit = async () => {
  const response = await fetch('http://localhost:8000/api/add/paid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": 1
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

let config = {
    // replace this key with yours
    "publicKey": khaltiKey.publicTextKey,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
      onSuccess(payload) {
        // hit merchant api for initiating verification
       handleSubmit();
      //  window.location.href = '/';
      //  window.location.reload(true);
        localStorage.setItem('paid', ("1"));
      console.log("done");

      },

      // onError handler is optional
      onError(error) {
        handleSubmit();

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