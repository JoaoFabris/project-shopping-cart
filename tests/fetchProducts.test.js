require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it("Execute a função fetchProducts com o argumento 'computador' e teste se fetch foi chamada", async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it("verifica se ao chamar a função com o argumento computador, se fetch utiliza o endPoint correto", async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  it("Teste se o retorno da função fetchProducts com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.", async () => {
    await fetchProducts('computador');
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  })
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    await fetchProducts('computador');
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
  it('Compara os dados do "computerSearch" da api da url', async () => {
    await fetchProducts('computador');
    expect(fetch).toEqual(computadorSearch);
  })
});

