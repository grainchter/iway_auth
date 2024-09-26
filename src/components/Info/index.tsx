import { Input, Spin, Table, TableProps } from "antd";
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
import { formatOrders, formatStatus } from "../../services/utils/formatOrders";
import InfoDetail from "../InfoDetail";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

const Info = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const window = useWindowDimensions();

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [orders, serOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalItems] = useState<number>(1);
  const [defaultPageSize, setDefaultPageSize] = useState<number>(11);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "status",
      dataIndex: "status",
      key: "status",
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
        status: formatStatus(item.status),
        actions: (
          <button
            onClick={() => {
              setIsSelected(true);
              dispatch(setInfoState(item));
            }}
          >
            {/* <DoubleRightOutlined /> */}
            Подробнее
          </button>
        ),
      });
    });
    serOrders(dataSource);
    setIsLoading(false);
  };

  const loadData = async (page) => {
    setCurrentPage(page);
    setIsLoading(true);
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
    loadData(currentPage);
  }, []);

  console.log("isMobile", isMobile);

  useEffect(() => {
    console.log("window", window.width);

    if (window && window.width < 1000) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);
  }, [window]);
  return (
    <div className={s.container}>
      <div
        className={s.wrap}
        style={{
          gridTemplateColumns:
            isSelected && !isMobile ? "repeat(2, 1fr)" : "1fr",
        }}
      >
        <div
          className={s.tableBlock}
          style={{ display: isMobile && isSelected ? "none" : undefined }}
        >
          {isLoading && <Spin size="large" />}
          {!isLoading && (
            <Table
              className={s.table}
              columns={columns}
              dataSource={orders}
              pagination={{
                total: totalPages,
                defaultPageSize: defaultPageSize,
                showSizeChanger: false,
                current: currentPage,
                onChange: onPageChange,
              }}
            />
          )}
        </div>
        {isSelected && <InfoDetail setIsSelected={setIsSelected}/>}
      </div>
    </div>
  );
};
export default Info;
