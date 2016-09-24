import React, {Component} from 'react';
import numeral from'numeral';

import ProductActions from '../actions/ProductActions';

export default class ProductTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editId: null //this never goes to the store. no flux! it begins as null because it starts without editing
    }
    this._startEdit = this._startEdit.bind(this);
    this._stopEdit = this._stopEdit.bind(this);
    this._saveEdit = this._saveEdit.bind(this);
  }

  _startEdit(editId) {
    this.setState({editId});
  }

  _stopEdit() {
    let editId = null;
    this.setState({editId});
  }

  _saveEdit(product) {
    let {name,price} = this.refs;
    let newObject = Object.assign({}, product, {
      name: name.value,
      price: parseFloat(price.value)
    });
    ProductActions.productEdit(newObject); 
    this._stopEdit();
  }

  render() {
    const {products} = this.props;
    const {editId} = this.state;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {
              let {id,name,price} = product;
              if (id === editId) {
                return (
                  <tr key={id}>
                    <td>
                      <input type="text" ref="name" defaultValue={name}/>
                    </td>
                    <td>
                      <input type="text" ref="price" defaultValue={price}/>
                    </td>
                    <td>
                      <button onClick={this._saveEdit.bind(this,product)}>Save</button>
                      <button onClick={this._stopEdit}>Cancel</button>
                    </td>
                  </tr>
                  ) //end of return if id matches editId
              } else {
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{numeral(price).format('$0,0.00')}</td>
                    <td>
                      <button disabled={editId} onClick={this._startEdit.bind(this,id)}>Edit</button>
                    </td>
                  </tr>
                  )
              }
            })
          }
        </tbody>
      </table>
      )
  }
}

//THIS IS THE ORIGINAL DUMMY TABLE, but since edit button was added, it had to be turned into a smart component

// import React, {Component} from 'react';
// import numeral from 'numeral';


// const ProductTable = props => {
//   const {products} = props;

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map(product => (
//           <tr key={product.id}>
//             <td>{product.name}</td>
//             <td>{numeral(product.price).format('$0,0.00')}</td>
//           </tr>
//           )
//         )}
//       </tbody>

//     </table>
//     )
// }

// export default ProductTable