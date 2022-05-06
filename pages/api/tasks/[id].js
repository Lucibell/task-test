import Task from '../../../models/Task'
import dbConnect from '../../../utils/dbConnect'

export default async (req,res)=> {
    const {method} = req;
    const {id} = req.query;

    //Conexión a la base de datos
    await dbConnect();

    //Creación de tarea
    if(method === "PUT") {
        try {
            const updatedTask = await Task.findByIdAndUpdate(id, {$set:req.body} , {new:true})
            res.status(200).json({data:updatedTask, message:"Tarea actualizada correctamente"})
               
        } catch(err) {
            res.status(500).json({message: "Error en el server"})
            console.log(err)
        }
    }

    if(method === "DELETE") { 
        try {
            const deletedTask = await Task.findByIdAndDelete(id) 
            res.status(200).json({message:"Tarea borrada correctamente"})


        } catch (err) {
            res.status(500).json({message: "Error en el server"})
            console.log(err)
            
        }


    }
    }