import React, { useState } from 'react';
import { Row, Col, Layout, Form, Input, Button, Upload, message, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './style.css';

const { Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} Загружено`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} Загрузка оборвалась`);
        }
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
};

export const GeneralNotesTab = () => {
    const [form] = Form.useForm();

    return (
        <Content className={'content tab__container'}>
            <Text className={'tab__title'}>Информация</Text>
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{ layout: 'vertical' }}
            >
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={16}>
                        <Form.Item label="Название уведомления">
                            <Input placeholder="Укажите текст заголовка" allowClear />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={16}>
                        <Form.Item label="Текст уведомления">
                            <TextArea rows={4} placeholder="Введите текст уведомления" allowClear className={'input textarea'} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 24]} wrap>
                    <Col className="gutter-row" span={13}>
                        <Form.Item label="Прикрепить изображение">
                            <Input placeholder="Укажите прямую ссылку на изображение" allowClear />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <div className={'upload__btn-wrap'}>
                            <Form.Item label=" ">
                                <Upload {...props}>
                                    <Button icon={<DownloadOutlined />}>Обзор</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item label=" ">
                            <span className={'upload__note'}>
                                Значок в высоком  разрешении
                                <br/>512х512 px; 32-разрядный PGN
                            </span>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Content>
    );
}