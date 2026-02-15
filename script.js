const products=[
{id:1,name:"RTX 3060",price:320,cat:"gpu",img:"https://images.unsplash.com/photo-1591488320449-011701bb6704"},
{id:2,name:"RTX 4060",price:410,cat:"gpu",img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7"},

{id:3,name:"Ryzen 5 5600",price:150,cat:"cpu",img:"https://images.unsplash.com/photo-1591799265444-d66432b91588"},
{id:4,name:"i5-12400F",price:170,cat:"cpu",img:"https://images.unsplash.com/photo-1587202372616-b43abea06c2a"},

{id:5,name:"16GB RAM",price:60,cat:"ram",img:"https://images.unsplash.com/photo-1562976540-1502c2145186"},
{id:6,name:"32GB RAM",price:110,cat:"ram",img:"https://images.unsplash.com/photo-1540829917886-91ab031b1764"},

{id:7,name:"SSD 1TB",price:80,cat:"ssd",img:"https://images.unsplash.com/photo-1591488320449-011701bb6704"},
{id:8,name:"SSD 2TB",price:150,cat:"ssd",img:"https://images.unsplash.com/photo-1612817288484-6f916006741a"},

{id:9,name:"PSU 650W",price:90,cat:"psu",img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7"},
{id:10,name:"PSU 850W",price:130,cat:"psu",img:"https://images.unsplash.com/photo-1618761714954-0b8cd0026356"},

{id:11,name:"Motherboard B550",price:140,cat:"mb",img:"https://images.unsplash.com/photo-1518770660439-4636190af475"},
{id:12,name:"Motherboard Z690",price:210,cat:"mb",img:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c"},

{id:13,name:"Keyboard RGB",price:50,cat:"per",img:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"},
{id:14,name:"Gaming Mouse",price:40,cat:"per",img:"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"},

{id:15,name:"Gaming Monitor",price:260,cat:"per",img:"https://images.unsplash.com/photo-1587825140400-0f3c5f0f1c7e"},
{id:16,name:"Headset",price:70,cat:"per",img:"https://images.unsplash.com/photo-1580894908361-967195033215"}
];

const container=document.getElementById("products");
const catsEl=document.getElementById("cats");
const search=document.getElementById("search");

const cats=[...new Set(products.map(p=>p.cat))];

catsEl.innerHTML=`<button onclick="render()">Всі</button>`+
cats.map(c=>`<button onclick="render('${c}')">${c}</button>`).join("");

function render(cat,searchVal=""){
 container.innerHTML="";
 products
 .filter(p=>(!cat||p.cat===cat)&&p.name.toLowerCase().includes(searchVal))
 .forEach(p=>{
  container.innerHTML+=`
  <div class="card">
   <img src="${p.img}">
   <div class="info">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <button class="add" onclick="addCart(${p.id})">Купити</button>
    <button class="fav" onclick="addFav(${p.id})">❤</button>
   </div>
  </div>`;
 });
}
render();

search.oninput=()=>render(null,search.value.toLowerCase());

function addCart(id){
 let cart=JSON.parse(localStorage.cart||"[]");
 cart.push(id);
 localStorage.cart=JSON.stringify(cart);
}

function addFav(id){
 let fav=JSON.parse(localStorage.fav||"[]");
 fav.push(id);
 localStorage.fav=JSON.stringify(fav);
}

const tgl=document.getElementById("themeToggle");
if(localStorage.theme==="dark")document.body.classList.add("dark");
tgl.onclick=()=>{
 document.body.classList.toggle("dark");
 localStorage.theme=document.body.classList.contains("dark")?"dark":"";
};
