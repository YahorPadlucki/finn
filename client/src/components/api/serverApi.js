const port = 3002;

export const fetchData = async (dataUrl) => {
    const response = await fetch(`http://localhost:${port}/${dataUrl}`)
        .catch(() => false);
    if (!response)
        return false;
    return await response.json();
};

export const postTransaction = async (data) => {
    return await postRequest(`http://localhost:${port}/transactions`, data);
};

export const addNewName = async (data) => {
    return await postRequest(`http://localhost:${port}/namesArray`, data);
};

export const addNewAccount = async (data) => {
    return await postRequest(`http://localhost:${port}/accounts`, data);
};

export const addNewCategory = async (data) => {
    return await postRequest(`http://localhost:${port}/categories`, data);
};

const postRequest = (url, data) => {
    return fetch(url, {
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
    return await patchRequest(`http://localhost:${port}/transactions/${data.id}`, data);
};


export const patchAccounts = async (data) => {
    return await patchRequest(`http://localhost:${port}/accounts/${data.id}`, data);
};

export const patchName = async (data) => {
    return await patchRequest(`http://localhost:${port}/namesArray/${data.id}`, data);
};

export const patchColor = async (data) => {
    return await patchRequest(`http://localhost:${port}/categories/${data.id}`, data);
};

const patchRequest = (url, data) => {
    return fetch(url, {
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
    return await deleteRequest(`http://localhost:${port}/transactions/${id}`);
};

export const deleteAccount = async (id) => {
    return await deleteRequest(`http://localhost:${port}/accounts/${id}`);
};

const deleteRequest = (url) => {
    return fetch(url, {
        method: 'DELETE',
    })
        .then(() => true)
        .catch((e) => e);
};


// export const patchName = async