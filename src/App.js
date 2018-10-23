import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import dataexchange from './dataexchange';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ipfs from './ipfs';

class App extends Component {
  constructor() {
    super();
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.buyFunction = this.buyFunction.bind(this);
    this.state = {
      products: [],
      message: '',
      quantity: 0,
      buffer: null,
      ipfsHash: '',
      value_title: '',
      value_price: 0,
      index: 0
    };
  }

  async componentDidMount() {
    const quantity = await dataexchange.methods.getProductsLength().call();
    let products = [];
    for (let i = 0; i < quantity; i++) {
      products[i] = await dataexchange.methods.getProduct(i).call();
    }
    this.setState({ products, quantity });
  }

  onSubmit = async event => {
    event.preventDefault();
    console.log('onSubmit');
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.setState({ ipfsHash: result[0].hash });
      const accounts = await web3.eth.getAccounts();
      await dataexchange.methods
        .addProduct(
          this.state.value_title,
          this.state.ipfsHash,
          this.state.value_price
        )
        .send({
          from: accounts[0]
        });

      console.log(
        this.state.ipfsHash,
        this.state.value_title,
        this.state.value_price
      );
    });
  };

  captureFile(event) {
    event.preventDefault();
    console.log('captureFile');
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      // console.log('buffer', this.state.buffer);
    };
  }

  buyFunction = async index => {
    // event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await dataexchange.methods.buyProduct(index).send({
      from: accounts[0],
      value: this.state.products[index][1]
    });
  };

  render() {
    return (
      <div>
        <h1>Marketplace for DApp Data Exchange</h1>
        <h3>Current available Documents: {this.state.quantity}.</h3>
        <h1>Documents</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Price</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((doc, index) => {
              return (
                <tr key={index}>
                  <td>{doc[0]}</td>
                  <td>{doc[1]}</td>
                  <td>
                    <input
                      type="submit"
                      className="btn btn-info"
                      value="buy"
                      onClick={() => {
                        // console.log(index);
                        // this.setState({ index });
                        this.buyFunction(index);
                      }}
                    />
                  </td>
                  <td />
                </tr>
              );
            })}
          </tbody>
        </table>
        <h1>Add new Document</h1>

        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Title of Product </label>
                </td>
                <td>
                  <input
                    type="text"
                    onChange={event => {
                      this.setState({ value_title: event.target.value });
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Price </label>
                </td>
                <td>
                  <input
                    type="text"
                    onChange={event => {
                      this.setState({ value_price: event.target.value });
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="file" onChange={this.captureFile} />
          <br />
          <br />
          <input type="submit" className="btn btn-info" />
        </form>
      </div>
    );
  }
}

export default App;
