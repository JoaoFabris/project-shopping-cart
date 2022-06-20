// const { consoleLog } = require("mocha/lib/reporters/base");
// const { fetchProducts } = require("./helpers/fetchProducts");
/* const saveCartItems = require("./helpers/saveCartItems"); */

const cartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const sumPrice = document.querySelector('.total-price');
const totalPrice = () => {
  const items = document.querySelectorAll('.cart__item');
  let total = 0;
  items.forEach((element) => {
    const price = parseFloat(element.innerText.split('$')[1]);
    total += price;
  });
  sumPrice.innerText = total;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  totalPrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const productCart = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((btn) => btn.addEventListener('click', async () => {
    const parent = btn.parentNode;
    const cartInfo = await fetchItem(getSkuFromProductItem(parent));
    const { id, title, price } = cartInfo;
    const a = createCartItemElement({
      sku: id,
      name: title,
      salePrice: price,
    });
    cartItems.appendChild(a);
    saveCartItems(cartItems.innerHTML);
    totalPrice();
  }));
};

const productList = async () => {
  const itens = document.querySelector('.items');
  const result = await fetchProducts('computador');
  result.forEach((item) => {
    const { id, title, thumbnail } = item;
    const a = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    itens.appendChild(a);
  });
  productCart();
};

const limparLi = () => {
  document.querySelector('.cart__items').addEventListener('click', cartItemClickListener);
};

const emptyBtncart = () => {
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
  });
};

const loadingAlert = async () => {
 const alert = document.createElement('h1');
 const section = document.querySelector('.items');
 alert.innerText = 'carregando...';
 alert.classList = 'loading';
 section.appendChild(alert);
 await fetchProducts('computador');
 alert.remove();
};

window.onload = () => {
  productList();
  cartItems.innerHTML = getSavedCartItems();
  limparLi();
  emptyBtncart();
  loadingAlert();
};
