import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    task: { 
        type: String, 
        required :true },

    completed: { 
        type: Boolean,
        default: false }
    
    // color: {
    //     type:String, 

    // }

})

export default mongoose.models.Task || mongoose.model("Task", TaskSchema)