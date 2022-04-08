const createCookie = (res, name, value) => {
    res.cookie(name, value, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
}

const deleteCookie = (res, name) => {
    res.clearCookie(name, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
}

module.exports = {
    createCookie,
    deleteCookie
}