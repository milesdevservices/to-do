const validator = require('validator');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');

const getAllTodos = async function(req) {
    const pool = await poolPromise;
    let result;

    try {
        result = await pool
            .request()
            .input('UserId', sql.Int, req.user.Id)
            .query('select * from todos where UserId = @UserId');
    } catch (e) {
        throwError(e.message);
    }

    return result.recordset;
};

getAll = async function(req, res) {
    // format request
    res.setHeader('ContentType', 'application/json');

    let err, todos;

    // now call the db
    [err, todos] = await executeOrThrow(getAllTodos(req));
    if (err) {
        return returnError(res, err, 422);
    }

    // return results
    return returnSuccessResponse(res, todos, 201);
};

module.exports.getAll = getAll;
