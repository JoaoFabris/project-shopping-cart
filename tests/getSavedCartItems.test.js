const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', () => {
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalled();
})
it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
  getSavedCartItems0();
  expect(localStorage.getItem).toHaveBeenCalledwith('cartItems')
});
});
