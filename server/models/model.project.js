const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du projet est requis'],
    trim: true,
    maxlength: [100, 'Le nom du projet ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La description du projet ne peut pas dépasser 500 caractères']
  },
  dueDate: {
    type: Date,
    required: [true, 'La date d\'échéance est requise'],
  },
  status: {
    type: String,
    enum: ['Backlog', 'In Progress', 'Completed'],
    default: 'Backlog'
  },
  tasks: [
    {
      title: {
        type: String,
        required: [true, 'Le titre de la tâche est requis'],
        trim: true,
      },
      completed: {
        type: Boolean,
        default: false
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});


projectSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
