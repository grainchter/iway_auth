import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// TODO check type by tz
interface ICustomer {
  email: string | null | undefined;
  name: string | null | undefined;
  phone: string | null | undefined;
}

interface IDriver {
  car_color: string | null | undefined;
  driver_car: string | null | undefined;
  driver_name: string | null | undefined;
  driver_phone: string | null | undefined;
  driver_rating: string | null | undefined;
}

interface IOrders {
  customer: ICustomer | {};
  date: string;
  destination_address: string;
  driver_data: IDriver | {};
  status: number;
  uuid: string;
}

interface InfoState {
  orders: IOrders[];
}

const initialState = {
  orders: [],
} satisfies InfoState as InfoState;

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setInfoState: (state, action) => {  
      state.orders = action.payload;
    },
  },
});

export const { setInfoState } = infoSlice.actions;

export const getInfo = (state: RootState) => state.info.orders;

export default infoSlice.reducer;
