import React from 'react';
import { styled } from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 8px;
    width: 280px;
    flex: 1 1 300px;
    height: 500px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid #ddd;
    margin-top: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Title = styled.h3`
    padding: 12px;
    background-color: ${props => {
        switch(props.$columnId) {
            case '1': return '#ffb3ba'; // To Do
            case '2': return '#baffc9'; // Done
            case '3': return '#ffdfba'; // In Review
            case '4': return '#bae1ff'; // Backlog
            default: return 'pink';
        }
    }};
    text-align: center;
    margin: 0;
    position: sticky;
    top: 0;
    z-index: 1;
    border-radius: 8px 8px 0 0;
`;

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.$isDraggingOver ? '#e3e3e3' : '#f4f5f7'};
    flex-grow: 1;
    min-height: 100px;
    height: calc(100% - 44px);
    overflow-y: auto;
`;

const Column = ({ onDelete, onUpdate, title, tasks, id }) => {
    return (
        <Container>
            <Title $columnId={id}>{title}</Title>
            <Droppable droppableId={String(id)}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        $isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task 
                                key={task.id} 
                                task={task} 
                                index={index} 
                                onDelete={onDelete} 
                                onUpdate={onUpdate} 
                            />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
};

export default Column;