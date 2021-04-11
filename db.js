const {
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASS
} = process.env;

const Sequelize = require('sequelize');
let sequelize;

sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS, {
    dialect: 'mysql',
    logging: false
});

const Scan = sequelize.define('scan', {
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    tag: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
}, {
    paranoid: true
});

function isReady() {
    return sequelize.authenticate()
        .then(() => sequelize.sync({ alter: true }))
        .catch(console.log);
}

module.exports = {
    Scan,
    isReady
};