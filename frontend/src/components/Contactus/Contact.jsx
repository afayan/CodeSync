import "./Contact.css"

const Contact = () => {
  return (
    <section className="contact-section">
        <div className="contact-tagline">
            <h2 id="contact">Lets Get in Touch</h2>
            <p>We are just a click away! Whether you have a question, feedback, or just want to say hello, we would love to hear from you. Lets create something amazing together.</p>
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

export default Contact