import React, { type FC, useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import type { FormProps } from 'antd';
import type { ILoginProps, FieldType } from './interface'

const Login: FC<ILoginProps> = (props) => {
    const { children = '登录' } = props;
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([
        {
          value: '0001',
          label: '0919',
        },
        {
          value: '0002',
          label: 'hhhhh',
        },
    ])

    const onOpen = () => {
        setOpen(true)
    }

    const onOk = () => {
        setOpen(false)
    }

    const onCancel = () => {
        setOpen(false)
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div>
            <Button onClick={onOpen}>{children}</Button>
            <Modal
                title="登录"
                open={open}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600, marginTop: 20 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input
                        prefix={
                            <>
                                <UserOutlined style={{ marginInlineEnd: 0 }} />
                                <Select
                                    style={{ padding: 0, borderRight: '1px solid #b1a3a3' }}
                                    size="small" variant="borderless"
                                    suffixIcon={null}
                                    defaultValue="0001"
                                    popupMatchSelectWidth={false}
                                    options={options}
                                    onClick={(e) => {e.stopPropagation()}}
                                />
                            </>
                        }
                        placeholder='用户名'
                    />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='密码' />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;
