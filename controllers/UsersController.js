const validator = require('validator');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');

const hashPassword = async function(userInfo) {
    let err;
    let salt, hash;

    [err, salt] = await executeOrThrow(bcrypt.genSalt(10));
    if (err) {
        throwError(err.message);
    }

    [err, hash] = await executeOrThrow(bcrypt.hash(userInfo.Password, salt));
    if (err) {
        throwError(err.message);
    }
    return hash;
};

const createUser = async function(userInfo) {
    if (validator.isEmail(userInfo.Email)) {
        const pool = await poolPromise;
        let result;

        userInfo.Password = await hashPassword(userInfo);

        try {
            result = await pool
                .request()
                .input('First', sql.NVarChar, userInfo.First)
                .input('Last', sql.NVarChar, userInfo.Last)
                .input('Email', sql.NVarChar, userInfo.Email)
                .input('Phone', sql.NVarChar, userInfo.Phone)
                .input('Password', sql.NVarChar, userInfo.Password)
                .query(
                    'INSERT INTO Users ([First], [Last], [Email], [Phone], [UserRoleId], [Password]) OUTPUT inserted.* values (@First, @Last, @Email, @Phone, 2, @Password)',
                );
        } catch (e) {
            throwError(e.message);
        }

        return result.recordset.shift();
    }
    throwError('Email is invalid');
};

module.exports.createUser = createUser;
create = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;

    if (!body.Email) {
        return returnError(res, 'Please enter an email to register', 422);
    } else if (!body.Password) {
        return returnError(res, 'Please enter a password to register', 422);
    }
    let err, user;

    [err, user] = await executeOrThrow(createUser(body));
    if (err) {
        return returnError(res, err, 422);
    }

    return returnSuccessResponse(res, user, 201);
};

module.exports.create = create;

const comparePassword = async function(user, passedPassword) {
    let err, pass;

    if (!user.Password) {
        throwError('password not set');
    }

    [err, pass] = await executeOrThrow(
        bcryptPromise.compare(passedPassword, user.Password),
    );
    if (err) {
        throwError(err);
    }

    if (!pass) {
        throwError('invalid password');
    }

    return user;
};

const authUser = async function(userInfo) {
    if (!userInfo.Email) {
        throwError('Please enter an email to login');
    }

    if (!userInfo.Password) {
        throwError('Please enter a password to login');
    }

    let user;

    if (validator.isEmail(userInfo.Email)) {
        const pool = await poolPromise;

        try {
            user = await pool
                .request()
                .input('Email', sql.VarChar, userInfo.Email)
                .query('select * from Users where Email = @Email');
            user = user.recordset.shift();
        } catch (e) {
            returnError(res, e, 500);
        }
    } else {
        throwError('A valid email was not entered');
    }

    if (!user) {
        throwError('Not registered');
    }

    [err, user] = await executeOrThrow(
        comparePassword(user, userInfo.Password),
    );

    if (err) {
        throwError(err.message);
    }

    return user;
};

module.exports.authUser = authUser;

const getJwt = function(user) {
    let expirationTime = parseInt(process.env.jwt_expiration);

    return `Bearer ${jwt.sign(
        // eslint-disable-next-line camelcase
        { user_id: user.Id },
        process.env.jwt_encryption,
        {
            expiresIn: expirationTime,
        },
    )}`;
};

const login = async function(req, res) {
    let err, user;

    [err, user] = await executeOrThrow(authUser(req.body));
    if (err) {
        return returnError(res, err, 422);
    }

    return returnSuccessResponse(res, {
        token: getJwt(user),
        user: JSON.stringify(user),
    });
};

module.exports.login = login;
