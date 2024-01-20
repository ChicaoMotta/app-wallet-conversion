import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <section
        className="wallet"
        style={{
          backgroundColor: 'darkkhaki',
          minHeight: '100vh',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <Header />
            <WalletForm />
            <Table />
          </div>
        </div>
      </section>
    );
  }
}

export default connect()(Wallet);
