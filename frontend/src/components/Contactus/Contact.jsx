import "./Contact.css";

const Contact = () => {
  return (
    
    <section className="contact-section">
        <div className="contact-title">
            <h2 id="contact">Get in Touch with Us</h2>
            <p>We’re excited to hear from you! Whether you have questions, feedback, or just want to connect, drop us a message and let’s create something amazing together.</p>
        </div>
        <div className="contact-form">
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="sub-button">Send Message</button>
            </form>
        </div>
    </section>
  );
}

export default Contact;
