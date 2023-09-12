const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  startX: {
    type: Number,
    required: true
  },
  startY: {
    type: Number,
    required: true
  },
  endX: {
    type: Number,
    required: true
  },
  endY: {
    type: Number,
    required: true
  }
});

const Line = mongoose.model('Line', lineSchema);

module.exports = Line;
