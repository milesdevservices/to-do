const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getById = async function(req, res) {
    let todoId = parseInt(req.params.todoId);
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let todo;
    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('Id', sql.Int, todoId)
            .query('select * from ToDos where Id = @Id');
        todo = todoPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, todo, 200);
};

module.exports.getById = getById;

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let todos;
    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('UserId', sql.Int, req.user.Id)
            .input('Name', sql.VarChar, req.query.Search)
            .query(
                // eslint-disable-next-line quotes
                `select * from ToDos where UserId = @UserId and Name Like '%' + @Name + '%'`,
            );
        todos = todoPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, todos, 200);
};

module.exports.getAll = getAll;

const Create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let orderId;
    let toDo = req.body;

    if (!toDo.Name) {
        return returnError(res, 'Please enter a Name', 422);
    }

    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('UserId', sql.Int, req.user.Id)
            .query(
                // eslint-disable-next-line quotes
                `select max(OrderId) as OrderId from ToDos where UserId = @UserId`,
            );
        orderId = todoPool.recordset.shift().OrderId;
    } catch (e) {
        returnError(res, e, 500);
    }
    orderId = orderId || orderId === 0 ? orderId + 1 : 0;

    try {
        todoPool = await pool
            .request()
            .input('Name', sql.VarChar, toDo.Name)
            .input('OrderId', sql.Int, orderId)
            .input('UserId', sql.Int, req.user.Id)
            .query(
                // eslint-disable-next-line quotes
                `Insert into Todos (Name, OrderId, UserId) output inserted.* values(@Name, @OrderId, @UserId)`,
            );
        toDo = todoPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, toDo, 201);
};

module.exports.Create = Create;

const Edit = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let toDo = req.body;

    if (!toDo.Name) {
        return returnError(res, 'Please enter a Name', 422);
    }

    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('Id', sql.Int, toDo.Id)
            .input('Name', sql.VarChar, toDo.Name)
            // .input('OrderId', sql.Int, orderId)
            // .input('UserId', sql.Int, req.user.Id)
            .query(
                // eslint-disable-next-line quotes
                `Update ToDos Set Name = @Name Where Id = @Id`,
            );
        // toDo = todoPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, toDo, 200);
};

module.exports.Edit = Edit;
