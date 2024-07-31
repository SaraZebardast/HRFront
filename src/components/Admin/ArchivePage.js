import React, { useState, useEffect } from 'react';

const ArchiveDataDisplay = () => {
    const [archiveData, setArchiveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArchiveData();
    }, []);

    const fetchArchiveData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/archive/data');
            if (!response.ok) {
                throw new Error('Failed to fetch archive data');
            }
            const data = await response.json();
            setArchiveData(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading archive data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="archive-data-container">
            <h1>Archive Data</h1>
            {archiveData.length === 0 ? (
                <p>No archive data available.</p>
            ) : (
                <table className="archive-data-table">
                    <thead>
                    <tr>
                        {Object.keys(archiveData[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {archiveData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ArchiveDataDisplay;