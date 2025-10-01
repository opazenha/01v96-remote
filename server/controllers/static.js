var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    static = require('node-static'),

    app;


var init = function() {
    var fileServer = new static.Server(
        __dirname + '/../../client',
        {
            cache: 0
        }
    );

    http.createServer(function (request, response) {

        request.addListener('end', function () {
            var parsedUrl = url.parse(request.url, true);
            var pathname = parsedUrl.pathname;
            
            // Root endpoint routing logic
            if (pathname === '/') {
                // Check for admin parameter
                if (parsedUrl.query.admin !== undefined) {
                    // Admin mode: serve index.html with all channels
                    request.url = '/index.html?admin=true';
                    fileServer.serve(request, response);
                } 
                // Check if aux parameter is provided
                else if (parsedUrl.query.aux !== undefined) {
                    // Serve index.html with aux parameter
                    fileServer.serve(request, response);
                } 
                // No parameters: show channel selection page
                else {
                    request.url = '/select.html';
                    fileServer.serve(request, response);
                }
            } else {
                // Serve other files normally
                fileServer.serve(request, response);
            }
        }).resume();

    }).listen(app.config.staticPort);

    console.log('[static] Web server started at port ' + app.config.staticPort);
};



module.exports = function(globalApp) {
    app = globalApp;
    app.events.on('ready', init);
};