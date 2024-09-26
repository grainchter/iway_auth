import { Spin, Table, TableProps } from "antd";
import { ReactNode, useEffect, useState } from "react";
import * as s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { setInfoState } from "../../services/store/infoSlice";
import { useAppDispatch } from "../../services/store/hooks";
import { formatOrders, formatStatus } from "../../services/utils/formatOrders";
import InfoDetail from "../InfoDetail";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";
import { generateRandomKey } from "../../services/utils/utils";

interface DataType {
  status: string;
  date: string;
  driverData: string;
  actions: ReactNode;
}

const Info = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const window = useWindowDimensions();

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState('')
  const [orders, serOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalItems] = useState<number>(1);
  const [defaultPageSize, setDefaultPageSize] = useState<number>(11);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Cтатус",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Водитель",
      dataIndex: "driverData",
      key: "driverData",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const onPageChange = async (e) => {
    await loadData(e);
  };

  const createTableSource = (orders: any) => {
    let dataSource: any = [];
    orders.forEach((item: any) => {
      dataSource.push({
        key: generateRandomKey(),
        date: item.date,
        destination_address: item.destination_address,
        driverData: item.driver_data?.driver_name ?? "Без имени",
        status: formatStatus(item.status),
        actions: (
          <button
            className={s.detail}
            onClick={() => {
              setIsSelected(true);
              dispatch(setInfoState(item));
            }}
          >
            Подробнее
          </button>
        ),
      });
    });
    serOrders(dataSource);
    setIsLoading(false);
  };

  const loadData = async (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    let data: any = await API.getOrderTrips(page);
    if (data) {
      if (data?.page_data?.total_items)
        setTotalItems(data?.page_data?.total_items);
      const formattedOrders = formatOrders(data.orders);
      createTableSource(formattedOrders);
    }
  };

  const closeSelected = () => {
    setIsSelected(false);
  };

  useEffect(() => {
    if (!API.isAuthorized()) return navigate("/login", { replace: true });
    loadData(currentPage);
  }, []);

  useEffect(() => {
    if (window.width && window.width < 1000) {
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
        {isSelected && <InfoDetail closeSelected={closeSelected} />}
      </div>
    </div>
  );
};
export default Info;
