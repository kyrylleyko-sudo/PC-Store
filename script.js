// ================= PRODUCTS =================
const products = [

{id:1,name:"Intel i5",price:200,cat:"cpu",img:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c"},
{id:2,name:"Ryzen 7",price:320,cat:"cpu",img:"https://images.unsplash.com/photo-1591799265444-d66432b91588"},

{id:3,name:"RTX 3060",price:450,cat:"gpu",img:"https://images.unsplash.com/photo-1591488320449-011701bb6704"},
{id:4,name:"RX 6700XT",price:430,cat:"gpu",img:"https://images.unsplash.com/photo-1618761714954-0b8cd0026356"},

{id:5,name:"RAM 16GB",price:80,cat:"ram",img:"https://images.unsplash.com/photo-1562976540-1502c2145186"},
{id:6,name:"RAM 32GB",price:150,cat:"ram",img:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5"},

{id:7,name:"SSD 1TB",price:90,cat:"ssd",img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7"},
{id:8,name:"SSD 2TB",price:150,cat:"ssd",img:"https://images.unsplash.com/photo-1601737487795-dab272f52420"},

{id:9,name:"PSU 650W",price:90,cat:"psu",img:"https://images.unsplash.com/photo-1587202372597-9d8b0e5e8c5c"},
{id:10,name:"PSU 850W",price:130,cat:"psu",img:"https://images.unsplash.com/photo-1518770660439-4636190af475"},

{id:11,name:"Cooler RGB",price:60,cat:"cool",img:"https://images.unsplash.com/photo-1587202372596-3e7b5c3e9c1a"},
{id:12,name:"Water Cooling",price:140,cat:"cool",img:"https://images.unsplash.com/photo-1587202372773-9891d0f0915f"},

{id:13,name:"Keyboard RGB",price:50,cat:"per",img:"https://images.unsplash.com/photo-1618384887929-16ec33fab9ef"},
{id:14,name:"Gaming Mouse",price:40,cat:"per",img:"https://images.unsplash.com/photo-1587202372473-9c3c5c2f2f20"},

{id:15,name:"Gaming Monitor",price:260,cat:"per",img:"https://images.unsplash.com/photo-1547082299-de196ea013d6"},
{id:16,name:"Headset",price:70,cat:"per",img:"https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"}

];

// ================= STORAGE =================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let fav = JSON.parse(localStorage.getItem("fav") || "[]");

// ================= RENDER PRODUCTS =================
const container = document.getElementById("products");

function render(list = products){
 if(!container) return;
 container.innerHTML = "";

 list.forEach(p=>{
  container.innerHTML += `
  <div class="card">
   <img src="${p.img}" loading="lazy">
   <div class="info">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>

    <button onclick="addCart(${p.id})">🛒</button>
    <button onclick="addFav(${p.id})">❤️</button>
   </div>
  </div>`;
 });
}

render();

// ================= SEARCH =================
const search = document.getElementById("search");
if(search){
 search.oninput = e=>{
  const val = e.target.value.toLowerCase();
  render(products.filter(p=>p.name.toLowerCase().includes(val)));
 };
}

// ================= FILTER =================
function filter(cat){
 if(cat==="all") return render();
 render(products.filter(p=>p.cat===cat));
}

// ================= CART =================
function addCart(id){
 cart.push(id);
 localStorage.setItem("cart",JSON.stringify(cart));
 alert("Додано в кошик");
}

// ================= FAVORITES =================
function addFav(id){
 if(!fav.includes(id)) fav.push(id);
 localStorage.setItem("fav",JSON.stringify(fav));
 alert("Додано в обране");
}

// ================= CART PAGE =================
const cartBox = document.getElementById("cartItems");

if(cartBox){

 function renderCart(){
  cartBox.innerHTML="";
  let total = 0;

  cart.forEach((id,i)=>{
   const p = products.find(x=>x.id===id);
   total += p.price;

   cartBox.innerHTML += `
   <div class="card fade">
    <img src="${p.img}">
    <div class="info">
     <h3>${p.name}</h3>
     <p>$${p.price}</p>
     <button onclick="removeCart(${i})">❌</button>
    </div>
   </div>`;
  });

  cartBox.innerHTML += `<h2>Сума: $${total}</h2>`;
 }

 window.removeCart = i=>{
  document.querySelectorAll(".fade")[i].style.opacity="0";
  setTimeout(()=>{
   cart.splice(i,1);
   localStorage.setItem("cart",JSON.stringify(cart));
   renderCart();
  },300);
 };

 renderCart();
}

// ================= FAVORITES PAGE =================
const favBox = document.getElementById("favItems");

if(favBox){
 fav.forEach(id=>{
  const p = products.find(x=>x.id===id);

  favBox.innerHTML += `
  <div class="card">
   <img src="${p.img}">
   <div class="info">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
   </div>
  </div>`;
 });
}

// ================= DARK MODE =================
function toggleDark(){
 document.body.classList.toggle("dark");
 localStorage.setItem("dark",document.body.classList.contains("dark"));
}

if(localStorage.getItem("dark")==="true"){
 document.body.classList.add("dark");
}
