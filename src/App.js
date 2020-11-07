import React, { useState } from 'react';
import { Layout } from 'antd';
import { AppContext } from './services/AppContext';
import { Header } from "./components/Header/Header";
import { PageContent } from "./components/Content";
import {LeftMenu} from "./components/LeftMenu/LeftMenu";
import './App.css';

export default function App() {
    const [menuIndex, setMenuIndex] = useState(1);

    // Вместо тяжелого редакса, думаю, здесь предпочтителен контекст.
    // Во всяком случае для задачи переключения страниц - его сейчас более, чем достаточно!
    return (
        <AppContext.Provider value={{menuIndex, setMenuIndex}}>
            <Layout>
                <Header />
                <Layout>
                    <LeftMenu />
                    <PageContent />
                </Layout>
            </Layout>
        </AppContext.Provider>
    );
}
