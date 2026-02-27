// ---------------- Pre-Landing Animation (bef)----------------
window.onload = () => {
  setTimeout(() => {
    document.querySelector('.pre-landing').style.display='none';
    document.querySelector('.landing-page').style.display='block';
  }, 4000);
};

// ---------------- Theme toggle (fully func) ----------------
document.getElementById('toggle-theme').addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
});

// ---------------- Cart ----------------
let cart = [];

function openCart() {
  document.getElementById('cart-modal').style.display='flex';
}

function closeCart() {
  document.getElementById('cart-modal').style.display='none';
}

document.getElementById('cart-btn').addEventListener('click', openCart);

// ---------------- Checkout ----------------
function checkout(){
  document.getElementById('checkout-modal').style.display='flex';
}

function closeCheckout(){
  document.getElementById('checkout-modal').style.display='none';
}

function showCardFields(){
  let type=document.getElementById('payment-type').value;
  document.getElementById('card-fields').style.display=(type!=='cash')?'block':'none';
}

function confirmCheckout(){
  alert("Proceeding to checkout!");
  closeCheckout();
  closeCart();
  cart=[];
  updateCartCount();
  renderCart();
}

// ---------------- Specs Modal ----------------
function viewSpecs(name){
  const p=products.find(x=>x.name===name);
  document.getElementById('specs-title').innerText = p.name;
  document.getElementById('specs-price').innerText = "₱" + p.price.toLocaleString();

  const body = document.getElementById('specs-body');
  body.innerHTML = "";

  for(let key in p.specsObj){
    const div = document.createElement('div');
    div.innerHTML = `<strong>${key}:</strong> ${p.specsObj[key]}`;
    body.appendChild(div);
  }

  document.getElementById('specs-modal').style.display='flex';
}

function closeSpecs(){
  document.getElementById('specs-modal').style.display='none';
}

// ---------------- Search ----------------
document.getElementById('search-bar').addEventListener('input', function(){
  const value = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});

