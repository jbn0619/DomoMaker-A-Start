const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let OmodModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const OmodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  evil: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

OmodSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  evil: doc.evil,
});

OmodSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return OmodModel.find(search).select('name age evil').lean().exec(callback);
};

OmodModel = mongoose.model('Omod', OmodSchema);

module.exports.OmodModel = OmodModel;
module.exports.OmodSchema = OmodSchema;
