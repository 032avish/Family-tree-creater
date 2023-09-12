const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  nodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node'
    }
  ],
  lines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Line'
    }
  ]
});

const Tree = mongoose.model('Tree', schema);

module.exports = Tree;
