

import { Target, Lightbulb, Users, Settings } from 'lucide-react';
import './Objectives.css';

const Objectives = () => {
    return (
        <section className="objectives-section">
            <h2 className="objectives-title" id='obj'>Our Objectives</h2>
            <div className="objectives-content">
                <div className="objective-card">
                    <Target/>
                    <h3 className="objective-heading">Clear Focus</h3>
                    <p className="objective-description">Maintain a sharp focus on our goals to ensure that every step we take aligns with our mission and values.</p>
                </div>
                <div className="objective-card">
                    <Lightbulb/>
                    <h3 className="objective-heading">Innovation</h3>
                    <p className="objective-description">Continuously innovate to stay ahead of the curve and provide cutting-edge solutions to our users.</p>
                </div>
                <div className="objective-card">
                    <Users/>
                    <h3 className="objective-heading">User Engagement</h3>
                    <p className="objective-description">Engage with our users effectively to understand their needs and build a community around our product.</p>
                </div>
                <div className="objective-card">
                    <Settings/>
                    <h3 className="objective-heading">Operational Excellence</h3>
                    <p className="objective-description">Strive for operational excellence to deliver consistent and reliable service across all platforms.</p>
                </div>
            </div>
        </section>
    );
};

export default Objectives;
