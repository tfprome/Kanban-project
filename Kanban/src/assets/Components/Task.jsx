import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 5px 5px 5px 2px grey;
    padding: 12px;
    color: #000;
    margin-bottom: 10px;
    min-height: 140px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${(props) => bgcolorChange(props)};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 6px;
`;

const TaskContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TaskId = styled.small`
    color: #666;
    font-size: 0.8rem;
`;

const TaskTitle = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
`;

const TaskDescription = styled.div`
    font-size: 0.9rem;
    color: #444;
`;

const DueDate = styled.div`
    font-size: 0.8rem;
    color: ${props => {
        if (!props.$dueDate) return '#666';
        const due = new Date(props.$dueDate);
        const today = new Date();
        return due < today ? '#ff4444' : '#666';
    }};
`;

function bgcolorChange(props) {
    return props.$isDragging
        ? "lightgreen"
        : props.$isDraggable
            ? props.$isBacklog
                ? "#F2D7D5"
                : "#DCDCDC"
            : props.$isBacklog
                ? "#F2D7D5"
                : "#EAF4FC";
}

const Task = ({ task, index, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate || ''
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({ ...prev, [name]: value }));
    };

    const saveEdit = () => {
        onUpdate(task.id, editedTask.title, editedTask.description, editedTask.dueDate);
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    $isDragging={snapshot.isDragging}
                    $isDraggable={true}
                    $isBacklog={task.column === "4"}
                >
                    {isEditing ? (
                        <>
                            <input
                                name="title"
                                value={editedTask.title}
                                onChange={handleEditChange}
                                placeholder="Task title"
                                style={{ marginBottom: '5px' }}
                            />
                            <textarea
                                name="description"
                                value={editedTask.description}
                                onChange={handleEditChange}
                                placeholder="Task description"
                                rows="3"
                                style={{ marginBottom: '5px' }}
                            />
                            <input
                                type="date"
                                name="dueDate"
                                value={editedTask.dueDate}
                                onChange={handleEditChange}
                                style={{ marginBottom: '5px' }}
                            />
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button className='btn btn-success' onClick={saveEdit}>Save</button>
                                <button className='btn btn-danger'onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <TaskContent onClick={() => setIsEditing(true)}>
                                <TaskId>#{task.id}</TaskId>
                                <TaskTitle>{task.title}</TaskTitle>
                                {task.description && (
                                    <TaskDescription>{task.description}</TaskDescription>
                                )}
                                <DueDate $dueDate={task.dueDate}>
                                    Due: {task.dueDate || "No deadline"}
                                </DueDate>
                            </TaskContent>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                style={{ 
                                    background: '#ff4444',
                                    color: 'white',
                                    border: 'none',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    alignSelf: 'flex-end'
                                }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;