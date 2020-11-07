import React, {useContext} from "react";
import { Tabs, Layout } from 'antd';
import {GroupNotesTab} from "./group-notes";
import {ContentNotesTab} from "./content-notes";
import './style.css';
import {GeneralNotesTab} from "./general-notes";
import {AnalyticsPage} from "./analytics";
import { AppContext } from '../../services/AppContext';

const { TabPane } = Tabs;
const { Content } = Layout;

function callback(key) {

}

// Всегда быстрее использовать UI фреймворк и кастомизировать.
// Но, в данной ситуации центрирование полоски выделения под выбранной вкладкой - костыль, работающий только на основе динных названий вкладок
// В таких случаях нужно искать компромисс. Если принципиально, чтобы полоска была по центру - тратить время на разработку и отладку
// Если в приоритете стабильность и скорость разработки - принять вариант из коробки: выравнивание по левому краю (ширина управляется в CSS)
// К сожалению, не все можно кастомизировать. Только если пишешь с полного нуля, а это всегда дольше и дороже
export const PageContent = () => {
    const { menuIndex } = useContext(AppContext);

    return (
        <Content className={'content container'}>
            {
                +menuIndex === 2 ?
                <Tabs defaultActiveKey="1" onChange={callback} size={'large'}>
                    <TabPane tab="Глобальные объявления" key="1">
                        <GeneralNotesTab />
                    </TabPane>
                    <TabPane tab="Отправить на группу" key="2">
                        <GroupNotesTab />
                    </TabPane>
                    <TabPane tab="Контент-уведомления" key="3">
                        <ContentNotesTab />
                    </TabPane>
                </Tabs>
                    :
                <AnalyticsPage />
            }
        </Content>
    );
}