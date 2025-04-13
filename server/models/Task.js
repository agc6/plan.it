const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'bg-blue-200',
  },
  date: {
    type: String, // format: 'YYYY-MM-DD'
    required: true,
  },
  week: {
    type: String, // format: 'YYYY-MM-WW'
    required: true,
  },
  hour: {
    type: Number, // optional, for daily view
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
