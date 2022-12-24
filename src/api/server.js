

const express = require('express');
const bp = require('body-parser');
require('dotenv').config()

class Server {
    constructor({router}){
        this.express = express();
        this.express.use(router);
    }

    start(){
        this.express.use(bp.json());
        return new Promise((resolve,reject) => {
            const http = this.express.listen(3000, () => {
                const {port} = http.address();
                console.log('running on port' , port);
                resolve();
            })
        })

    }

}

module.exports = Server;