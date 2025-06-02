import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Button, Form, Input, Typography, Select } from "antd";
import type { FormProps } from "antd";
import { useGetRegionsQuery } from "../redux/api/region.api";
import { useRegisterAuthMutation } from "../redux/api/auth.api";
const { Title } = Typography;

type FieldType = {
  email?: string;
  firstname?: string;
  lastname?: string;
  regionId?: string;
  password?: string;
  img?: string;
};

const Register = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const { data } = useGetRegionsQuery({});
  const options = data?.data?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
  const [registerAuth, {isLoading}] = useRegisterAuthMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // 1.
    values.img = "https://"
    registerAuth(values)
      .unwrap()
      .then(res => {
        console.log(res);
      })

    // 2.
    // axios
    //   .post("url", values)
    //   .then()

    // 3.
    // fetch("url", {
    //   method: "POST",
    //   headers: {
    //     "content-ty"
    //   },
    //   body: values
    // })

    // 4. XMLRequest
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-[340px] w-full">
        <Title level={3}>Register</Title>
        <Form
          name="basic"
          initialValues={{ email }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="First name"
            name="firstname"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Last name"
            name="lastname"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Region"
            name="regionId"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Select
              placeholder="Select region"
              // onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button loading={isLoading} className="w-full" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(Register);