// ---------------- Products ----------------
const products = [
  // Virex Computing
  {name:"Virex AeroFlex 13", category:"laptop", price:62990, img:"images/laptops/laptop1.png",
   specsObj:{Processor:"VX-Neuro M4", Memory:"16GB FluxRAM", Storage:"512GB AeroSSD", Display:"Dual detachable display system", Battery:"20hr", Extras:"Comes with invisible Wi-Fi booster"}},
  {name:"Virex AeroFlex Pro 15", category:"laptop", price:84990, img:"images/laptops/laptop2.png",
   specsObj:{Processor:"VX-Neuro M6", Memory:"32GB FluxRAM", Storage:"1TB AeroSSD", Display:"UltraSlim Aluminum Body", Battery:"22hr", Extras:"Self-cleaning keyboard (almost… kinda)"}},
  // Zentrix Labs
  {name:"Zentrix HaloBook X14", category:"laptop", price:78990, img:"images/laptops/laptop3.png",
   specsObj:{Processor:"Z-Core Fusion 7", Memory:"16GB QuantumRAM", Storage:"1TB HyperDrive SSD", Display:"EdgeGlow Display", Battery:"21hr", Extras:"Includes “Do Not Disturb” mode for bosses"}},
  {name:"Zentrix HaloBook Ultra 16", category:"laptop", price:109990, img:"images/laptops/laptop4.png",
   specsObj:{Processor:"Z-Core Fusion 9", Memory:"32GB QuantumRAM", Storage:"2TB HyperDrive SSD", Display:"ProMotion 165Hz Display", Battery:"24hr", Extras:"Built-in caffeine dispenser (just kidding!)"}},
  {name:"Zentrix NovaEdge Slim", category:"laptop", price:69990, img:"images/laptops/laptop5.png",
   specsObj:{Processor:"Z-Core Lite 5", Memory:"16GB QuantumRAM", Storage:"512GB SSD", Display:"Infinity Thin Design", Battery:"18hr", Extras:"Built-in caffeine dispenser (just kidding!)"}},
  // Orvion Tech
  {name:"Orvion DuoSlate Pro", category:"laptop", price:119990, img:"images/laptops/laptop6.png",
   specsObj:{Processor:"OVX Neural Engine", Memory:"32GB OmniRAM", Storage:"1TB Velocity SSD", Display:"Dual-screen foldable", Battery:"23hr", Extras:"Supports typing while sleepwalking"}},
  {name:"Orvion VisionBook 9X", category:"laptop", price:88990, img:"images/laptops/laptop7.png",
   specsObj:{Processor:"OVX Core Ultra", Memory:"16GB OmniRAM", Storage:"1TB SSD", Display:"Multi-mode productivity layout", Battery:"20hr", Extras:"Extra..nothing"}},
  {name:"Orvion VisionBook 9X Elite", category:"laptop", price:129990, img:"images/laptops/laptop8.png",
   specsObj:{Processor:"OVX Core Ultra+", Memory:"32GB OmniRAM", Storage:"2TB SSD", Display:"Multi-mode productivity layout", Battery:"22hr", Extras:"Tumbler with built-in mouse"}},
  // Mouse
  {name:"ProClick G1", category:"mouse", price:1990, img:"images/mouse/mouse1.png", specsObj:{DPI:"16000", Buttons:"7", Wireless:"Yes", Extras:"Comes with 'click responsibly' reminder"}},
  {name:"ProClick G2", category:"mouse", price:2490, img:"images/mouse/mouse2.png", specsObj:{DPI:"16000", Buttons:"8", Wireless:"Yes", Extras:"RGB lighting"}},
  {name:"SpeedTail X1", category:"mouse", price:1790, img:"images/mouse/mouse3.png", specsObj:{DPI:"12000", Buttons:"6", Wireless:"No", Extras:"Guaranteed to only chase your cursor, never your cat"}},
  {name:"SpeedTail X2", category:"mouse", price:2090, img:"images/mouse/mouse4.png", specsObj:{DPI:"14000", Buttons:"6", Wireless:"Yes", Extras:"RGB, Ergonomic"}},
  {name:"ClickMaster Pro", category:"mouse", price:2990, img:"images/mouse/mouse5.png", specsObj:{DPI:"16000", Buttons:"9", Wireless:"Yes", Extras:"Works better on Mondays than Sundays"}},
  {name:"ClickMaster Ultra", category:"mouse", price:3990, img:"images/mouse/mouse6.png", specsObj:{DPI:"20000", Buttons:"10", Wireless:"Yes", Extras:"Programmable, Probably smarter than you"}},
  {name:"SilentGlide X", category:"mouse", price:1490, img:"images/mouse/mouse7.png", specsObj:{DPI:"10000", Buttons:"5", Wireless:"No", Extras:"Silent clicks, Perfect for ninja mode"}},

  // Headphones
  {name:"AXION Pulse H1", category:"headphones", price:7990, img:"images/headphones/h1.png", specsObj:{Type:"Over-ear", Wireless:"Yes", NoiseCancelling:"Active", Battery:"30hr", Extras:"Bass so deep it questions reality"}},
  {name:"AXION Pulse H2", category:"headphones", price:8990, img:"images/headphones/h2.png", specsObj:{Type:"On-ear", Wireless:"Yes", NoiseCancelling:"Active", Battery:"28hr", Extras:"Noise-cancelling so good, ignores homework"}},
  {name:"AXION BassPro H3", category:"headphones", price:5990, img:"images/headphones/h3.png", specsObj:{Type:"Over-ear", Wireless:"No", NoiseCancelling:"Passive", Battery:"N/A", Extras:"Retro vibe, makes you feel like a 90s DJ"}},
  {name:"AXION Air H4", category:"headphones", price:9990, img:"images/headphones/h4.png", specsObj:{Type:"In-ear", Wireless:"Yes", NoiseCancelling:"Active", Battery:"35hr", Extras:"So comfy, you might forget you’re wearing them"}},

  // Keyboards
  {name:"KeyMaster Nova", category:"keyboard", price:3990, img:"images/keyboards/k1.png", specsObj:{Layout:"Full-size", Keys:"Mechanical", Extras:"RGB lighting to distract coworkers"}},
  {name:"MacroMancer M2", category:"keyboard", price:4990, img:"images/keyboards/k2.png", specsObj:{Layout:"Tenkeyless", Keys:"Mechanical", Extras:"Macro keys, Press F12 for instant regrets"}},
  {name:"KTypeStorm X", category:"keyboard", price:5990, img:"images/keyboards/k3.png", specsObj:{Layout:"Full-size", Keys:"Mechanical", Extras:"Wireless, Connects to your dreams"}},

  // Watches
  {name:"Cupid’s GPS H3", category:"watch", price:7990, img:"images/watches/w1.png", specsObj:{Display:"Digital", Features:"Heart Rate Monitor", Battery:"48hr", Extras:"Tracks your boyfriend, anytime"}},
  {name:"CritiStep W2", category:"watch", price:8990, img:"images/watches/w2.png", specsObj:{Display:"Analog", Features:"Step Tracker", Battery:"72hr", Extras:"Counts your steps… then judges them"}},
  {name:"HeartMapper H3", category:"watch", price:9990, img:"images/watches/w3.png", specsObj:{Display:"Hybrid", Features:"GPS & HR", Battery:"60hr", Extras:"Maps your heart, literally"}},
  {name:"MotivaFlash M4", category:"watch", price:12990, img:"images/watches/w4.png", specsObj:{Display:"Digital", Features:"Smart Notifications", Battery:"80hr", Extras:"Sends motivational quotes at 3AM, unsolicited"}}
];

