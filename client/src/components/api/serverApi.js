const fetchData = async (dataUrl) => {
    const response = await fetch(`http://localhost:3002/${dataUrl}`);
    return await response.json();
};

export default fetchData;