import React from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'react-uuid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
class  App extends React.Component{

  state={
    currentTask:'',
    tasks:[]

  }

  handleChange=(e)=>{
    //console.log(" VALUE ",e.target.value)

    this.setState({currentTask:e.target.value});
    console.log("STATE ",this.state.currentTask)
  }

  handleDelete=(id)=>{
    const task = this.state.tasks.filter(t => t.id ==id);
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure you want to delete ${task[0].title}`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const tasks = this.state.tasks.filter(t => t.id != id);
      this.setState({tasks: tasks});
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });

  }

 createTask =async ()=>{
   const id = uuid();
   const task= {};
   task.title = this.state.currentTask;
   task.id = id;
   const copytasks = this.state.tasks.concat(task);
   await this.setState(prev=>{prev.tasks = copytasks});

  //alert(`Your tasks ${this.state.tasks}`);
  console.log("DISPLAYING TASKS ",this.state.tasks.length)
   this.state.tasks.forEach(t => console.log(t))
   this.setState({currentTask:''})
   

 }

 displayTasks = ()=>{
   
   return this.state.tasks.map((task, index)=>{
    console.log("displaying ",task)
      return <p key={index}><a href="#" style={{marginRight:'5px'}}>{task.title}</a> <button style={{borderColor:'blue', borderRadius:'5px', marginRight:'3px', backgroundColor:'blue', color:'white'}}>Update</button><button onClick={() =>this.handleDelete(task.id)} style={{borderColor:'blue',borderRadius:'5px', backgroundColor:'blue', color:'white'}}>Delete</button></p>
   })
 }
  
 render(){
    return (
      <>
      <div className="App">
       <h1>Welcome to Mai's Notebook</h1>
      <div style={{margin:'10px', color:'blue'}}>
        <label>Task: </label>
        <input value={this.state.currentTask} onChange={this.handleChange} type='text' placeholder='Enter a new task' style={{width:'300px', borderRadius:'5px',border:'1px solid blue'}}/>
        <button onClick={this.createTask} style={{marginLeft:'5px',borderRadius:'10px',backgroundColor:'blue',color:'white'}}>Create</button>
      </div>
      </div>
      <div style={{marginLeft:'10px', color:'blue', fontSize:'20px'}}><h1> Your tasks:</h1>
      {this.displayTasks()}
      </div>
      </>
      
    );
  }

}

export default App;
