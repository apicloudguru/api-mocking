var restify = require('restify')
    , fs = require('fs');
 
 
var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});
 
var server = restify.createServer();
 
server
    .use(restify.fullResponse())
    .use(restify.bodyParser());
 

server.get("/accounts", controllers.account.listAccounts);
server.post("/accounts", controllers.account.createAccount);
server.put("/accounts/:id", controllers.account.updateAccount);
server.del("/accounts/:id", controllers.account.deleteAccount);
server.get("/accounts/:id", controllers.account.viewAccount);

server.post("/transactions", controllers.transaction.createTransaction);

// how to handle versioning
//server.get({path: "/accounts/:id", version: "1.0.0"}, controllers.account.viewAccount);

//server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2);

 

 
var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})
 
if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })