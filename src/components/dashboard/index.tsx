import React from 'react';
import {observer} from "mobx-react-lite";
import useStore from '@/libs/hooks/useStore'

const Dashboard = () => {
    const {boards} = useStore()

    console.log()

    return (
        <div className={'app'}>
            {boards.active?.sections(section => console.log(section))}
            qwe
        </div>
    );
};

export default Dashboard;