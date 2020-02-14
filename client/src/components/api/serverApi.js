export const fetchData = async (dataUrl) => {
    const response = await fetch(`http://localhost:3002/${dataUrl}`);
    return await response.json();
};

export const postTransaction = async (data)=>{
    await fetch(`http://localhost:3002/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};