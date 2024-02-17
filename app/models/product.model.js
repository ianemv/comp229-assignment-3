import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
	  name: {
	    type: String,
		trim: true,
	    required: true
	  },
	  description: {
	    type: String,
	    required: true
	  },
	  price: {
	    type: Number,
	    trim: true,
	    required: true
	  },
	  category: {
	    type: String,
	    required: true
	  },
	  quantity: {
	    type: Number
	  },
});

export default mongoose.model('Product', ProductSchema);