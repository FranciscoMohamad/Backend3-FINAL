import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  adopted: Boolean
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);
export default Pet;