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

export const formatStatus = (status: number) => {
  switch (status) {
    case 0:
      return "Ожидание обработки";
    case 1:
      return "Обработка";
    case 2:
      return "Принято";
    case 3:
      return "Завершённый";
    case 4:
      return "Отменено без штрафа";
    case 5:
      return "Отменено со штрафом";
    case 6:
      return "Неоплаченный";
    case 7:
      return "Измененный";

    default:
      return "Статус не найден";
  }
};