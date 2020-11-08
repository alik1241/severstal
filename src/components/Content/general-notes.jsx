import React, { useState } from 'react';
import { Row, Col, Layout, Form, Input, Button, Upload, message, Typography } from 'antd';
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import mobile_bg from '../../img/mobile_bg.svg';
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

const setInput = (e, setter) => {
    setter(e.target.value);
}

//allowClear
const renderSuffix = (inputValue, clearCallback, textArea) => {
    return inputValue !== '' ? <CloseOutlined className={`clear-icon ${textArea ? 'textarea-clear' : ''}`} onClick={() => clearCallback('')} /> : <span />;
}

export const GeneralNotesTab = () => {
    const [noteName, setNoteName] = useState('');
    const [noteText, setNoteText] = useState('');
    const [imgUrl, setImgUrl] = useState('');
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
                            <Input
                                placeholder="Укажите текст заголовка"
                                className={'input'}
                                size={'large'}
                                value={noteName}
                                onChange={(e) => setInput(e, setNoteName)}
                                suffix={renderSuffix(noteName, setNoteName)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={16}>
                        <Form.Item label="Текст уведомления">
                            <TextArea
                                rows={4}
                                placeholder="Введите текст уведомления"
                                className={'input textarea'}
                                size={'large'}
                                value={noteText}
                                onChange={(e) => setInput(e, setNoteText)}
                            />
                            { renderSuffix(noteText, setNoteText, true) }
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 24]} wrap>
                    <Col className="gutter-row" span={12}>
                        <Form.Item label="Прикрепить изображение">
                            <Input
                                placeholder="Укажите прямую ссылку на изображение"
                                className={'input'}
                                size={'large'}
                                value={imgUrl}
                                onChange={(e) => setInput(e, setImgUrl)}
                                suffix={renderSuffix(imgUrl, setImgUrl)}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className={'upload__btn-wrap'}>
                            <Form.Item label=" ">
                                <Upload {...props}>
                                    <Button icon={<DownloadOutlined />} size={'large'} className={'upload__button'}>Обзор</Button>
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
                <div>
                    <img src={mobile_bg} className="mobile_bg" alt="" />
                </div>
            </Form>
        </Content>
    );
}