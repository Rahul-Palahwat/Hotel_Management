const express =  require("express");
const app = express();
const connectDb = require('./db/connectDb');
const Router=require('./routes/route');


require('dotenv').config();

const PORT = process.env.PORT;

const cors = require('cors');
const bodyParser= require( 'body-parser');

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/',Router);


const start = async () => {
    try{
        await connectDb(process.env.MONGO_URI);
        console.log('DB Connected');
        app.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}

start();

