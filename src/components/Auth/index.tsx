import { Input } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";

import * as s from "./style.module.scss";
import { redirect } from "react-router-dom";
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
  const apiTest = async () => {
    console.log("called");

    await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: "test__user", password: "qwezxc" }),
    }).then(async (res) => {
      if (res) {
        let result = await res.json();
        if (result?.result?.token) {
          localStorage.setItem("token", result?.result?.token);
        }
      }
    });
  };



  return (
    <div className={s.container}>
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
          onClick={apiTest}
          disabled={username.length === 0 || password.length === 0}
          type="primary"
          size="large"
          icon={<AntDesignOutlined />}
        >
          login
        </Button>
      </ConfigProvider>
    </div>
  );
};
export default Auth;
