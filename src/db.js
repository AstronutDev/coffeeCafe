const mongoose = require('mongoose')

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect( "mongodb+srv://root:root@cluster0.l6dmp.mongodb.net/cafe?retryWrites=true&w=majority", option)