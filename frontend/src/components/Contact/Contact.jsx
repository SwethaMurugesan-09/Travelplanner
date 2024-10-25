import React, { useState } from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
const Contact    = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "1952d936-2c92-4a85-a80b-8a1b5543dc4a");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
         alert(res.message);
        }
      };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    queries: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-form-total-container">
        <Navbar />
    <div className="contact-form-container">
      <h2 className="contact-title">Contact Us</h2>
      {submitted ? (
        <p className="contact-success-message">Thank you! We have received your query.</p>
      ) : (
        <form className="contact-form"onSubmit={onSubmit}>
          <div className="contact-form-group">
            <label htmlFor="name" className="contact-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="email" className="contact-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="queries" className="contact-label">Queries</label>
            <textarea
              id="queries"
              name="queries"
              value={formData.queries}
              onChange={handleChange}
              required
              className="contact-textarea"
              placeholder="Enter your queries"
            />
          </div>

          <button type="submit" className="contact-submit-btn">Submit</button>
        </form>
      )}
    </div></div>
  );
};

export default Contact;
