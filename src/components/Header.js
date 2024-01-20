import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  sumExpenses = (expenses) => {
    const totalSum = expenses.reduce((acc, cur) => {
      const { currency, exchangeRates, value } = cur;
      const convertedRate = Number(value) * Number(exchangeRates[currency].ask);
      const roundedConvertedRate = (Math.round(convertedRate * 100) / 100).toFixed(2);
      return (Number(acc) + Number(roundedConvertedRate)).toFixed(2);
    }, 0);
    return totalSum;
  };

  render() {
    const { email, expenses } = this.props;
    const { currency } = this.state;
    return (
      <div
        className="col-12
       d-flex flex-row align-items-center border border-secondary rounded my-5 bg-light"
      >
        <p data-testid="email-field" className="m-0 p-4">{`User: ${email}`}</p>
        <p data-testid="" className="m-0 py-4 pe-2">R$</p>
        <p data-testid="total-field" className="m-0 py-4 pe-4">
          {
            expenses.length > 0
              ? this.sumExpenses(expenses)
              : '0.00'
          }
        </p>
        <p data-testid="header-currency-field" className="m-0 pe-4 py-4">{currency}</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
