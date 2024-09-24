import { Input, Table, TableProps } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";
import * as s from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import API, { getRequest } from "../../services/api";

interface IOrders {}

const Info = () => {
  const navigate = useNavigate();
  const [orders, serOrders] = useState<any[]>([]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'driverData',
      dataIndex: 'driverData',
      key: 'driverData',
    },
  ];

  const loadData = async () => {
    let data = await API.getRequest("v3/orders/trips", 1);
    if (data) {
      let dataSource:any = [];
      data.orders.forEach((item) => {
        dataSource.push({
          key: item.order_id,
          status: item.status,
          date: item.date,
          driverData: item.driver_data?.driver_name,
        });
      });
      serOrders(dataSource)
    }
  };

  console.log('orders', orders);
  

  useEffect(() => {
    if (!API.isAuthorized()) return navigate("/login", { replace: true });
    loadData();
  }, []);
  return (
    <div className={s.container}>
      <Table columns={columns} dataSource={orders} />;
    </div>
  );
};
export default Info;
