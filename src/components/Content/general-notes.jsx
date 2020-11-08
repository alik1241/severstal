import React, { useState } from 'react';
import {Row, Col, Layout, Form, Input, Button, Upload, Typography, notification} from 'antd';
import { DownloadOutlined, CloseOutlined, SmileOutlined } from '@ant-design/icons';
import mobile_bg from '../../img/mobile_bg.svg';
import './style.css';

const { Content } = Layout;
const { Text } = Typography;

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const openNotification = () => {
    notification.open({
        message: 'Внимание!',
        description:
            'Уведомление создано!',
        icon: <SmileOutlined style={{ color: '#63e910' }} />,
    });
};

const props = {
    name: 'file',
    accept: '.png',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //     authorization: 'authorization-text',
    // },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
};

// К вопросу о компромисах дизайна. Данная функция из коробки подключается за 5 секунд для всех полей с помощью allowClear
// Но из-за кастомной иконки в дизайне и невозможности подменить иконку в фреймворке - пришлось собирать свой велосипед и это доп. время
const renderSuffix = (inputValue, clearCallback, textArea) => {
    return inputValue !== '' ? <CloseOutlined className={`clear-icon ${textArea ? 'textarea-clear' : ''}`} onClick={() => clearCallback('')} /> : <span />;
}

export const GeneralNotesTab = () => {
    const [noteName, setNoteName] = useState('');
    const [noteText, setNoteText] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [errorList, setErrorList] = useState([]);
    const [uploadedData, setUploadedData] = useState({});
    const [previewImage, setPreviewImage] = useState('');
    const [form] = Form.useForm();

    const validate = (form) => {
        const fields = form.getFieldsValue();
        const errorList = Object.keys(fields).filter(key => !fields[key]);
        setErrorList(errorList);

        return !!errorList.length;
    }

    const removeFile = () => {
        setPreviewImage('');
        setImgUrl('');
        setUploadedData({});
    }

    const handleChange = async uploadedData => {
        // Странное поведение onRemove. Без этого условия оно не сработает!
        // Так же не дадим грузить больше 1 файла за 1 раз
        if (uploadedData.fileList.length > 0) {
            const file = uploadedData.file;

            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }

            // setPreviewImage(file.url || file.preview);
            setPreviewImage(file.preview);
            setImgUrl(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            setUploadedData(uploadedData);
        }
    };

    const setInput = (e, setter) => {
        setter(e.target.value);
        const index = errorList.indexOf(e.target.name);

        if (errorList.length > 0 && index !== -1) {
            errorList.splice(index, 1);
            setErrorList(errorList);
        }
    }

    const clearFormField = (name) => {
        const fields = form.getFieldsValue();
        fields[name] = '';
        form.setFieldsValue(fields);
    }

    const submit = () => {
        if (!validate(form)) {
            openNotification();
        }
    }

    return (
        <Content className={'content tab__container'}>
            <Text className={'tab__title'}>Информация</Text>
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{ layout: 'vertical' }}
                // onFinish={validate}
            >
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={16}>
                        <Form.Item
                            label="Название уведомления"
                            name={'noteName'}
                        >
                            <Input
                                name={'noteName'}
                                placeholder="Укажите текст заголовка"
                                className={`input ${errorList.includes('noteName') ? 'error' : ''}`}
                                size={'large'}
                                value={noteName}
                                onChange={(e) => setInput(e, setNoteName)}
                                suffix={
                                    renderSuffix(
                                        noteName,
                                        () => {
                                            setNoteName('');
                                            clearFormField('noteName');
                                        }
                                     )
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={16}>
                        <Form.Item
                            label="Текст уведомления"
                            name={'noteText'}
                        >
                            <Input.TextArea
                                name={'noteText'}
                                rows={4}
                                placeholder="Введите текст уведомления"
                                className={`input textarea ${errorList.includes('noteText') ? 'error' : ''}`}
                                size={'large'}
                                value={noteText}
                                onChange={(e) => setInput(e, setNoteText)}
                            />
                        </Form.Item>
                        { renderSuffix(
                            noteText,
                            () => {
                                setNoteText('');
                                clearFormField('noteText');
                            },
                            true
                            )
                        }
                    </Col>
                </Row>

                <Row gutter={[16, 24]} wrap>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Прикрепить изображение"
                            name={'imgUrl'}
                        >
                            <Input
                                name={'imgUrl'}
                                placeholder="Укажите прямую ссылку на изображение"
                                className={`input ${errorList.includes('imgUrl') ? 'error' : ''}`}
                                size={'large'}
                                value={imgUrl}
                                onChange={(e) => setInput(e, setImgUrl)}
                                suffix={
                                    renderSuffix(
                                        imgUrl,
                                        () => {
                                            setImgUrl('');
                                            clearFormField('imgUrl');
                                        }
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className={'upload__btn-wrap'}>
                            <Form.Item label=" ">
                                <Upload {...props} fileList={uploadedData.fileList} onChange={handleChange} onRemove={removeFile}>
                                    <Button
                                        icon={<DownloadOutlined />}
                                        size={'large'}
                                        className={'upload__button'}
                                        disabled={uploadedData.fileList && uploadedData.fileList.length === 1}
                                    >
                                        Обзор
                                    </Button>
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

                <Row>
                    <Col className="gutter-row" span={12}>
                        <Form.Item label="Предпростмотр">
                            <div className={'note__sample'}>
                                <img src={mobile_bg} className="mobile_bg" alt="" />
                                <div className={'note__card'}>
                                    <div className={'note__img'}>
                                        {previewImage && <img alt="" style={{width: 64, height: 64}} src={previewImage}/> }
                                    </div>
                                    <div className={'note__title-wrap'}>
                                        <div className={'note__title'}>{noteName || 'Укажите текст заголовка'}</div>
                                        <div className={'note__subtitle'}>{noteText || 'Ведите текст уведомления'}</div>
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row send__button-wrap" span={12}>
                        <Form.Item label=" ">
                            <Button
                                onClick={() => submit()}
                                size={'large'}
                                className={'send__button'}
                            >
                                Отправить
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Content>
    );
}