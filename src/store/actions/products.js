export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId) => {
  return {type: DELETE_PRODUCT, pid: productId};
};

export const createProduct = (car, visit) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      car,
      visit,
    },
  };
};

export const updateProduct = (id, car, visit) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      car,
      visit,
    },
  };
};
