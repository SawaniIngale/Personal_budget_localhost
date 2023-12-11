// CreateExpenseComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import NavBar from './Navbar';


const CreateExpenseComponent = () => {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    // Fetch budget categories from the server
    const fetchBudgetCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/show-budget?user_id=${user_id}`);
        setBudgetCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].budget_category);
        }
      } catch (error) {
        console.error('Error fetching budget categories:', error.message);
      }
    };

    fetchBudgetCategories();
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

  const selectStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
  };

  const handleAddExpense = async () => {
    // Validate input
    if (!selectedCategory || isNaN(amount) || amount <= 0) {
      alert('Please enter valid information.');
      return;
    }

    try {
        const response = await axios.get(`http://localhost:8081/get-budget-id?category=${selectedCategory}&user_id=${user_id}`);
        const budget_id = response.data.id;
        const budgetid = response.data.id;
      // Make a POST request to add the expense
      await axios.post('http://localhost:8081/add-expense', {
        // user_id: 1, // Assuming you have a user ID for the current user
        expense_category: selectedCategory,
        amount,
        budget_id,
        user_id,
        budgetid,
      });

      // Clear form fields
      setAmount('');
      alert('Expense added successfully!');
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error adding expense:', error.message);
    }
  };

  return (
    
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Add Expense</h2>
        <form>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              style={selectStyle}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              placeholder='Select Category'
            >
              {budgetCategories.map((category) => (
                <option key={category.id} value={category.budget_category}>
                  {category.budget_category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount in $"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button type="button" onClick={handleAddExpense} style={buttonStyle}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExpenseComponent;
