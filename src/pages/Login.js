import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../context/AuthContext";
import { Button, Checkbox, Form, Input, Spin, Card, Typography } from "antd";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/Mutations";

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

export default function Login(props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const authDispatch = useAuthDispatch();

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
      authDispatch({ type: "LOGIN" });
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

  //   useEffect(() => {
  //     if (data) {
  //       navigate("/dashboard");
  //     }
  //   }, [data]);

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
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
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
          <Button size="large" type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            LOGIN
          </Button>
        </Form.Item>

        {error && (
          <Typography.Text type="danger" style={{ textAlign: "center", display: "block", marginTop: "10px" }}>
            {error.message}
          </Typography.Text>
        )}
      </Form>
    </Card>
  );
}