function renderProducts(filtered=products){
  const grid=document.getElementById('product-grid');
  grid.innerHTML="";
  filtered.forEach(p=>{
    const card=document.createElement('div');
    card.className='product-card';
    card.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₱${p.price.toLocaleString()}</p>
      <button onclick="viewSpecs('${p.name}')">View Specs</button>
      <button onclick="addToCart('${p.name}')">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}
renderProducts();

function filterProducts(category){
  if(category==='all') renderProducts();
  else renderProducts(products.filter(p=>p.category===category));
}

// ---------------- Cart Functions ----------------
function addToCart(name){
  const item=products.find(p=>p.name===name);
  const existing=cart.find(c=>c.name===name);

  if(existing){
    existing.qty++;
    showCartNotification("Already added to your cart!");
  } else {
    cart.push({...item, qty:1});
    showCartNotification("Added to your cart!");
  }

  updateCartCount();
  renderCart();
}

function renderCart(){
  const container=document.getElementById('cart-items');
  container.innerHTML="";
  let total=0;

  cart.forEach(c=>{
    total+=c.price*c.qty;

    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`
      <span>${c.name} x ${c.qty}</span>
      <span>₱${(c.price*c.qty).toLocaleString()}</span>
      <button onclick="changeQty('${c.name}',1)">+</button>
      <button onclick="changeQty('${c.name}',-1)">-</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('total').innerText=total.toLocaleString();
}

function changeQty(name,delta){
  const item=cart.find(c=>c.name===name);
  if(!item) return;

  item.qty+=delta;

  if(item.qty<1)
    cart=cart.filter(c=>c.name!==name);

  updateCartCount();
  renderCart();
}

function updateCartCount(){
  const countEl = document.getElementById("cart-count");
  let totalQty = 0;

  cart.forEach(item => totalQty += item.qty);

  if(totalQty > 0){
    countEl.style.display = "flex";
    countEl.innerText = totalQty;
  } else {
    countEl.style.display = "none";
  }
}

function showCartNotification(message){
  const notif = document.createElement("div");
  notif.innerText = message;
  notif.style.position = "fixed";
  notif.style.bottom = "80px";
  notif.style.right = "20px";
  notif.style.background = "#000";
  notif.style.color = "#fff";
  notif.style.padding = "10px 15px";
  notif.style.borderRadius = "6px";
  notif.style.zIndex = "4000";
  notif.style.opacity = "0";
  notif.style.transition = "0.3s";

  document.body.appendChild(notif);

  setTimeout(()=> notif.style.opacity="1",100);
  setTimeout(()=>{
    notif.style.opacity="0";
    setTimeout(()=> notif.remove(),300);
  },2000);
}

// ---------------- Testimonials ----------------
const testimonials=[
  {name:"Ada J.", feedback:"Great devices, fast delivery!", rating:5},
  {name:"Picasso Dog", feedback:"Customer support was amazing.", rating:4},
  {name:"Starry Star Starla", feedback:"Highly recommend their laptops!", rating:5}

];
function renderTestimonials(){
  const container=document.getElementById('testimonials-container');
  container.innerHTML="";
  testimonials.forEach(t=>{
    const div=document.createElement('div');
    div.className='review';
    div.innerHTML=`<p>${t.name} - ${"⭐".repeat(t.rating)}</p><p>${t.feedback}</p>`;
    container.appendChild(div);
  });
}
renderTestimonials();
function submitFeedback(){
  const name=document.getElementById('user-name').value||"Anonymous";
  const feedback=document.getElementById('user-feedback').value||"";
  const rating=parseInt(document.getElementById('user-rating').value);
  testimonials.push({name,feedback,rating});
  renderTestimonials();
  document.getElementById('user-name').value="";
  document.getElementById('user-feedback').value="";
}

// ---------------- AI Chat (SMART VERSION DAPAT) ----------------
function toggleChat(){
  const chat=document.getElementById('ai-chat');
  const chatBody=document.getElementById('chat-body');

  if(chat.style.display==='flex'){
    chat.style.display='none';
  } else {
    chat.style.display='flex';

    if(chatBody.innerHTML.trim()===""){
      addAIMessage("Hi! 👋 I'm your Axion assistant. Ask me anything about our products, specs, or recommendations.");
    }
  }
}

// ENTER KEY SEND
document.getElementById("chat-input").addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    e.preventDefault();
    sendChat();
  }
});

function sendChat(){
  const input=document.getElementById('chat-input');
  const message=input.value.trim();
  if(!message) return;

  addUserMessage(message);
  input.value="";

  setTimeout(()=>{
    generateAIResponse(message);
  },500);
}

function addUserMessage(text){
  const chatBody=document.getElementById('chat-body');
  const msg=document.createElement('div');
  msg.className='user-msg';
  msg.innerText=text;
  chatBody.appendChild(msg);
  chatBody.scrollTop=chatBody.scrollHeight;
}

function addAIMessage(text){
  const chatBody=document.getElementById('chat-body');
  const msg=document.createElement('div');
  msg.className='ai-msg';
  msg.innerText=text;
  chatBody.appendChild(msg);
  chatBody.scrollTop=chatBody.scrollHeight;
}

function generateAIResponse(userMessage){
  const text=userMessage.toLowerCase();

  // PRODUCT SEARCH RESPONSE
  const matchedProduct = products.find(p => 
    text.includes(p.name.toLowerCase())
  );

  if(matchedProduct){
    addAIMessage(
      `${matchedProduct.name} is priced at ₱${matchedProduct.price.toLocaleString()}.\n\nTop Specs:\n` +
      Object.entries(matchedProduct.specsObj)
      .slice(0,3)
      .map(([k,v])=>`${k}: ${v}`)
      .join("\n")
    );
    return;
  }

  // KEYWORD RESPONSES
  if(text.includes("laptop")){
    addAIMessage("Looking for performance or portability? Our laptops are built with high-speed processors and long battery life. Tell me your budget and I’ll suggest one.");
    return;
  }

  if(text.includes("mouse")){
    addAIMessage("Looking for performance or portability? Our laptops are built with high-speed processors and long battery life. Tell me your budget and I’ll suggest one.");
    return;
  }

  if(text.includes("price")){
    addAIMessage("Our products range from affordable essentials to high-performance premium devices. Tell me which product you're checking and I’ll give you exact pricing.");
    return;
  }

  if(text.includes("recommend")){
    const randomProduct = products[Math.floor(Math.random()*products.length)];
    addAIMessage(`I recommend the ${randomProduct.name}. It delivers excellent performance for its category at ₱${randomProduct.price.toLocaleString()}.`);
    return;
  }

  if(text.includes("battery")){
    addAIMessage("Axion devices are optimized for long-lasting battery efficiency using intelligent power management systems.");
    return;
  }

  
  // DEFAULT SMART RESPONSE (??)
  addAIMessage("That's interesting 👀 Tell me more so I can give you a better recommendation. Are you looking for performance, portability, or budget-friendly options?");
}

// Scroll reveal for About section (ADD)
const revealElements = document.querySelectorAll(".reveal-text, .flash-text");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if(boxTop < triggerBottom){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

