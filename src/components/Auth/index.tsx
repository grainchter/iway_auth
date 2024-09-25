import { Input } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";

import * as s from "./style.module.scss";
import { redirect, useNavigate } from "react-router-dom";
import API from "../../services/api";
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const Auth = () => {
  const { styles } = useStyle();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = async () => {
    let response = await API.Auth(username, password);

    if (response) navigate("/", { replace: true });
  };

  useEffect(() => {
    if (API.isAuthorized()) return navigate("/", { replace: true });
  }, []);

  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        />
        <Input.Password
          placeholder="input password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          <Button
            onClick={auth}
            disabled={username.length === 0 || password.length === 0}
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
          >
            login
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
};
export default Auth;
