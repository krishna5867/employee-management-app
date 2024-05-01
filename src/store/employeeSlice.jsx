import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INT_STATE = {
  employeesData: [],
  isLoading: false,
  isError: null,
  searchEmployee:[]
};

export const fetchEmployeeDataAsyncThunk = createAsyncThunk(
  "fetchEmployeeData",
  async (args) => {
    const response = await fetch(
      "https://653686dbbb226bb85dd244f8.mockapi.io/employee"
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const createEmployeeAsyncThunk = createAsyncThunk(
  "createEmployee",
  async (data) => {
    const response = await fetch(
      "https://653686dbbb226bb85dd244f8.mockapi.io/employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const updateEmployeeAsyncThunk = createAsyncThunk(
  "updateEmployee",
  async (data) => {
    const response = await fetch(
      `https://653686dbbb226bb85dd244f8.mockapi.io/employee/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const deleteEmployeeAsyncThunk = createAsyncThunk(
  "deleteEmployee",
  async (id) => {
    const response = await fetch(
      `https://653686dbbb226bb85dd244f8.mockapi.io/employee/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState: INT_STATE,
  reducers: {
    searchEmployee : (state,action)=>{
      state.searchEmployee = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeDataAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployeeDataAsyncThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeesData = action.payload;
      })
      .addCase(fetchEmployeeDataAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(createEmployeeAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployeeAsyncThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeesData.push(action.payload);
      })
      .addCase(createEmployeeAsyncThunk.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployeeAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployeeAsyncThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload.id;
        if (id) {
          state.employeesData = state.employeesData.filter((emp) =>
            emp.id === id ? action.payload : emp
          );
        }
      })
      .addCase(updateEmployeeAsyncThunk.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeAsyncThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload.id;
        if (id) {
          state.employeesData = state.employeesData.filter((emp) =>
            emp.id !== id 
          );
        }
      })
      .addCase(deleteEmployeeAsyncThunk.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default employeeSlice.reducer;

export const {searchEmployee} = employeeSlice.actions



