import { useState } from "react"
import axios from "axios"
import styles from "../styles/Home.module.css"

const url= "http://localhost:3000/api/tasks"
const status =["Pending", "In Progress", "Done"]

export default function Home(props) {

    const [tasks, setTasks] = useState(props.tasks)
    const [task, setTask] = useState ({task:""})
    // const [complete, setComplete] =useState ({complete : false})
    // console.log(tasks)
   
    const handleOnChange =({currentTarget:input}) =>{
        input.value === ""
        ? setTask({task:""})
        :setTask((prev)=> ({...prev, task:input.value}))
    }

    const editTask =(id)=> {
        const currentTask = tasks.filter ((task)=> task._id === id)
        setTask(currentTask[0])
          
    }

   

    const addTask = async (e) =>{
        e.preventDefault();
      try {
          if (task._id) {
              
              const {data} = await axios.put(url + "/" + task._id, {task:task.task})
              const originalTasks = [...tasks]
              const index =originalTasks.findIndex((t)=> t.id === task._id)
              originalTasks [index] = data.data
              setTasks(originalTasks)
              setTask({task:""})
              console.log(data.message)
          
            } 
          else {
                const {data} = await axios.post(url,task)
                setTasks((prev) => [...prev, data.data]) // como viene del back {data: , message: }
              
                setTask ({task:""})
                console.log(data.message)
                
            }
           
      } catch (error) {
          console.log(error)
      }

    }

    const updateTask = async (id) => {
        try {
            const originalTasks = [...tasks]
            console.log("originalTasks", originalTasks)
            const index = originalTasks.findIndex((t)=> t._id === id)
            const {data} = await axios.put (url + "/" + id, {complete : !originalTasks[index].complete})
            console.log("data", data.data)
            originalTasks [index] = data.data
            setTasks (originalTasks)
            console.log(data.message)

        } catch (error) {
            console.log(error)
       }
    }
    // const updateTask = async (id) => {
    //     try {
           
    //         if (status[0] || status[1]) {
    //             setComplete({complete : false})
    //         }
    //         else{
    //             setComplete ({complete : true})
    //         }
    //         const {data} = await axios.put (`url${"/"}${id}`, task,  complete )
    //         console.log(data)
    //         // console.log(data.message)
        

    //     } catch (error) {
    //         console.log(error)
            

    //     }


    // }

   
    const deleteTask = async (id) => {
        try {
            const {data} = await axios.delete (url +"/" +id)
            setTasks((prev) => prev.filter((task) => task._id !== id))
            console.log (data.message)
    } 
        catch (error) {
            console.log(error)
    
}

    }
    
    return (
        <main className = {styles.main}>
            <h1 className ={styles.heading} > TO-DO List</h1>
            <div className={styles.container}>
                <form onSubmit= {addTask} className ={styles.form_container}>
                   <input 
                   className={styles.input}
                   type="text"
                   placeholder="Ingrese tarea"
                   onChange={handleOnChange}
                   value={task.task}
                        
                   />
                <button type="submit" className={styles.submit_btn}>
                    {task._id ? "Editar" : "Agregar" }

                </button>
                </form>
                <ul>
                {tasks.map((task)=> (
                    <div className={styles.task_container} key={task._id}>
                        <li
                        className={styles.check_box}
                        onChange= {() => updateTask(task._id)}
                        />

                       <p className = {
                           task.complete ? styles.task_text +"" + styles.line_through
                           :styles.task_text
                       }>{task.task} </p> 
                       
                       <button onClick={()=> editTask(task._id)} className ={styles.edit_task}>Editar</button>
                       <button onClick={()=> deleteTask(task._id)}className ={styles.remove_task}>Borrar</button>
                       <select onChange= {() => updateTask(task._id)}  className ={styles.edit_task} >Status 
                       
                       {status.map((e, index) => 
                       <option key={index}>{e}</option>)}

                        </select>



                    </div>
                ))}
                </ul>
               
                  
                {tasks.length === 0 && <h2 className = {styles.no_tasks}>No hay tareas</h2>}
            </div>
        </main>
    )
}
// &#9998; &#10006;
export const getServerSideProps = async() => {
    const {data} = await axios.get(url)
    return {
        props:{
            tasks:data.data
        }
    }
}
