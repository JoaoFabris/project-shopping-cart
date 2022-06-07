const fetchProductId = (product) => `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

const fetchProducts = async (product) => {
  try {
  const url = fetchProductId(product);
  const result = await fetch(url);
  const data = await result.json();
  return data.results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
