import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from '../context/AuthContext';
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { gql, useMutation } from "@apollo/client";
import {USER_DATA} from '../graphql/Mutations'

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

export default function Login(props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const authDispatch = useAuthDispatch();

  const [signIn, { loading, error, data }] = useMutation(USER_DATA, {
    update(proxy, result) {
      console.log(result);
      const token = result?.data?.SignIn?.accessToken;
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("validTill", result?.data?.SignIn?.validTill.toString());
      navigate("/dashboard");
      authDispatch({ type: 'LOGIN' });
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
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
        wrapperCol={{ offset: 2, span: 18 }}
      >
        <Input placeholder="eg: abc@gmail.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          {loading ? <Spin /> : ""}
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
