import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const KanbanBoard = (props) => {
   const [incomplete, setIncomplete] = useState([]);
   const [completed, setCompleted] = useState([]);
   const [backlog, setBacklog] = useState([]);
   const [inReview, setInReview] = useState([]);
   const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      column: "1", 
      dueDate: ""   
   });

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
         .then((response) => response.json())
         .then((json) => {
            // Add empty descriptions to mock data
            const withDescriptions = json.map(task => ({
               ...task,
               description: task.title + " description" // Mock description
            }));
            setCompleted(withDescriptions.filter((task) => task.completed));
            setIncomplete(withDescriptions.filter((task) => !task.completed));
         });
   }, []);

   const addTask = () => {
      const task = {
         id: Date.now().toString(),
         title: newTask.title,
         description: newTask.description,
         dueDate: newTask.dueDate, 
         completed: newTask.column === "2",
         column: newTask.column
      };
      
      switch(newTask.column) {
         case "1": setIncomplete([task, ...incomplete]); break;
         case "2": setCompleted([task, ...completed]); break;
         case "3": setInReview([task, ...inReview]); break;
         case "4": setBacklog([task, ...backlog]); break;
      }

      setNewTask({ title: "", description: "", column: "1", dueDate: "" });
   };

   const deleteTask = (taskId) => {
      setIncomplete(incomplete.filter(t => t.id !== taskId));
      setCompleted(completed.filter(t => t.id !== taskId));
      setInReview(inReview.filter(t => t.id !== taskId));
      setBacklog(backlog.filter(t => t.id !== taskId));
   };

   const updateTask = (taskId, newTitle, newDescription, newDueDate) => {
      const updateState = (stateSetter) => {
         stateSetter(prev => prev.map(t => 
            t.id === taskId 
               ? { ...t, title: newTitle, description: newDescription, dueDate: newDueDate }
               : t
         ));
      };
      
      updateState(setIncomplete);
      updateState(setCompleted);
      updateState(setInReview);
      updateState(setBacklog);
   };

   const handleDragEnd = (result) => {
    const { source, destination } = result;
 
    if (!destination) return;
 
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
       return;
    }
 
    const columns = {
       '1': [...incomplete],
       '2': [...completed],
       '3': [...inReview],
       '4': [...backlog]
    };
 
    const sourceTasks = columns[source.droppableId];
    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.column = destination.droppableId;
 
    const destinationTasks = columns[destination.droppableId];
    destinationTasks.splice(destination.index, 0, movedTask);
 
    setIncomplete(columns['1']);
    setCompleted(columns['2']);
    setInReview(columns['3']);
    setBacklog(columns['4']);
 };
 

   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <div style={{ padding: '20px',maxWidth: '1100px', margin: '0 auto', flex:1,flexWrap: "wrap" }}>
            <div style={{ 
               display: 'flex', 
               flexWrap: 'wrap', 
               gap: '10px', 
               marginBottom: '20px',
               padding: '10px',
               background: '#f5f5f5',
               borderRadius: '5px'
            }}>
               <input
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Task title"
                  style={{ padding: '8px', flex: '1 1 200px' }}
               />
               <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Task description"
                  style={{ padding: '8px',  flex: '2 1 300px', minHeight: '40px' }}
               />
               <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  style={{ padding: '6px', flex: '1 1 150px'}}
               />
               <select 
                  value={newTask.column}
                  onChange={(e) => setNewTask({...newTask, column: e.target.value})}
                  style={{ padding: '8px', flex: '1 1 120px',minWidth: '100px'  }}
               >
                  <option value="1">To Do</option>
                  <option value="2">Done</option>
                  <option value="3">In Review</option>
                  <option value="4">Backlog</option>
               </select>
               <button 
                  onClick={addTask}
                  style={{ 
                     padding: '8px 15px', 
                     background: '#4CAF50', 
                     color: 'white', 
                     border: 'none', 
                     borderRadius: '4px',
                     cursor: 'pointer', flex: '1 1 100px', 
                     minWidth: '100px'
                  }}
               >
                  Add Task
               </button>
            </div>
            
            <div style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "flex-start",
               flexDirection: "row",
               gap: "0px",
               width: "100%",
               margin: "0 auto"
            }}>
               <Column title={'To Do'} tasks={incomplete} id='1' onDelete={deleteTask} onUpdate={updateTask}/>
               <Column title={'Finished'} tasks={completed} id='2' onDelete={deleteTask} onUpdate={updateTask}/>
               <Column title={"IN REVIEW"} tasks={inReview} id='3' onDelete={deleteTask} onUpdate={updateTask}/>
               <Column title={"BACKLOG"} tasks={backlog} id='4' onDelete={deleteTask} onUpdate={updateTask}/> 
            </div>
         </div>
      </DragDropContext>
   );
};

export default KanbanBoard;