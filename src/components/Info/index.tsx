import { Input, Table, TableProps } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";
import * as s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, setInfoState } from "../../services/store/infoSlice";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { formatOrders } from "../../services/utils/formatOrders";
import InfoDetail from "../InfoDetail";

const Info = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const infoData = useAppSelector((state) => state.info.orders);
  const [orders, serOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalItems] = useState<number>(1);
  const [defaultPageSize, setDefaultPageSize] = useState<number>(11);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "driverData",
      dataIndex: "driverData",
      key: "driverData",
    },
    {
      title: "actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const onPageChange = async (e) => {
    await loadData(e);
  };

  const createTableSource = (orders) => {
    let dataSource: any = [];
    orders.forEach((item) => {
      dataSource.push({
        key: item.uuid,
        date: item.date,
        destination_address: item.destination_address,
        driverData: item.driver_data?.driver_name ?? "Без имени",
        status: item.status,
        actions: (
          <button
            onClick={() => {
              dispatch(setInfoState(item));
            }}
          >
            Подробнее
          </button>
        ),
      });
    });
    serOrders(dataSource);
  };

  const loadData = async (page) => {
    let data = await API.getOrderTrips(page);
    if (data) {
      if (data?.page_data?.total_items)
        setTotalItems(data?.page_data?.total_items);
      const formattedOrders = formatOrders(data.orders);
      createTableSource(formattedOrders);
    }
  };

  useEffect(() => {
    if (!API.isAuthorized()) return navigate("/login", { replace: true });
    loadData(1);
  }, []);
  return (
    <div className={s.container}>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{
          total: totalPages,
          defaultPageSize: defaultPageSize,
          showSizeChanger: false,
          onChange: onPageChange,
        }}
      />
      <InfoDetail />
    </div>
  );
};
export default Info;
