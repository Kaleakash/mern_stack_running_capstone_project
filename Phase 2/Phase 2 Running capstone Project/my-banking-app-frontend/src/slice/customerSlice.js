import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const customerState = {
  updateState: false,
  loading: false,
  customerList:[],
  error: "",
  response: "",
};
export const customerSignUp = createAsyncThunk(
  "customer/signUp",
  async (customer) => {
    console.log(customer);
    const response = await axios.post("http://localhost:3000/customers",customer);
    return response.data;
  }
);

export const findCustomer = createAsyncThunk(
    "customer/findById",
    async (id) => {
      console.log(id)
      const response = await axios.get(`http://localhost:3000/customers/${id}`);
      console.log(response.data);
      return response.data;
    }
);

export const changeCustomerPassword = createAsyncThunk(
  "customer/changePassword",
  async (customer) => {
    const response = await axios.put(`http://localhost:3000/customers/${customer.id}`,customer);
    console.log(response.data);
    return response.data;
  }
);

export const withDrawAmount = createAsyncThunk(
    "customer/withdraw",
    async (customer) => {
      const response = await axios.put(`http://localhost:3000/customers/${customer.id}`,customer);
      console.log(response.data);
      return response.data;
    }
);

export const depositeAmount = createAsyncThunk(
    "customer/deposite",
    async (customer) => {
      console.log(customer);
      const response = await axios.put(`http://localhost:3000/customers/${customer.id}`,customer);
      console.log(response.data);
      return response.data;
    }
);

export const findAllCustomer = createAsyncThunk(
  "customer/findAll",
  async () => {
    const response = await axios.get("http://localhost:3000/customers");
    console.log(response.data);
    return response.data;
  }
);


const customerSlice = createSlice({
  name: "customer",
  initialState: customerState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
  
    builder
      .addCase(customerSignUp.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(customerSignUp.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(changeCustomerPassword.fulfilled, (state, action) => {
        //state.userList = action.payload;
        state.loading = false;
      })
      .addCase(changeCustomerPassword.rejected, (state, action) => {
        state.error = action.error.message;
      });


      builder
      .addCase(findCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.userList.push(action.payload);
        state.response = "added";
      })
      .addCase(findCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(findAllCustomer.fulfilled, (state, action) => {
        console.log("in builder")
        state.customerList = action.payload;
        state.loading=true;
        console.log(state.customerList)
      })
      .addCase(findAllCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });


      builder
      .addCase(withDrawAmount.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.response = "added";
      })
      .addCase(withDrawAmount.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(depositeAmount.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.response = "added";
      })
      .addCase(depositeAmount.rejected, (state, action) => {
        state.error = action.error.message;
      });

   
  },
});

export default customerSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } = customerSlice.actions;
