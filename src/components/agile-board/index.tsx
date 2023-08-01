import React, {useState} from 'react';
import {useDND} from '@/libs/hooks/useDND'


export const EasyMain = () => {
    interface ICardItem {
        id: number,
        order: number,
        text: string
    }

    const {
        list,
        current,
        dragStartHandler,
        dragLeaveHandler,
        dragEndHandler,
        dragOverHandler,
        dragDropHandler
    } = useDND([
        {id: 1, order: 1, text: 'Card 1'},
        {id: 2, order: 2, text: 'Card 2'},
        {id: 3, order: 3, text: 'Card 3'},
        {id: 4, order: 4, text: 'Card 4'},
    ])

    return (
        <div className={'app'}>
            {list.sort((a, b) => (a.order > b.order ? 1 : -1)).map(card =>
                <div
                    onDragStart={(e) => dragStartHandler(e, card)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dragDropHandler(e, card)}
                    draggable={true}
                    className={'card'}
                >
                    {card.text}
                </div>
            )}
        </div>
    );
}

const Main: React.FC = () => {
    interface IItem {
        id: number,
        title: string
        text?: string
    }

    interface IBoard {
        id: number,
        title: string,
        items: IItem[]
    }

    const boardsData = [
        {id: 1, title: 'To Do', items: [{id: 1, title: 'Text 1'}, {id: 2, title: 'Text 2'},]},
        {id: 2, title: 'In Progress', items: [{id: 5, title: 'Text 5'}, {id: 6, title: 'Text 6'},]},
        {id: 3, title: 'Complete', items: [{id: 7, title: 'Text 7'},]},
    ]

    const [boards, setBoards] = useState<IBoard[]>(boardsData)
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null)
    const [currentItem, setCurrentItem] = useState<IItem | null>(null)



    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IItem) => {
        setCurrentBoard(board)
        setCurrentItem(item)

    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.target.style.boxShadow = 'none'
    }

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {

    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }

    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IItem) => {
        e.preventDefault()
        e.target.style.boxShadow = 'none'

        // const currentIndex = currentBoard?.items.indexOf(currentItem!)
        // currentBoard?.items.splice(currentIndex!, 1)
        // const dropIndex = board.items.indexOf(item)
        // board?.items.splice(dropIndex + 1, 0, currentItem!)
        //
        // setBoards(setBoardsFunc(board))
    }

    const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
        board.items.push(currentItem!)
        const currentIndex = currentBoard?.items.indexOf(currentItem!)
        currentBoard?.items.splice(currentIndex!, 1)

        setBoards(setBoardsFunc(board))
    }

    const setBoardsFunc = (board: IBoard) => {
        return boards.map(b => {
            if (b.id === board.id) {
                return board
            }

            if (b.id === currentBoard?.id) {
                return currentBoard
            }
            return b
        })
    }


    return (
        <div className={'app'}>
            {boards.map((board: IBoard) =>
                <div
                    className={'board'}
                    key={`boardId=${board.id}`}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >
                    <div className="board_title">{board.title}</div>
                    {board.items.map((item: IItem) =>
                        <div
                            key={`itemId${item.id}`}
                            className={'item'}
                            draggable={true}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default Main;