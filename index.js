const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

//Routes
const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');
const categoryRoutes = require('./server/routes/category');
const productRoutes = require('./server/routes/product');
const paymentRoutes = require('./server/routes/stripePayment');
const orderRoutes = require('./server/routes/order');


const PORT = process.env.PORT || process.env.NODE_PORT || 5000;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(cors());
}
else{
    app.use(morgan('combined'));
}


//DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () =>  console.log(`MongoDB is connected`));


// console.log(process.env.MONGODB_URI)

//Middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);


if (process.env.NODE_ENV === 'production') {
    //In case frontend is rendered from nodejs
    app.use(express.static('client/build'));

    //for all the client requests
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}



app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));