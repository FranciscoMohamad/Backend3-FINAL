import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adoptionDate: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);
export default Adoption;