import Task from '../../../models/Task'
import dbConnect from '../../../utils/dbConnect'



export default async function handler (req,res) {
    const {method} = req;

    //Conexión a la base de datos
    await dbConnect();

    //Creación de tarea
    if(method === "POST") {
        try {
            // const {title, complete, color} = req.body
            // if((!title,!complete,!color)) {throw "invalid data"}
            // const newTask = await Task.create({title,complete,color})
            // return res.status(201).json({sucess: true, data :newTask})

            const newTask = await new Task(req.body).save();
            console.log(newTask)
            res.status(201).json({data: newTask, message: "Tarea creada correctamente"})
        
            } catch(err) {
            res.status(500).json({message: "Error en el server"})
            console.log(err)
        }
    }

    if(method === "GET") { 
        try {
            const getTasks = await Task.find() 
            res.status(200).json({data:getTasks})

        } catch (error) {
            res.status(500).json({message: "Error en el server"})
            console.log(err)
            
        }


    }
    }







