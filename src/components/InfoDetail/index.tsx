import { Input, Table, TableProps } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { CloseOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";
import * as s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import API, { getRequest } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import CONST from "../../services/utils/constants";
import { clearInfoState } from "../../services/store/infoSlice";

const InfoDetail = ({setIsSelected}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const infoData = useAppSelector((state) => state.info.orders);
  console.log("INFO", infoData);

  const backEvent = () => {
    dispatch(clearInfoState());
    setIsSelected(false)
  };

  useEffect(() => {
    if (!API.isAuthorized()) return navigate("/login", { replace: true });
  }, [infoData]);

  return (
    <div className={s.container}>
      <div className={s.action}>
        <button onClick={backEvent}>Назад</button>
      </div>
      <div className={s.wrap}>
        <div className={s.block}>
          <div className={s.title}>Дата</div>
          <div className={s.desctiption}>{infoData?.date}</div>
        </div>
        <div className={s.block}>
          <div className={s.title}>Статус</div>
          <div className={s.desctiption}>
            <div className={s.desctiption}>{infoData?.status}</div>
          </div>
        </div>
        <div className={s.block}>
          <div className={s.title}>Покупатель</div>
          <div className={s.desctiption}>
            Имя: {infoData.customer?.name ?? CONST.defaultEmptyDataMessage}
          </div>
          <div className={s.desctiption}>
            Почта: {infoData.customer?.email ?? CONST.defaultEmptyDataMessage}
          </div>
          <div className={s.desctiption}>
            Телефон: {infoData.customer?.phone ?? CONST.defaultEmptyDataMessage}
          </div>
        </div>
        <div className={s.block}>
          <div className={s.title}>Целевой адрес</div>
          <div className={s.desctiption}>
            <div className={s.desctiption}>
              {infoData?.destination_address ?? CONST.defaultEmptyDataMessage}
            </div>
          </div>
        </div>
        <div className={s.block}>
          <div className={s.title}>Водитель</div>
          <div className={s.desctiption}>
            <div className={s.desctiption}>
              Имя водителя:
              {infoData.driver_data?.driver_name ??
                CONST.defaultEmptyDataMessage}
            </div>
            <div className={s.desctiption}>
              Рейтинг:{" "}
              {infoData.driver_data?.driver_rating ??
                CONST.defaultEmptyDataMessage}
            </div>
            <div className={s.desctiption}>
              Телефон:
              {infoData.driver_data?.driver_phone ??
                CONST.defaultEmptyDataMessage}
            </div>
            <div className={s.desctiption}>
              Машина:
              {infoData.driver_data?.driver_car ??
                CONST.defaultEmptyDataMessage}
            </div>
            <div className={s.desctiption}>
              Цвет машины:
              {infoData.driver_data?.car_color ?? CONST.defaultEmptyDataMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoDetail;
