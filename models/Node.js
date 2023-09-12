const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'Name'
  },
  sex: {
    type: String,
    default: 'Sex'
  },
  description: {
    type: String,
    default: 'Description'
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  isResizing: {
    type: Boolean,
    default: false
  }
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
