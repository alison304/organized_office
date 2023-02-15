const express = require("express");
const { connectMongo } = require("./config/mongoose.config");
const { userRouter } = require("./router/user.router");
const cors = require('cors');
const port = 3001;

connectMongo();

app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter);

app.listen(port, ()=> {
    console.log(`It's alive!, running on port ${port}`);
});