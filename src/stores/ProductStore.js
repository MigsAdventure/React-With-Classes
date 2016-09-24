import AppDispatcher from '../AppDispatcher'
import {EventEmitter} from 'events';
import Storage from '../Storage';


let _products = Storage.read('products') || []; //can think of this as a default operator. If storage.read('products') is falsy, meaning nothing in there, it will return empty array

class ProductStore extends EventEmitter { //This can also be written as const ProductStore = Object.assign({}, EventEmitter.prototype, { });
  constructor() {
    super(); //super sets 'this' up to be the ProductStore 


    AppDispatcher.register(action => {        //stores will register a callback which is this function
      switch(action.type) {
        case 'PRODUCT_CREATE' :
          let {product} = action.payload;         //action is the object and payload is the key
          _products.push(product);
          this.emit('CHANGE');
          break;

        case 'PRODUCT_EDIT' :
          let {editedProduct} = action.payload;
          //
          let newProducts = _products.map((product) => {
            if(product.id === editedProduct.id) {
              return editedProduct;
            } else {
              return product;
            }
                                          //this is the store the arrow function bound the lexical this which is the ProductStore
          }) //map end

          _products = newProducts; 

          this.emit('CHANGE');
          break; 
                                          //app Dispatcher has all callbacks from stores, then dispatch invokes all the callbacks passing in 'action' in each one.
        }  //switch end

    this.on('CHANGE', () => {
      Storage.write('products', _products);
      console.log('_products', _products)
    }); // on change end
                                            //not every store will care about all..thats why we have switch!
  }) //AppDispatcher
} //end of constructor
  startListening(cb) {                      //these are methods inside of ProductStore. no commas!
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE',cb);
  }

  getAll() {
    return _products;
  }
}
 
export default new ProductStore(); //This creates an instance of the ProductStore object