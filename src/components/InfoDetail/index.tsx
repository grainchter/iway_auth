import { Input, Table, TableProps } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";
import * as s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import API, { getRequest } from "../../services/api";
import { useAppSelector } from "../../services/store/hooks";

const InfoDetail = () => {
  const navigate = useNavigate();
  const infoData = useAppSelector((state) => state.info.orders);
  console.log("INFO", infoData);

  useEffect(() => {
    if (!API.isAuthorized()) return navigate("/login", { replace: true });
  }, [infoData]);

  return (
    <div className={s.container}>
      <p>{infoData?.destination_address}</p>
    </div>
  );
};
export default InfoDetail;
