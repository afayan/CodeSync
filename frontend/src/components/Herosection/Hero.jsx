import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="catchphrase">
        <h1>Master the Code, Shape the Future!</h1>
        <p>Your Friendly Guide to Learning, Practicing, and Excelling in Programming</p>
        <div className="cta-buttons">
          <Link to={'/home'}>          <button className="button">Get Started</button>
          </Link>
          <a href="#obj">
            <button className="button">Discover More</button>
          </a>
        </div>
      </div>
      <div className="image-container">
        <div className="image-placeholder">
          <img src="./Syllabus6.png" alt="Syllabus" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
