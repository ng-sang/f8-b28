const BASE_URL= `http://localhost:3000`;

fetch(`${BASE_URL}/users`)
.then((res)=>{
   return res.json();    
})
.then((data)=>{
    console.log(data);
    
});

//res.ok trẻ về true fale