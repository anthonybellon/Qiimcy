import React, {useState}  from "react";
import {DragDropContext,Droppable, Draggable,resetServerContext} from 'react-beautiful-dnd';
import Link from 'next/link';

// fake data generator
const folderList = [
    {
        id: 'documents',
        route: '/details'
    },
    {
        id: 'downloads',
        route: '/details',
    },
    {
        id: 'Pictures',
        route: '/details',
    },
    {
        id: 'Music',
        route: '/details',
    },
]





export default function App({urllist}) {

    const [files,updateCharacters] = useState(folderList)
    function handleOndragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(files);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCharacters(items);
    }
        resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

    return (
    <div>
        <header>
            <DragDropContext onDragEnd={handleOndragEnd}>
                <Droppable droppableId="files">
                    {(provided) => (
                    <ul className="listform" {...provided.droppableProps} ref={provided.innerRef}>
                        {files.map(({id,route}, index) => {
                            return (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <Link href={`http://localhost:3000${route}`}>
                                            {id}
                                        </Link>
                                    </li>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )}
                </Droppable>
            </DragDropContext>
        </header>
    </div>
    );
}

App.getInitialProps = async () => {
    const response = await fetch('http://localhost:4001/vehicles');
    const urllist = await response.json();
    return {urllist: urllist}
  }
// Put the thing into the DOM!
