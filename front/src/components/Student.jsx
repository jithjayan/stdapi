

import { useEffect, useState } from "react"
import axios from 'axios'
import Add from "./Add"

function Student(){
    const [data,setData]=useState([])
    const [editing,setEditing]=useState(false)
    const [editStudents,setEditStudents]=useState({id:'',roll_no:'',name:'',age:'',email:'',ph:''})
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/task/').then(res=>{
            console.log(res.data);
            setData(res.data)
        }).catch(error=>console.log(error.message))
    },[])

    
    const edittask =(task)=>{
        setEditing(true)
        setEditStudents(task)
    }
    const updateStudents=(id,task)=>{
        setEditing(false)
        axios.put(`http://127.0.0.1:8000/api/task/${id}/`,task).then(res=>{
            setData(data.map(prv=>(prv.id===id?res.data:prv)))
        }).catch(error=>console.log(error.message))
    }

    const deleteStd=(id)=>{
        setEditing(false)
        axios.delete(`http://127.0.0.1:8000/api/task/${id}/`).then((res)=>{
            setData(data.filter((tasks)=>(tasks.id!==id)))
        }).catch(error=>console.log(error.messsage))
    }
    return(
        <>
        <div className="container">
        <table className="table">
            <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Phone</th>

                </tr>
            </thead>
            <tbody>
                {data.map((value,index)=>(
                    <tr key={index}>
                        <td>{value.roll_no}</td>
                        <td>{value.name}</td>
                        <td>{value.age}</td>
                        <td>{value.email}</td>
                        <td>{value.ph}</td>
                        <td><button onClick={()=>{edittask(value)}} className="btn btn-outline-primary">Edit</button></td>
                        <td><button onClick={()=>{deleteStd(value.id)}} className="btn btn-outline-danger">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {editing ? <EditForm curTask={editStudents} updatetask={updateStudents}/>:<Add/>}
        </div>
        </>
    )
}
const EditForm=({curTask,updatetask})=>{
    console.log('EditForm',curTask);
    const [task,setTask]=useState(curTask)

    const handleChange=(e)=>{
        const {name,value}=e.target
        setTask({...task,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        updatetask(task.id,task)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="number" name="roll_no" id="roll_no" value={task.roll_no} onChange={handleChange}/>
            <input type="text" name="name" id="name" value={task.name} onChange={handleChange}/>
            <input type="number" name="age" id="age" value={task.age} onChange={handleChange}/>
            <input type="email" name="email" id="email" value={task.email} onChange={handleChange}/>
            <input type="number" name="phone" id="phone" value={task.ph} onChange={handleChange}/>
            <input type="submit" value="update" className="btn btn-outline-primary" />
        </form>
        </>
    )
}

export default Student