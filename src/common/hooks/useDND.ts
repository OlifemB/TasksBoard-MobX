import React, {useState} from 'react';
import {ICardItem} from "@/pages/main";

export const useDND = (propsList:ICardItem[]) => {
    const [list, setList] = useState<ICardItem[]>(propsList)
    const [current, setCurrent] = useState<ICardItem | null>(null)


    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: ICardItem) => {
        console.log(e, card)
        setCurrent(card)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.target.style.background = 'white'

    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {

    }
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.target.style.background = 'lightgray'

    }
    const dragDropHandler = (e: React.DragEvent<HTMLDivElement>, card: ICardItem) => {
        e.preventDefault()
        setList(list.map((c: any) => {
            if (c.id === card.id) {
                return {...c, order: current?.order}
            }

            if (c.id === current?.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        e.target.style.background = 'white'
    }

    return {
        list,
        current,
        dragStartHandler,
        dragLeaveHandler,
        dragEndHandler,
        dragOverHandler,
        dragDropHandler
    }
};