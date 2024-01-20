// Coloque aqui suas actions
export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
export const FETCHED_CURRENCIES = 'FETCHED_CURRENCIES';
export const ADD_TO_EXPENSE = 'ADD_TO_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const ITEM_TO_EDIT = 'ITEM_TO_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// User
export const saveUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  email,
});

// Wallet
export const fetchedCurrencies = (data) => ({
  type: FETCHED_CURRENCIES,
  payload: [...data],
});

export const addToGlobalExpense = (expenses) => ({
  type: ADD_TO_EXPENSE,
  payload: [...expenses],
});

export const fetchCurrentExchangeRate = (currentItem, expenses) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    currentItem.exchangeRates = data;
    delete data.USDT;
    expenses.push(currentItem);
    dispatch(addToGlobalExpense(expenses));
  } catch (error) {
    console.error(error);
  }
};

export const removeExpenseFromGlobalState = (expenses) => ({
  type: REMOVE_EXPENSE,
  newExpense: expenses,
});

export const itemToEdit = (id) => ({
  type: ITEM_TO_EDIT,
  payload: {
    editor: true,
    idToEdit: id,
  },
});

export const editExpense = (expenses) => ({
  type: EDIT_EXPENSE,
  newPayload: { expenses, editor: false },
});
