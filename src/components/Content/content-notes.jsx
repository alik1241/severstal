import React from "react";
import { Badge, Card } from 'antd';
import './style.css';

export const ContentNotesTab = () => (
    <div className={'tab__container'}>
        <Badge.Ribbon text="Контент уведомления">
            <Card>Какое-то уведомление</Card>
        </Badge.Ribbon>
    </div>
);