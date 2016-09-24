import AppDispatcher from '../AppDispatcher'


const ProductActions = {
  create (product) {
    AppDispatcher.dispatch({
      type: 'PRODUCT_CREATE',
      payload: {product} //dont forget! same as product: product
    })
  },

  productEdit(editedProduct){
    console.log('Product actions editedproduct',editedProduct);
    AppDispatcher.dispatch({
      type: 'PRODUCT_EDIT',
      payload:{editedProduct}
    })
  }
}

export default ProductActions;