import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchedCurrencies,
  fetchCurrentExchangeRate,
  editExpense,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        const mappedCurrencies = Object.keys(data);
        dispatch(fetchedCurrencies(mappedCurrencies));
      });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  addExpense = () => {
    const { dispatch, expenses } = this.props;
    const { id } = this.state;
    const currentItem = { ...this.state };
    dispatch(fetchCurrentExchangeRate(currentItem, expenses));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  editCurrentExpense = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const editedFields = { ...this.state };

    expenses[idToEdit] = {
      ...expenses[idToEdit],
      ...editedFields,
      id: idToEdit,
    };
    const editedExpenses = [...expenses];
    dispatch(editExpense(editedExpenses));

    // mentoria
    // dispatch(editExpense(expenses));
  };

  render() {
    const { value, tag, currency, method, description } = this.state;
    const { currencies, editor } = this.props;
    if (editor) {
      return (
        <div
          className="col-12 d-flex flex-row align-items-center
          justify-content-around p-0 py-4 mb-5 bg-light rounded border border-secondary"
        >
          <label htmlFor="" className="d-flex flex-column ">
            Valor da compra:
            <input
              type="text"
              name="value"
              data-testid="value-input"
              value={value}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="" className="d-flex flex-column ">
            Descrição da compra:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={this.handleChange}
              value={description}
            />
          </label>
          <label htmlFor="" className="d-flex flex-column ">
            Moeda:
            <select
              name="currency"
              id=""
              data-testid="currency-input"
              onChange={this.handleChange}
              value={currency}
            >
              {currencies.map((currencyAbbreviation, index) => (
                <option
                  key={index}
                  value={currencyAbbreviation}
                >
                  {currencyAbbreviation}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="" className="d-flex flex-column ">
            Forma de pagamento:
            <select
              name="method"
              id=""
              data-testid="method-input"
              onChange={this.handleChange}
              value={method}
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="" className="d-flex flex-column ">
            Categoria:
            <select
              name="tag"
              id=""
              data-testid="tag-input"
              onChange={this.handleChange}
              value={tag}
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={this.editCurrentExpense}
            className="rounded border
           border-secondary py-3 px-4 bg-danger-subtle"
          >
            Editar despesa

          </button>
        </div>

      );
    }
    return (
      <div
        className="col-12 d-flex flex-row align-items-center
      justify-content-around p-0 py-4 mb-5 bg-light rounded border border-secondary"
      >
        <label htmlFor="" className="d-flex flex-column ">
          Valor da compra:
          <input
            type="text"
            name="value"
            data-testid="value-input"
            value={value}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="" className="d-flex flex-column ">
          Descrição da compra:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={this.handleChange}
            value={description}
          />
        </label>
        <label htmlFor="" className="d-flex flex-column ">
          Moeda:
          <select
            name="currency"
            id=""
            data-testid="currency-input"
            onChange={this.handleChange}
            value={currency}
          >

            {currencies.map((currencyAbbreviation, index) => (
              <option
                key={index}
                value={currencyAbbreviation}
              >
                {currencyAbbreviation}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="" className="d-flex flex-column ">
          Forma de pagamento:
          <select
            name="method"
            id=""
            data-testid="method-input"
            onChange={this.handleChange}
            value={method}
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="" className="d-flex flex-column ">
          Categoria:
          <select
            name="tag"
            id=""
            data-testid="tag-input"
            onChange={this.handleChange}
            value={tag}
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          onClick={this.addExpense}
          className="rounded border
         border-secondary py-3 px-4"
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
