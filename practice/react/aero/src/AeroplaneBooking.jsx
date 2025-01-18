import React, { useState } from 'react';

function AeroplaneBooking() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    numberOfPeople: '',
  });

  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(null);
  const [discountedAmount, setDiscountedAmount] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.numberOfPeople.trim()) {
      newErrors.numberOfPeople = 'Number of people is required';
    } else if (isNaN(formData.numberOfPeople) || formData.numberOfPeople <= 0) {
      newErrors.numberOfPeople = 'Please enter a valid number of people';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const costPerPerson = 100; // Example cost per person
      const numberOfPeople = parseInt(formData.numberOfPeople, 10);
      const originalAmount = numberOfPeople * costPerPerson;

      if (numberOfPeople > 10) {
        const discountedAmount = originalAmount * 0.9; // 10% discount
        setTotalAmount(originalAmount);
        setDiscountedAmount(discountedAmount);
      } else {
        setTotalAmount(originalAmount);
        setDiscountedAmount(null);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <img src="https://th.bing.com/th/id/OIP.SYVOsT6OjixJKyYsY6vKlgHaE6?rs=1&pid=ImgDetMain" alt="Aeroplane" style={{ width: '100%', marginBottom: '20px' }} />
      <h2>Aeroplane Booking Site</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.username && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.username}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.password && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.password}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="numberOfPeople" style={{ display: 'block', marginBottom: '5px' }}>Number of People</label>
          <input
            type="text"
            name="numberOfPeople"
            id="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.numberOfPeople && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.numberOfPeople}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>

      {totalAmount !== null && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px', color: '#333' }}>
          <h3>Booking Summary</h3>
          <p>Original Amount: ${totalAmount}</p>
          {discountedAmount && <p>Discounted Amount (10% off): ${discountedAmount}</p>}
        </div>
      )}
    </div>
  );
}

export default AeroplaneBooking;