import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpenseFromGlobalState, itemToEdit } from '../redux/actions';

class Table extends Component {
  convertExpense = (value, exchangeRate) => {
    const convertedValue = Number(value) * Number(exchangeRate);
    const roundedConvertedValue = (Math.round(convertedValue * 100) / 100).toFixed(2);
    return roundedConvertedValue;
  };

  deleteExpense = (index) => {
    const { expenses, dispatch } = this.props;
    expenses.splice(index, 1);
    // const updatedExpenses = expenses
    //   .filter((expense) => expenses.indexOf(expense) !== index);
    // console.log(updatedExpenses);
    dispatch(removeExpenseFromGlobalState(expenses));
  };

  editForm = (id) => {
    const { dispatch } = this.props;
    dispatch(itemToEdit(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            ({ value, description, currency, tag, method, id, exchangeRates }, index) => (
              <tr key={id}>
                <th scope="row" style={{ maxWidth: '200px', wordBreak: 'break-word' }}>{description}</th>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(Math.round(value * 100) / 100).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>
                  {
                    (Math.round(exchangeRates[currency].ask * 100) / 100).toFixed(2)
                  }
                </td>
                <td>{this.convertExpense(value, exchangeRates[currency].ask)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={() => this.editForm(id)}
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={() => this.deleteExpense(index)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  itemToEdit: state.itemToEdit,
});

export default connect(mapStateToProps)(Table);
