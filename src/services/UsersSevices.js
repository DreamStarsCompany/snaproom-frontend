import instance from "./customize-axios";


// =============Auth============
const loginDesignerAPI = async (email, password) => {
  try {
    const response = await instance.post('/api/auth/designer/login', {
      email,
      password,
    });
    console.log('Login success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// =============Furniture============
const getAllFurnituresAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/products/furnitures', {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log('Get furnitures success:', response);
    return response; 
  } catch (error) {
    console.error('Get furnitures error:', error);
    throw error;
  }
};

// =============Design============
const getAllDesignsAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/products/designs', {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log('Get designs success:', response);
    return response; 
  } catch (error) {
    console.error('Get designs error:', error);
    throw error;
  }
};


export {
  loginDesignerAPI,
  getAllFurnituresAPI,
  getAllDesignsAPI,
};


