export default function getProductList() {
    return  fetch('http://localhost:8000/main_products/')
    .then(response => response.json())
    // .catch(error => console.error('Error:', error))
    // .then(response => console.log('Success:', JSON.stringify(response)));
    // fetch('https://my-json-server.typicode.com/bitsnitinpatil/demo/RecentJobs')
    //   .then(data => data.json())
  }