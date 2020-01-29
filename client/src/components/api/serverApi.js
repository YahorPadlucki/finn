const fetchData = async (dataUrl) => {
    const response = await fetch(`http://localhost:3009/${dataUrl}`);
    return await response.json();
};

export default fetchData;