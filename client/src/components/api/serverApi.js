export const fetchData = async (dataUrl) => {
    const response = await fetch(`http://localhost:3002/${dataUrl}`);
    return await response.json();
};

export const postTransaction = async (data) => {
    return await fetch(`http://localhost:3002/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch(() => false);
};

export const patchTransaction = async (data) => {
    console.log(data.id)
    return await fetch(`http://localhost:3002/transactions/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => true)
        .catch(() => false);
};