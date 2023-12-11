import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import NavBar from "./Navbar";
import { Chart } from "chart.js/auto";

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "20px",
  width: "90%",
  padding : "150px",
};

const Card = ({ title, children }) => {
    const cardStyle = {
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      textAlign: 'center',
    
    };
  
    const cardTitleStyle = {
      fontSize: '20px',
      margin: '0 0 20px 0',
      fontWeight: 'bold',
    };
  
    return (
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>{title}</h2>
        {children}
      </div>
    );
  };
  

// const gridItemStyle = {
//   width: "100%",
//   padding : "90px",
// };

function Home() {
    const [categoryWiseData, setCategoryWiseData] = useState([]);
  const [categoryWiseBudget, setCategoryWiseBudget] = useState([]);
  const [categoryWiseExpense, setCategoryWiseExpense] = useState([]);
  const [totalBudgetExpense, setTotalBudgetExpense] = useState({ totalBudget: 0, totalExpense: 0 });

  const user_id = localStorage.getItem('user_id');

  const barChartRef = useRef(null);
  const budgetPieChartRef = useRef(null);
  const expensePieChartRef = useRef(null);
  const balancePieChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get(`http://localhost:8081/category-wise-budget?user_id=${user_id}`);
        const expenseResponse = await axios.get(`http://localhost:8081/category-wise-expense?user_id=${user_id}`);
        const totalResponse = await axios.get(`http://localhost:8081/total-budget-expense?user_id=${user_id}`);

        setCategoryWiseBudget(budgetResponse.data);
        setCategoryWiseExpense(expenseResponse.data);
        setTotalBudgetExpense(totalResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/category-wise-data");
        setCategoryWiseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Destroy existing charts before rendering new ones
    if (barChartRef.current) barChartRef.current.destroy();
    if (budgetPieChartRef.current) budgetPieChartRef.current.destroy();
    if (expensePieChartRef.current) expensePieChartRef.current.destroy();
    if (balancePieChartRef.current) balancePieChartRef.current.destroy();

    // Render charts
    renderBarChart();
    renderBudgetPieChart();
    renderExpensePieChart();
    // renderBalancePieChart();
    renderGaugeChart();
  }, [categoryWiseData,categoryWiseBudget, categoryWiseExpense, totalBudgetExpense]);
  console.log("cat bud:",categoryWiseBudget)
  console.log("cat_exp",categoryWiseExpense)

  const renderBarChart = () => {
    const ctx = document.getElementById("barChart");
    barChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categoryWiseBudget.map((item) => item.category),
        datasets: [
          {
            label: "Budget",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75,192,192,0.4)",
            hoverBorderColor: "rgba(75,192,192,1)",
            data: categoryWiseBudget.map((item) => item.amount),
          },
          {
            label: "Expense",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: categoryWiseExpense.map((item) => item.amount),
          },
        ],
      },
    });
    
  };

  const renderBudgetPieChart = () => {
    const ctx = document.getElementById("budgetPieChart");
    budgetPieChartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categoryWiseBudget.map((item) => item.category),
        datasets: [
          {
            data: categoryWiseBudget.map((item) => item.amount),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#63D471", "#8A2BE2", "#A52A2A"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#63D471", "#8A2BE2", "#A52A2A"],
          },
        ],
      },
    });
  };

  const renderExpensePieChart = () => {
    const ctx = document.getElementById("expensePieChart");
    expensePieChartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categoryWiseExpense.map((item) => item.category),
        datasets: [
          {
            data: categoryWiseExpense.map((item) => item.amount),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#63D471", "#8A2BE2", "#A52A2A"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#63D471", "#8A2BE2", "#A52A2A"],
          },
        ],
      },
    });
  };

  // const renderBalancePieChart = () => {
  //   const ctx = document.getElementById("balancePieChart");
  //   balancePieChartRef.current = new Chart(ctx, {
  //     type: "pie",
  //     data: {
  //       labels: ["Budget", "Expense", "Balance"],
  //       datasets: [
  //         {
  //           data: [
  //             totalBudgetExpense.totalBudget,
  //             totalBudgetExpense.totalExpense,
  //             Math.max(0, totalBudgetExpense.totalBudget - totalBudgetExpense.totalExpense),
  //           ],
  //           backgroundColor: ["#63D471", "#FF6384", "#36A2EB"],
  //           hoverBackgroundColor: ["#63D471", "#FF6384", "#36A2EB"],
  //         },
  //       ],
  //     },
  //   });
  // };

  const renderGaugeChart = () => {
    const ctx = document.getElementById("gaugeChart");
    const totalBudget = totalBudgetExpense.totalBudget;
    const totalExpense = totalBudgetExpense.totalExpense;
    const balance = Math.max(0, totalBudget - totalExpense);
    const usedPercentage = (totalExpense / totalBudget) * 100;

    balancePieChartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Used", "Remaining"],
        datasets: [{
          data: [usedPercentage, 100 - usedPercentage],
          backgroundColor: ["#FF6384", "#36A2EB"],
          borderWidth: 0
        }]
      },
      options: {
        circumference: 180, 
        rotation: -90, 
        cutout: '80%', 
        plugins: {
          legend: {
            display: false
          }
          // tooltip: {
          //   enabled: false
          // }
        }
      }
    });
  };
  

  return (
    <div>
      <h1>Welcome to Your Personal Budget App</h1>

      <div style={gridContainerStyle}>
        <Card title="Grouped Bar Chart (Budget vs Expense)">
          <canvas id="barChart" height="300" />
        </Card>

        <Card title="Budget Pie Chart">
          <canvas id="budgetPieChart" />
        </Card>

        <Card title="Expense Pie Chart">
          <canvas id="expensePieChart" />
        </Card>

        <Card title="Balance Gauge Chart (%)">
          <canvas id="gaugeChart" />
        </Card>
      </div>
    </div>

  );
}

export default Home;
