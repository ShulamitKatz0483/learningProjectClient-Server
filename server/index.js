// בסיעתא דשמיא
require('dotenv').config();
const cors = require("cors");
const express = require('express');

const userRouter = require('./routes/user');
const lessonRouter = require('./routes/lesson');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subCategory');
const davenRouter = require('./routes/daven');
const pendingLessonRouter = require('./routes/pendingLesson');
const studentInLessonRouter = require('./routes/studentInLesson');


const app = express();
const PORT = process.env.PORT || 8000;

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '150mb', extended: true }));

app.use('/user', userRouter);
app.use('/lesson', lessonRouter);
app.use('/category', categoryRouter);
app.use('/subCategory', subCategoryRouter);
app.use('/daven', davenRouter);
app.use('/pendingLesson', pendingLessonRouter);
app.use('/studentInLesson', studentInLessonRouter);



const db = require('./models');

db.sequelize.sync({ force: false })
    .then(() => { console.log('yes re-sync done!') })
    .catch((err) => { console.log("Failed to sync db: " + err.message); });

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });