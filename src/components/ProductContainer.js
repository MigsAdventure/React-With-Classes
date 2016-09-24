import React, {Component} from 'react';
import ProductTable from './ProductTable';

import ProductStore from '../stores/ProductStore'

export default class ProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    products: ProductStore.getAll()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ProductStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    ProductStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      products: ProductStore.getAll()
    })
  }

  render() {
    const {products} = this.state;
    return (
      <ProductTable products={products}/>
      )
    
  }
}



//classes dont automatically bind to their 'this' method. this will be undefined unless you use bind