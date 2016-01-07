var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
 
var AccountSchema = new Schema({
    _id: String,
    objectData: {
    	name: String,
    	pointsBalance: {
    		amount: Number,
    		currency: String
    	}
    }
});

mongoose.model('Account', AccountSchema);