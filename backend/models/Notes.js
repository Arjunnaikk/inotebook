import mongoose from 'mongoose';

const NotesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true,
        default:'General'
    },
    Date:{
        type:Date,
        required:Date.now
    },

  });

module.exports = mongoose.model('notes', NotesSchema)