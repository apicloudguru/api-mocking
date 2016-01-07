var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
 
var TransactionSchema = new Schema({
    objectData: {
    	accountId: String,
    	transAmount: {
    		amount: Number,
    		currency: String
    	},
    	transDate: Date,
    	status: String,
    	successful: Boolean
    }
});

mongoose.model('Transaction', TransactionSchema);