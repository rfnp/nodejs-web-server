const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    if(url === '/') {
        if(method === 'GET') {
            response.end('<h1>Ini adalah homepage</h1>');
        } else {
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }
    } else if(url === '/about') {
        if (method === 'GET') {
            response.end('<h1>Halo! Ini adalah halaman about</h1>')
          } else if (method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
              body.push(chunk);
            });
    
            request.on('end', () => {
              body = Buffer.concat(body).toString();
              const {name} = JSON.parse(body);
              response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
          response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    } else {
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }
 
    
    // response.end('<h1>Halo HTTP Server!</h1>');
    // if(method === 'GET') {
    //     response.end('<h1>Hello!</h1>');
    // }
 
    // if(method === 'POST') {
    //     // response.end('<h1>Hai!</h1>');
    //     let body = [];
    
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });
        
    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>Hai, ${body}!</h1>`);
    //     });
    // }
 
    // if(method === 'PUT') {
    //     response.end('<h1>Bonjour!</h1>');
    // }
 
    // if(method === 'DELETE') {
    //     response.end('<h1>Salam!</h1>');
    // }
};
 
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});