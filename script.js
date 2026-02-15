// ================= PRODUCTS =================
const products = [
  {id:1,name:"Intel i5",price:200,cat:"cpu",img:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600"},
  {id:2,name:"Ryzen 7",price:320,cat:"cpu",img:"https://images.unsplash.com/photo-1591799265444-d66432b91588?w=600"},
  {id:3,name:"RTX 3060",price:450,cat:"gpu",img:"https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600"},
  {id:4,name:"RX 6700XT",price:430,cat:"gpu",img:"https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600"},
  {id:5,name:"RAM 16GB",price:80,cat:"ram",img:"https://images.unsplash.com/photo-1562976540-1502c2145186?w=600"},
  {id:6,name:"RAM 32GB",price:150,cat:"ram",img:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600"},
  {id:7,name:"SSD 1TB",price:90,cat:"ssd",img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600"},
  {id:8,name:"SSD 2TB",price:150,cat:"ssd",img:"https://images.unsplash.com/photo-1601737487795-dab272f52420?w=600"},
  {id:9,name:"PSU 650W",price:90,cat:"psu",img:"https://images.unsplash.com/photo-1587202372597-9d8b0e5e8c5c?w=600"},
  {id:10,name:"PSU 850W",price:130,cat:"psu",img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"},
  {id:11,name:"Cooler RGB",price:60,cat:"cool",img:"https://images.unsplash.com/photo-1587202372596-3e7b5c3e9c1a?w=600"},
  {id:12,name:"Water Cooling",price:140,cat:"cool",img:"https://images.unsplash.com/photo-1587202372773-9891d0f0915f?w=600"},
  {id:13,name:"Keyboard RGB",price:50,cat:"per",img:"https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600"},
  {id:14,name:"Gaming Mouse",price:40,cat:"per",img:"https://images.unsplash.com/photo-1587202372473-9c3c5c2f2f20?w=600"},
  {id:15,name:"Gaming Monitor",price:260,cat:"per",img:"https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600"},
  {id:16,name:"Headset",price:70,cat:"per",img:"https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=600"}
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
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.name;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "info";

    const h3 = document.createElement("h3");
    h3.textContent = p.name;

    const price = document.createElement("p");
    price.textContent = `$${p.price}`;

    const btnCart = document.createElement("button");
    btnCart.textContent = "🛒";
    btnCart.onclick = ()=> addCart(p.id);

    const btnFav = document.createElement("button");
    btnFav.textContent = "❤️";
    btnFav.onclick = ()=> addFav(p.id);

    info.append(h3, price, btnCart, btnFav);
    card.append(img, info);
    container.appendChild(card);
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
  if(!cart.includes(id)) cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Додано в кошик");
}

// ================= FAVORITES =================
function addFav(id){
  if(!fav.includes(id)) fav.push(id);
  localStorage.setItem("fav", JSON.stringify(fav));
  alert("Додано в обране");
}

// ================= CART PAGE =================
const cartBox = document.getElementById("cartItems");

if(cartBox){
  function renderCart(){
    cartBox.innerHTML = "";
    let total = 0;

    cart.forEach(id=>{
      const p = products.find(x=>x.id===id);
      total += p.price;

      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = p.img;
      img.alt = p.name;

      const info = document.createElement("div");
      info.className = "info";

      const h3 = document.createElement("h3");
      h3.textContent = p.name;

      const price = document.createElement("p");
      price.textContent = `$${p.price}`;

      const btn = document.createElement("button");
      btn.textContent = "❌";
      btn.onclick = ()=> removeCart(p.id);

      info.append(h3, price, btn);
      card.append(img, info);
      cartBox.appendChild(card);
    });

    const totalEl = document.createElement("h2");
    totalEl.textContent = `Сума: $${total}`;
    cartBox.appendChild(totalEl);
  }

  function removeCart(id){
    cart = cart.filter(item=>item!==id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  renderCart();
}

// ================= FAVORITES PAGE =================
const favBox = document.getElementById("favItems");

if(favBox){
  function renderFav(){
    favBox.innerHTML = "";
    fav.forEach(id=>{
      const p = products.find(x=>x.id===id);

      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = p.img;
      img.alt = p.name;

      const info = document.createElement("div");
      info.className = "info";

      const h3 = document.createElement("h3");
      h3.textContent = p.name;

      const price = document.createElement("p");
      price.textContent = `$${p.price}`;

      info.append(h3, price);
      card.append(img, info);
      favBox.appendChild(card);
    });
  }

  renderFav();
}

// ================= DARK MODE =================
function toggleDark(){
  document.body.classList.toggle("dark");
  localStorage.setItem("dark",document.body.classList.contains("dark"));
}

if(localStorage.getItem("dark")==="true"){
  document.body.classList.add("dark");
}
