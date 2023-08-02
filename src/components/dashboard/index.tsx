import React from 'react';
import {observer} from "mobx-react-lite";
import useStore from '@/common/hooks/useStore'
import {Spin} from "antd";
import {IDashboardSection, IDashboardTask} from "@/common/interfaces";

const Dashboard = () => {
    const {users, boards} = useStore()

    return (
        <div className={'dashboard'}>
            {boards.active?.sections.map((section) =>
                <DashboardSection key={section.id} {...section}/>
            )}
        </div>
    )
}

export const DashboardSection = (section: IDashboardSection) => {
    return (
        <div className={'section'}>
            <div className={'text-2xl'}>{section.title}</div>
            {section.tasks.map((task: IDashboardTask) =>
                <DashboardItem key={task.id} {...task}/>
            )}
        </div>
    )
}

export const DashboardItem = (task: IDashboardTask) => {
    return (
        <div className={'task'}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.assignee.name}</div>
        </div>
    )
}

export default observer(Dashboard);