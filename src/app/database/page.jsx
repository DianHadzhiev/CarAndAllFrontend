'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/database/tables")
      .then((response) => setTables(response.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch tables. Check the console for details.");
      });
  }, []);

  const fetchTableData = (tableName) => {
    axios
      .get(`http://localhost:8080/api/database/table/${tableName}`)
      .then((response) => setTableData(response.data))
      .catch((err) => {
        console.error(err);
        setError(`Failed to fetch data from ${tableName}. Check the console for details.`);
      });
  };

  const handleTableSelect = (event) => {
    const tableName = event.target.value;
    setSelectedTable(tableName);
    fetchTableData(tableName);
  };

  return (
    <div className="page">
      <h1>Database Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="table-select">Select a table: </label>
        <select id="table-select" value={selectedTable} onChange={handleTableSelect}>
          <option value="">-- Select a table --</option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>
      </div>
      {selectedTable && (
        <div>
          <h2>Data from {selectedTable}</h2>
          <Table data={tableData} />
        </div>
      )}
    </div>
  );
}

function Table({ data }) {
  if (data.length === 0) {
    return <p>No data found.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}