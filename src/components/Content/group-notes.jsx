import React from "react";
import {Empty, Button, Card, notification} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './style.css';

const openNotification = () => {
    notification.open({
        message: 'Внимание!',
        description:
            'Отправлено на группу 1',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
};

export const GroupNotesTab = () => (
    <div className={'tab__container'}>
        <Card>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{height: 60}}
                description={ <span>Что такое <a href="#API">группы</a></span> }
            >
                <Button type="primary" onClick={openNotification}>Отправить сейчас</Button>
            </Empty>
        </Card>
    </div>
);