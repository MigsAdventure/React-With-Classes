import React, {Component} from 'react';
import uuid from 'uuid';

import ProductActions from '../actions/ProductActions'

export default class NewProductForm extends Component {
  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const {newProductName, newProductPrice} = this.refs;

    let product = {
      name: newProductName.value,
      price: parseFloat(newProductPrice.value),
      id: uuid()
    }

    newProductName.value = '';
    newProductPrice.value = '';

    ProductActions.create(product);
  
  }

  render() {
    return (
      <form onSubmit={this._submitForm} className="form-inline">
        <div className="form-group">
          <label htmlFor="newProductName">New Product Name:</label>
          <input ref="newProductName" type="text" className="form-control" id="newProductName" required/>
        </div>
        <div className="form-group">
          <label htmlFor="newProductPrice">Cost:</label>
          <input ref="newProductPrice" type="text" className="form-control" id="newProductPrice" min="0" step="0.01" required/>
        </div>
        <button className="btn btn-default">Add Product</button>
      </form>
      )
  }
}