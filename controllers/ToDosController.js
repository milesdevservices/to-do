const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let todos;

    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('UserId', sql.Int, 3)
            .query(
                // eslint-disable-next-line quotes
                `select * from ToDos where UserId = @UserId`,
            );
        todos = todoPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(todos);
};

module.exports.getAll = getAll;
