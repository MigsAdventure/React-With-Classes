import React, {Component} from 'react';
import NewProductForm from './NewProductForm';
import ProductContainer from './ProductContainer';


class Layout extends Component {   //This can also be written as export default class Layout extends Component. The bottom export line can be removed if written this way
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Product List</h1>
        <NewProductForm/>
        <ProductContainer/>
      </div>
      )
  }
}

export default Layout;