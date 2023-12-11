// CreateBudgetComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateBudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);
  const [budgetCategory, setBudgetCategory] = useState('');
  const [amount, setAmount] = useState('');

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    // Fetch budget data from the server when the component mounts
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/show-budget?user_id=${user_id}`);
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budget data:', error.message);
      }
    };

    fetchBudgetData();
  }, []); // Run once on component mount

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
  };

  const formStyle = {
    width: '40%',
    marginRight: '20px',
  };

  const listStyle = {
    width: '40%',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 15px',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px 15px',
  };



  const handleCreateBudget = async() => {
    // Validate input
    if (!budgetCategory || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid budget category and amount.');
      return;
    }

    try {
        // Make a POST request to add the expense
        const response = await axios.post('http://localhost:8081/create-budget', {
          budgetCategory,
          amount,
          user_id,
        });

        // Update budgets array with the new budget
        const newBudget = { id: Date.now(), budget_category: budgetCategory, amount: parseFloat(amount) };
        setBudgets([...budgets, newBudget]);

        // Clear form fields
        setBudgetCategory('');
        setAmount('');
    } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error('Error adding expense:', error.message);
      }  

  };

  const calculateTotal = () => {
    return budgets.reduce((total, budget) => total + parseFloat(budget.amount), 0).toFixed(2);
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Create Budget</h2>
        <form>
          <div>
            <label htmlFor="budgetCategory">Budget Category:</label>
            <input
              type="text"
              id="budgetCategory"
              placeholder='eg: Rent'
              value={budgetCategory}
              onChange={(e) => setBudgetCategory(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              placeholder='Enter amount in $'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button type="button" onClick={handleCreateBudget} style={buttonStyle}>
            Add to Budget
          </button>
        </form>
      </div>

      <div style={listStyle}>
        <h3>Budget List</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td style={tdStyle}>{budget.budget_category}</td>
                <td style={tdStyle}>{parseFloat(budget.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetComponent;
