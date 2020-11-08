import React, { useState, useContext } from 'react';
import { Menu, Layout} from 'antd';
import analytic_icon from '../../img/analytic_icon.svg';
import analytic_active_icon from '../../img/analytic_active_icon.svg';
import push_icon from '../../img/push_icon.svg';
import push_active_icon from '../../img/push_active_icon.svg';
import { AppContext } from '../../services/AppContext';
import './LeftMenu.css';

const { Sider } = Layout;

export const LeftMenu = () => {
    const {menuIndex, setMenuIndex} = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const handleClick = e => {
        setMenuIndex(e.key);
    }

    // Код выбора меню "тупой", но это пример. В идеале иконки вообще выносятся в иконочный шрифт, типа icomoon и подключаются оттуда, а цвет меняется классом
    // Сами меню приходят с бэка или формируются в массиве, а тут перебираются с помощью map и внутри подставляется активный класс на основе стейта
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className={'left-menu'} width={300}>
            <Menu theme="light" defaultSelectedKeys={[menuIndex]} mode="inline" onClick={handleClick}>
                <Menu.Item key="1" icon={<img src={+menuIndex === 1 ? analytic_active_icon : analytic_icon} alt="" />}>
                    Аналитика
                </Menu.Item>
                <Menu.Item key="2" icon={<img src={+menuIndex === 2 ? push_active_icon : push_icon} alt="" />}>
                    Уведомления
                </Menu.Item>
            </Menu>
        </Sider>
    );
}