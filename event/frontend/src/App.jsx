import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_name: "",
    registration_date: "",
  });
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/registrations");
      setRegistrations(response.data);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.event_name) {
      setError("All fields except registration date are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        event_name: "",
        registration_date: "",
      });
      setError("");
      fetchRegistrations();
    } catch (err) {
      console.error("Error adding registration:", err);
      setError("Error adding registration. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Event Registration</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        <label htmlFor="event_name">Event Name</label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          placeholder="Enter event name"
        />

        <label htmlFor="registration_date">Registration Date</label>
        <input
          type="date"
          id="registration_date"
          name="registration_date"
          value={formData.registration_date}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>

      <h2>Registrations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Event</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.phone}</td>
              <td>{registration.event_name}</td>
              <td>{registration.registration_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
