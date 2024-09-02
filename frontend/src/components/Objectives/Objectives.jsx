

import { Target, Lightbulb, Users, Settings, CodeXml, BookOpenCheck } from 'lucide-react';
import './Objectives.css';
import { SiGooglegemini  } from "react-icons/si";


const Objectives = () => {
    return (
        <section className="objectives-section">
            <h2 className="objectives-title" id='obj'>Our Objectives</h2>
            <div className="objectives-content">
                <div className="objective-card">
                <SiGooglegemini />

                    <h3 className="objective-heading">AI-Guided Learning</h3>
                    <p className="objective-description">Empower your coding journey with our AI-driven features like "Ask Doubts to AI" and "Check Code Using AI," designed to offer personalized, teacher-like support.</p>
                </div>
                <div className="objective-card">
                    <Users/>
                    <h3 className="objective-heading">User Friendliness</h3>
                    <p className="objective-description">Start coding with no prior experience on any other platform. Write code however you want, we'll handle the rest!</p>
                </div>
                <div className="objective-card">
                    <CodeXml/>
                    <h3 className="objective-heading">Fast & Efficient Execution</h3>
                    <p className="objective-description">Leverage the power of the Piston API, the fastest code execution engine, to run your code seamlessly and efficiently.</p>
                </div>
                <div className="objective-card">
                    <BookOpenCheck/>
                    <h3 className="objective-heading">Career-Focused Learning</h3>
                    <p className="objective-description">Access a curated set of DSA questions and C programming exercises tailored to align with your academic curriculum, helping you excel in your studies and career.</p>
                </div>
            </div>
        </section>
    );
};

export default Objectives;
