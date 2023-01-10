

const express = require('express');
const bp = require('body-parser');
require('dotenv').config();
class Server {
    constructor({router}){
        this.express = express();
        this.express.use(router);
        this.PORT = process.env.PORT || 3000;
    }

    start(){
        this.express.use(bp.json());
        this.express.use(bp.urlencoded({
            extended:true
        })); 
        return new Promise((resolve,reject) => {
            const http = this.express.listen(this.PORT, () => {
                const {port} = http.address();
                console.log('running on port' , port);
                resolve();
            })
        })

    }

}

module.exports = Server;