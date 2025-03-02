import React from "react";
import "../css/about.css";
function About() {
    return (
        <div className="about-content">
            <div className="about-description">
                Hello! My name is Kelly Esquejo. I am a Junior Software Engineer
                with a Bachelor of Science in Computer Science. I have had the
                opportunity to work in different settings, collaborating with a
                team, a partner, and clients to produce solutions such as
                user-friendly applications.
                <br /> <br /> With nearly 2 years of experience as a Computer
                Lifecycle Technician I, I have developed a strong foundation in
                troubleshooting hardware and software issues, system
                installations, and delivering customer service.
            </div>
            <div className="about-skills">
                <p>Here are a few technologies I have worked with:</p>
                <ul>
                    <li>C++</li>
                    <li>JavaScript</li>
                    <li>Python</li>
                    <li>React</li>
                    <li>SQL</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
