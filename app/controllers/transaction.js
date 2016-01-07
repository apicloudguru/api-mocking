var mongoose = require('mongoose'),
    Account = mongoose.model("Account"),
    Transaction = mongoose.model("Transaction"),
    ObjectId = mongoose.Types.ObjectId;
 
exports.createTransaction = function(req, res, next) {
    var transaction = new Transaction(req.body);
    var balance = 0;
    var trxAmount = transaction.amount;
    var accountId = transaction.accountId;
    var errStatus = false;
    var error = "";
    Account.findById(accountId, function(err, account) {
        if (err) {
            error = err;
            errStatus = true;
        } else {
            if (account) {
                balance = account.objectData.pointsBalance.amount;
            } else {
                errStatus = true;
                error = "Account not found";
            }
        }

        if (! errStatus) {
            if (balance >= trxAmount) {
                balance = balance - trxAmount;
                account.objectData.pointsBalance.amount = balance;
                account.save(function(err, account) {
                    if (err) {
                        error = err;
                        errStatus = true;
                    }
                });
            } else {
                error = "Not emough points to process this transaction";
                errStatus = true;
            }
        }

        transaction.save(function(err, transaction) {
            if (err) {
                res.status(500);
                res.json({
                    error: "Error occured: " + err
                });
            } else {
                res.status(201);
                res.json({
                    success: "Transaction completed",
                    amount: trxAmount,
                    newBalance: balance
                });
            }
        });


    });
}
 
