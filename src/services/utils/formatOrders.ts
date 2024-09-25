export const formatOrders = (orders: any) => {
  return orders.map((order: any) => ({
    customer: order.customer,
    date: order.date,
    destination_address: order.destination_address,
    driver_data: order.driver_data,
    status: order.status,
    uuid: order.uuid,
  }));
};
