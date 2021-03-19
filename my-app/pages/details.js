import Link from 'next/link';
import {DragDropContext,Droppable, Draggable,resetServerContext} from 'react-beautiful-dnd';
import {useState}  from "react";
import Navbar from "../Components/navbar";
import Treeview from "../Components/treeView";
import styles from '../styles/Home.module.css';


export default function Details({ownersList}) {
    const [files,updateCharacters] = useState(ownersList)
    function handleOndragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(files);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateCharacters(items);
    }
        resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  
  return (
    <div className={styles.container}>
        <header>
        <Navbar/>
        <main className={styles.main}>
        <Treeview/>
            <DragDropContext onDragEnd={handleOndragEnd}>
                <Droppable droppableId="files">
                    {(provided) => (
                        <ul className="listform" {...provided.droppableProps} ref={provided.innerRef}>
                            {ownersList.map(({id,type,ownerName}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                        <div key={index}>
                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <Link as={`/${type}/${ownerName}`} href="/[files]/[info]">
                                            <a>
                                                {type}
                                            </a>
                                        </Link>
                                        </li>
                                        </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
      </header>
    </div>
  );
}

Details.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/information');
  const ownersList = await response.json();
  return {ownersList: ownersList};
}