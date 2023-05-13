const modalBody = document.querySelector(".modal-body");
const cartBtn = document.querySelector(".itemCountTotal");
let clearCartBtn = document.querySelector(".clearcart");
const totalPriceSpan = document.getElementById("total-price");
let addToCartBtn = document.querySelectorAll(".add-to-cart");
const removeBtn = modalBody.querySelector(".btn-danger");
let itemsCart = [];
const orange = {
  id: "1",
  name: "Orange",
  price: "0.5",
  count: "0",
};

const banana = {
  id: "2",
  name: "Banana",
  price: "1.22",
  count: "0",
};

const lemon = {
  id: "3",
  name: "Lemon",
  price: "5",
  count: "0",
};
function addItemToCart(item) {
  let itemExists = false;
  for (let i = 0; i < itemsCart.length; i++) {
    if (itemsCart[i].id === item.id) {
      itemsCart[i].count++;
      itemExists = true;
      break;
    }
  }
  if (!itemExists) {
    itemsCart.push(item);
    item.count++;
  }
  localStorage.setItem(item.name, JSON.stringify(item));
}

function removeItemFromCart(item) {
  for (let i = 0; i < itemsCart.length; i++) {
    if (itemsCart[i].name === item.name) {
      item.count--;
      if (itemsCart[i].count == 0) {
        itemsCart.splice(itemsCart[i], 1);
      }
      break;
    }
  }
  localStorage.setItem(item.name, JSON.stringify(item));
}
function emptySingleItemAll(item) {
  for (let i = 0; i < itemsCart.length; i++) {
    if (itemsCart[i].name === item.name) {
      itemsCart.splice(itemsCart[i], 1);
      break;
    }
  }
}
function createItemCheckoutMenu(item) {
  modalBody.innerHTML += `
      <div class="input-group mb-3 d-flex flex-row justify-content-between">
        <div class="input-group-prepend">
          <span class="item-name">${item.name}</span>
          <button class="btn btn-outline-secondary btn-decrement" type="button">-</button>
        </div>
        <input type="number" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value="1" data-id="${item.id}">
        <button class="btn btn-outline-secondary btn-increment" type="button">+</button>
        <button class="btn btn-danger" data-id=${item.id}>X</button>
        <span class="item-price">${item.price}</span>
      </div>
    `;
}

function clearItemsCart() {
  itemsCart = [];
  cartBtn.innerHTML = `${itemsCart.length}`;
  modalBody.innerHTML = "";
  updateTotalPrice();
  localStorage.clear();
}
function countTotal() {
  let sum = 0;
  for (let i = 0; i < itemsCart.length; i++) {
    sum += itemsCart[i].price * itemsCart[i].count;
  }
  return sum;
}
function updateTotalPrice() {
  let totalPrice = countTotal();
  totalPriceSpan.textContent = `Total Price: $${totalPrice}`;
}
// Helper Functions
function getItem(button) {
  const dataId = button.getAttribute("data-id");
  switch (dataId) {
    case "1":
      return orange;
      break;
    case "2":
      return banana;
      break;
    case "3":
      return lemon;
      break;
    default:
      return null;
      break;
  }
}
function sumOfCounts() {
  let sum = 0;
  for (let i = 0; i < itemsCart.length; i++) {
    sum += itemsCart[i].count;
  }
  return sum;
}
function returnItemById(id) {
  for (let i = 0; i < itemsCart.length; i++) {
    if (id == itemsCart[i].id) {
      return itemsCart[i].name;
    }
    return null;
  }
}
//Events
clearCartBtn.addEventListener("click", clearItemsCart);

addToCartBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const item = getItem(button);
    if (item) {
      addItemToCart(item);
      createItemCheckoutMenu(item);
      updateTotalPrice();
      cartBtn.innerHTML = sumOfCounts();
    }
  });
});

removeBtn.addEventListener("click", () => {
  const itemId = removeBtn.getAttribute("data-id");
  const itemName = returnItemById(itemId);
  emptySingleItemAll(itemName);

  const itemDiv = removeBtn.closest(".input-group");
  itemDiv.remove();

  updateTotalPrice();
});
