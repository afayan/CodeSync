import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="catchphrase">
        <h1>Master the Code, Shape the Future!</h1>
        <p>Transform your coding skills with our dynamic learning platform. Connect with a global community and turn your ideas into reality!</p>
        <div className="cta-buttons">
          <button className="button">Get Started</button>
          <a href="#learn-more">
            <button className="button">Discover More</button>
          </a>
        </div>
      </div>
      <div className="image-container">
        <div className="image-placeholder">
          <img src="./ImplementationImage.png" alt="Coding Illustration" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
