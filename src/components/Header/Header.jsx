import logo from '../../logo.svg';
import { Typography, Avatar, Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './Header.css';

const { Text } = Typography;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="/">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="/">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="/">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);

export const Header = () => (
  <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div className={'header__right-side'}>
          <Text>Severstal\av.baruzdin</Text>
          <Avatar className={'avatar'} size={44}>AB</Avatar>
          <Dropdown overlay={menu}>
              <a href='/' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <CaretDownOutlined />
              </a>
          </Dropdown>
      </div>
  </header>
);