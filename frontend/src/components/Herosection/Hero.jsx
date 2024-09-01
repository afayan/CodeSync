import "./Hero.css"


const Hero = () => {
  return (
    <div className="hero-container">
      <div className="catchphrase">
        <h1>Unlock Your Coding Potential!</h1>
        <p>Learn, practice, and excel in coding with our interactive platform.
          Join thousands of developers worldwide!</p>
        <div className="cta-buttons">
          <button className="button">SignUp</button>
          <a href="#obj"><button className="button">Learn More</button></a>
        </div>
      </div>
      <div className="image-container">
        <div className="image-placeholder">
          <img src=""  className="hero-image" />
        </div>
      </div>
    </div>
  );
}

export default Hero