const Sequelize = require('sequelize');
const seqauelize = new Sequelize('workoutlog', 'postgres', process.env.PASS,
{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize

