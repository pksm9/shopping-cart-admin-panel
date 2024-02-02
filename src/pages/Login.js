import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Typography } from "antd";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/Mutations";
import { Auth } from '../utils/auth';

export default function Login(props) {
  const navigate = useNavigate();

  useEffect(() => {if (Auth.isAuthenticated()) {navigate("/dashboard");}});

  const [signIn, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    update(proxy, result) {
      console.log(result);
      const token = result?.data?.SignIn?.accessToken;
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem(
        "validTill",
        result?.data?.SignIn?.validTill.toString()
      );
      navigate("/dashboard");
    },
  });

  const onFinish = async (values) => {
    try {
      await signIn({
        variables: values,
      });
    } catch (error) {
      console.log("Sign in Failed", error);
    }
  };

  const errorMessage = () => {
    if (!navigator.onLine) {
      return "No internet connection. Please check your network.";
    }

    return error.message.includes("Invalid credentials") ? "Invalid email or password" : error.message;
  }

  useEffect(() => { if (data) navigate("/dashboard"); });

  return (
    <Card style={{width: "26%", margin: "120px auto", padding: "2.4%", boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.15)'}} >
      <Typography.Title
        level={2}
        style={{ marginBottom: "30px", textAlign: "center",marginTop: "0px" }}
        strong
      >
        Login
      </Typography.Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" },
          { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          , message: "" }]}
          style={{ marginBottom: "16px",marginTop: "0px" }}
        >
          <Input size="large" placeholder="eg: abc@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ marginBottom: "32x",marginTop: "0px" }}
        >
          <Input.Password size="large" placeholder="Enter password" />
        </Form.Item>

        <Form.Item >
          <Button size="large" type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }} disabled={loading}>
            LOGIN
          </Button>
        </Form.Item>

        {error && (
          <Typography.Text type="danger" style={{ textAlign: "center", display: "block", marginTop: "10px" }}>
            {errorMessage()}
          </Typography.Text>
        )}
      </Form>
    </Card>
  );
}
