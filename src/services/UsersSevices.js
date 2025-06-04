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

const registerDesignerAPI = async (name, email, password, applicationUrl) => {
  try {
    const response = await instance.post('/api/auth/designer/register', {
      name,
      email,
      password,
      applicationUrl: applicationUrl, 
    });
    console.log('Register success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

const applicationResultAPI = async (email, isApproved) => {
  try {
    const response = await instance.post(
      `/api/auth/application-result`,
      {}, // Request body rỗng
      {
        params: {
          email: email,
          isApproved: isApproved,
        },
      }
    );
    console.log('Application result submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Application result error:', error.response?.data || error.message);
    throw error;
  }
};


// =============Furniture============
const getAllFurnituresAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/furnitures', {
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


const getAllFursByDesAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/designer/furnitures', {
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
    const response = await instance.get('/api/designs', {
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

const getAllDesignsByDesAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/designer/designs', {
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

// =============Order============

const getAllOrdersByDesAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/designer/orders', {
      params: { pageNumber, pageSize },
    });
    console.log('Get all orders by designer success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting orders by designer:', error);
    throw error;
  }
};

const getOrdersById = async (orderId) => {
  try {
    const response = await instance.get(`/api/orders/${orderId}`);
    console.log('Get order by ID success:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error getting order with ID ${orderId}:`, error);
    throw error;
  }
};

const getAllOrdersAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get('/api/orders', {
      params: { pageNumber, pageSize },
    });
    console.log('Get all orders by designer success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting orders by designer:', error);
    throw error;
  }
};


export {
  loginDesignerAPI,
  getAllFurnituresAPI,
  getAllDesignsAPI,
  getAllDesignsByDesAPI,
  getAllFursByDesAPI,
  getAllOrdersByDesAPI,
  getOrdersById,
  getAllOrdersAPI,
  registerDesignerAPI,
  applicationResultAPI
};
