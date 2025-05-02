import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalRentals:0,
    newRegistrations: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/6b79e220-9b21-4749-86f4-ba2edf16d48f'); 
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Total Books', 'Total Users', 'Total Rentals', 'New Registrations'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.totalBooks, stats.totalUsers, stats.totalRentals, stats.newRegistrations],
        backgroundColor: getGradient(),
        borderColor: '#003366',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#003366',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
        backgroundColor: '#003366',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#003366',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          color: '#003366',
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
  };

  function getGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#3399ff');
    gradient.addColorStop(1, '#003366');
    return gradient;
  }

  return (
    <div style={styles.content}>
      <Navbar />
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.cardsContainer}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={styles.card}>
            <h2 style={styles.cardTitle}>{formatTitle(key)}</h2>
            <p style={styles.cardValue}>{value}</p>
          </div>
        ))}
      </div>
      <div style={styles.chartContainer}>
        <h2 style={styles.chartTitle}>Activity Overview</h2>
        <div style={styles.chart}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

const formatTitle = (key) => {
  switch (key) {
    case 'totalBooks':
      return 'Total Books';
    case 'totalUsers':
      return 'Total Users';
    case 'totalRentals':
      return 'Total Rentals';
    case 'newRegistrations':
      return 'New Registrations';
    default:
      return key;
  }
};

const styles = {
  content: {
    padding: '20px',
    backgroundColor: '#f0f4f8',
    fontFamily: '"Arial", sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    color: '#003366',
    marginBottom: '20px',
    textAlign: 'center',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '200px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#003366',
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#003366',
  },
  chartContainer: {
    marginTop: '20px',
    height: '400px',
  },
  chartTitle: {
    fontSize: '1.5rem',
    color: '#003366',
    marginBottom: '10px',
  },
  chart: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '82%',
    padding: '20px',
  },
};

export default AdminDashboard;
