
/** @param {string} path @returns {Promise<object>} */
const get = async (path) => {
    const res = await fetch(path, {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: 'GET',
    });
    return await res.json();
}

/** @param {string} path @param {object} data @returns {Promise<object>} */
const post = async (path, data) => {
    const res = await fetch(path, {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: 'POST',
        body: JSON.stringify(data),
    });
    return await res.json();
}
