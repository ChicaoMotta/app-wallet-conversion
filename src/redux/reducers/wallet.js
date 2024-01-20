import { EDIT_EXPENSE,
  ITEM_TO_EDIT,
  FETCHED_CURRENCIES,
  ADD_TO_EXPENSE,
  REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHED_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case ADD_TO_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case ITEM_TO_EDIT:
    return {
      ...state,
      ...action.payload,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...action.newExpense],
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      ...action.newPayload,
    };
  default:
    return state;
  }
};

export default wallet;
