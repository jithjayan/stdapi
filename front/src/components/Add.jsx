import {useState } from "react"
import axios from 'axios'
import "./Add.css"
function Add(){
    const [roll_no,setRoll_no]=useState('')
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [email,setEmail]=useState('')
    const [ph,setPh]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/task/',{roll_no,name,age,email,ph}).then((res)=>{
            setRoll_no('')
            setName('')
            setAge('')
            setEmail('')
            setPh('')
        }).catch(error=>console.log(error.message))

}

    return(
            <form onSubmit={handleSubmit} className="frm" >
                <input type="text" name="roll_no" id="roll_no" value={roll_no} placeholder="Roll no" onChange={(e)=>setRoll_no(e.target.value)} />
                <input type="text" name="name" id="name" value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)} />
                <input type="text" name="age" id="age" value={age} placeholder="Age" onChange={(e)=>setAge(e.target.value)} />
                <input type="text" name="email" id="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <input type="text" name="ph" id="ph" value={ph}  placeholder="Phone" onChange={(e)=>setPh(e.target.value)} />
                <input type="submit" value="ADD STUDENT"  className="btn sbtn" />
            </form>
    )
}
export default Add