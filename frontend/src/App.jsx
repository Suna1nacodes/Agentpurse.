import { useEffect, useState } from 'react';

function App() {
  const [rowData, setRowData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/transactions');
      const data = await res.json();
      setRowData(data);
    } catch (e) {
      console.log('Backend not running', e);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 2000);
    return () => clearInterval(id);
  }, []);

  const getColor = (status) => {
    if (status === 'Approved') return { background: '#d4edda', color: '#155724' };
    if (status === 'Denied') return { background: '#f8d7da', color: '#721c24' };
    return { background: '#fff3cd', color: '#856404' };
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', background: 'white', minHeight: '100vh', color: 'black' }}>
      <h1>Agentpurse — Live Monitor 🟢🔴🟡</h1>
      <p>Backend: http://localhost:3000 | Auto-refresh every 2s | Total: {rowData.length}</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ background: '#333', color: 'white' }}>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>ID</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Amount $</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Description</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Status</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((r) => (
            <tr key={r.id} style={getColor(r.status)}>
              <td style={{ padding: 10, border: '1px solid #ccc', fontWeight: 'bold' }}>{r.id}</td>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>{r.amount}</td>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>{r.description}</td>
              <td style={{ padding: 10, border: '1px solid #ccc', fontWeight: 'bold' }}>{r.status}</td>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {rowData.length === 0 && <p style={{ marginTop: 20 }}>No transactions yet — call POST http://localhost:3000/v1/purchase-intents to create!</p>}
    </div>
  );
}

export default App;