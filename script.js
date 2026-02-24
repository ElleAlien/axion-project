// SPLASH
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("splash").style.display="none";
    document.getElementById("main").classList.remove("hidden");
  },2500);
});

// CATEGORY FILTER
const filterBtns=document.querySelectorAll(".filter-btn");
const cards=document.querySelectorAll(".card");

filterBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const category=btn.dataset.category;
    cards.forEach(card=>{
      card.style.display=(category==="all" || card.dataset.category===category)?"block":"none";
    });
  });
});

// SEARCH FUNCTIONALITY (by name starting letters)
document.getElementById("search").addEventListener("keyup",function(){
  const value=this.value.toLowerCase();
  cards.forEach(card=>{
    const name=card.querySelector("h3").innerText.toLowerCase();
    card.style.display=name.startsWith(value)?"block":"none";
  });
});

// DARK MODE
const toggle=document.getElementById("themeToggle");
toggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  toggle.textContent=document.body.classList.contains("dark")?"☀ LIGHT MODE":"🌙 DARK MODE";
});

// CART
const cartPanel=document.getElementById("cartPanel");
const cartBtn=document.getElementById("cartBtn");
const closeCart=document.getElementById("closeCart");
const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cartCount");
const totalEl=document.getElementById("total");
let total=0;

cartBtn.onclick=()=>cartPanel.classList.add("open");
closeCart.onclick=()=>cartPanel.classList.remove("open");

document.querySelectorAll(".add").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const card=btn.parentElement;
    const name=card.querySelector("h3").innerText;
    const price=parseInt(card.querySelector("span").innerText.replace(/[^\d]/g,''));

    const item=document.createElement("div");
    item.innerHTML=`${name} ₱${price.toLocaleString()} <button>X</button>`;
    cartItems.appendChild(item);

    total+=price;
    totalEl.innerText=`₱${total.toLocaleString()}`;
    cartCount.innerText=cartItems.children.length;

    item.querySelector("button").onclick=()=>{
      total-=price;
      totalEl.innerText=`₱${total.toLocaleString()}`;
      item.remove();
      cartCount.innerText=cartItems.children.length;
    };

    alert(`${name} added to your cart!`);
  });
});

// FEEDBACK
document.getElementById("feedbackForm").addEventListener("submit",function(e){
  e.preventDefault();
  const name=document.getElementById("name").value;
  const message=document.getElementById("message").value;
  const div=document.createElement("div");
  div.innerHTML=`<strong>${name}</strong><br>${message}`;
  document.getElementById("feedbackList").appendChild(div);
  this.reset();
});

// AI CHAT FUNCTIONALITY
const aiBot = document.getElementById("aiBot");
const aiChat = document.getElementById("aiChat");
const closeChatPopup = document.getElementById("closeChatPopup");
const aiMessages = document.getElementById("aiMessages");
const aiInput = document.getElementById("aiInput");
const aiSend = document.getElementById("aiSend");

// Open chat popup
aiBot.addEventListener("click", () => {
  aiChat.style.display = "flex";
  aiInput.focus();
});

// Close chat popup
closeChatPopup.addEventListener("click", () => {
  aiChat.style.display = "none";
});

// Send message
function sendMessage() {
  const userText = aiInput.value.trim();
  if(!userText) return;

  // Display user message
  const userDiv = document.createElement("div");
  userDiv.classList.add("userMsg");
  userDiv.textContent = userText;
  aiMessages.appendChild(userDiv);

  // Scroll to bottom
  aiMessages.scrollTop = aiMessages.scrollHeight;

  // Simple pre-set AI responses
  const aiDiv = document.createElement("div");
  aiDiv.classList.add("aiMsg");
  
  const response = getAIResponse(userText.toLowerCase());
  aiDiv.textContent = response;
  setTimeout(()=>{
    aiMessages.appendChild(aiDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  },500);

  aiInput.value = "";
}

// AI responses (basic)
function getAIResponse(input){
  if(input.includes("laptop")) return "We have Virex AeroFlex 13 and AeroFlex Pro 15 laptops. Check Products section!";
  if(input.includes("headphone")) return "Try our ZMF V-Rit or Melody Mage headphones.";
  if(input.includes("mouse")) return "We offer Virex GlideFold M1 mouse.";
  if(input.includes("keyboard")) return "Check out Keyboard P101 with mechanical keys and RGB lighting.";
  if(input.includes("watch")) return "The Meta Smartwatch tracks heart rate, sleep, and has GPS!";
  if(input.includes("price")) return "Prices are shown under each product. All in Philippine Pesos (₱).";
  if(input.includes("hello") || input.includes("hi")) return "Hello! How can I help you today?";
  return "I'm here to help! Try asking about laptops, headphones, mouse, keyboard, or watch.";
}

// Send message on button click or Enter key
aiSend.addEventListener("click", sendMessage);
aiInput.addEventListener("keyup", (e) => { if(e.key === "Enter") sendMessage(); });

// TESTIMONIAL FORM
const testimonialForm = document.getElementById("testimonialForm");
const testimonialList = document.getElementById("testimonialList");

testimonialForm.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("tName").value;
  const message = document.getElementById("tMessage").value;
  const rating = document.getElementById("tRating").value;

  // Create testimonial div
  const div = document.createElement("div");
  div.classList.add("testimonial");
  div.innerHTML = `<p>"${message}"</p><span>– ${name}, ${"⭐".repeat(rating)}</span>`;

  // Add to top of testimonial list
  testimonialList.prepend(div);

  // Reset form
  this.reset();
});

// PRODUCT MODAL FUNCTIONALITY
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalSpecs = document.getElementById("modalSpecs");
const modalPrice = document.getElementById("modalPrice");
const modalAddCart = document.getElementById("modalAddCart");
const closeModalBtn = document.getElementById("closeModal");

// Open modal when card clicked (except Add button)
cards.forEach(card => {
  card.addEventListener("click", function(e){
    if(e.target.classList.contains("add")) return; // ignore Add button

    const name = card.querySelector("h3").innerText;
    const specs = card.querySelector("p").innerText;
    const price = card.querySelector("span").innerText;

    modalTitle.innerText = name;
    modalSpecs.innerText = specs;
    modalPrice.innerText = price;

    // Save price & name for modal Add to Cart
    modalAddCart.dataset.name = name;
    modalAddCart.dataset.price = price.replace(/[^\d]/g,""); // numeric only

    modal.classList.remove("hidden");
  });
});

// Close modal
closeModalBtn.addEventListener("click", ()=>{
  modal.classList.add("hidden");
});

// Add to cart from modal
modalAddCart.addEventListener("click", ()=>{
  const name = modalAddCart.dataset.name;
  const price = parseInt(modalAddCart.dataset.price);

  const item = document.createElement("div");
  item.innerHTML = `${name} ₱${price.toLocaleString()} <button>X</button>`;
  cartItems.appendChild(item);

  total += price;
  totalEl.innerText = "₱" + total.toLocaleString();

  // Remove item
  item.querySelector("button").onclick = ()=>{
    total -= price;
    totalEl.innerText = "₱" + total.toLocaleString();
    item.remove();
  };

  // Close modal after adding
  modal.classList.add("hidden");
});