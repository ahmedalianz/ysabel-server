const mongoose=require('mongoose');
const dbUrl=process.env.DBURL
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('connecting to mongodb'))
.then((result) => console.log(`connected to Data Base`))
.catch((err) => console.log(err));
