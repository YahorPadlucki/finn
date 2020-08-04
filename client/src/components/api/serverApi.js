const port = 3002;

export const fetchData = async (dataUrl) => {
    const response = await fetch(`http://localhost:${port}/${dataUrl}`)
        .catch(() => false);
    if (!response)
        return false;
    return await response.json();
};

export const postTransaction = async (data) => {
    return await fetch(`http://localhost:${port}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

export const patchTransaction = async (data) => {
    return await fetch(`http://localhost:${port}/transactions/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

export const patchAccounts = async (data) => {
    return await fetch(`http://localhost:${port}/accounts/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

export const patchName = async (data) => {
    return await fetch(`http://localhost:${port}/namesArray/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

export const deleteTransaction = async (id) => {
    return await fetch(`http://localhost:${port}/transactions/${id}`, {
        method: 'DELETE',
    })
        .then(() => true)
        .catch((e) => e);
};

export const deleteAccount = async (id) => {
    return await fetch(`http://localhost:${port}/accounts/${id}`, {
        method: 'DELETE',
    })
        .then(() => true)
        .catch((e) => e);
};

export const addNewName = async (data) => {
    return await fetch(`http://localhost:${port}/namesArray`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

export const addNewAccount = async (data) => {
    return await fetch(`http://localhost:${port}/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

export const addNewCategory = async (data) => {
    return await fetch(`http://localhost:${port}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch((e) => e);
};

// export const patchName = async