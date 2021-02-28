const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/auth",authRoute);



app.listen(port, () => console.log(`Listening on port ${port}`));