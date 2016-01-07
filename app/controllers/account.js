var mongoose = require('mongoose'),
    Account = mongoose.model("Account");
//    ObjectId = mongoose.Types.ObjectId;
 
exports.createAccount = function(req, res, next) {
    var accountModel = new Account(req.body);
    accountModel.save(function(err, account) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.status(201);
            res.json({
                type: true,
                data: account
            });
        }
    });
}
 
exports.listAccounts = function(req, res, next) {
    Account.find(function(err, accounts) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occurred: " + err
            });
        } else {
                res.json(accounts);
        }
    });
}

exports.viewAccount = function(req, res, next) {
    Account.findById(req.params.id, function(err, account) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (account) {
                res.json(account);
            } else {
                res.json({
                    type: false,
                    data: "Accoount: " + req.params.id + " not found"
                });
            }
        }
    });
}
 
 

exports.updateAccount = function(req, res, next) {
    var updatedAccountModel = new Account(req.body);
    Account.findByIdAndUpdate(req.params.id, updatedAccountModel, function(err, account) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (account) {
                res.json(updatedAccountModel);
            } else {
                res.json({
                    type: false,
                    data: "Account: " + req.params.id + " not found"
                });
            }
        }
    });
}
 
exports.deleteAccount = function(req, res, next) {
    Account.findByIdAndRemove(req.params.id, function(err, account) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: "Account: " + req.params.id + " deleted successfully"
            });
        }
    });
}