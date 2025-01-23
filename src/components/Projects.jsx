import React from "react";
import PropTypes from "prop-types";
import "../css/projects.css";

const cypherVaultArt = () => {
    return `  _____          __             _   __          ____ 
 / ___/_ _____  / /  ___ ____  | | / /__ ___ __/ / /_
/ /__/ // / _ \\/ _ \\/ -_) __/  | |/ / _ \`/ // / / __/
\\___/\\_, / .__/_//_/\\__/_/     |___/\\_,_/\\_,_/_/\\__/ 
    /___/_/                                          `;
};
//         return `  ___|                |                      \\ \\     /              |  |
//  |      |   |  __ \\   __ \\    _ \\   __|       \\ \\   /  _\` |  |   |  |  __|
//  |      |   |  |   |  | | |   __/  |           \\ \\ /  (   |  |   |  |  |
// \\____| \\__, |  .__/  _| |_| \\___| _|            \\_/  \\__,_| \\__,_| _| \\__|
//        ____/  _|                                                          `;
//     };

const portfolioWebsiteArt = () => {
    return `   ___    _____         __  _ ____         ___           __       ______    
  / _ \\  / ___/__ ____ / /_(_) / /__      / _ \\___  ____/ /____  / _/ (_)__ 
 / , _/ / /__/ _ \`(_-</ __/ / / / _ \\    / ___/ _ \\/ __/ __/ _ \\/ _/ / / _ \\
/_/|_|  \\___/\\_,_/___/\\__/_/_/_/\\___/   /_/   \\___/_/  \\__/\\___/_//_/_/\\___/`;
};

const compilerArt = () => {
    return `  _____                _ __       
 / ___/__  __ _  ___  (_) /__ ____
/ /__/ _ \\/  ' \\/ _ \\/ / / -_) __/
\\___/\\___/_/_/_/ .__/_/_/\\__/_/   
              /_/                 `;
};

const rightWayArt = () => {
    return `   ___  _      __   __    _      __         
  / _ \\(_)__ _/ /  / /_  | | /| / /__ ___ __
 / , _/ / _ \`/ _ \\/ __/  | |/ |/ / _ \`/ // /
/_/|_/_/\\_, /_//_/\\__/   |__/|__/\\_,_/\\_, / 
       /___/                         /___/  `;
};

const PROJECTS = [
    {
        title: cypherVaultArt(),
        skills: ["C++", "SQLite", "AES Encryption"],
        description: `A terminal-based, multi-factor authentication password manager
        using C++ and SQLite. Implemented AES encryption to ensure
        data security.`,
        features: null,
        link: "https://github.com/esquek1/CypherVault",
        isPrivate: false,
    },
    {
        title: portfolioWebsiteArt(),
        skills: ["TypeScript", "React", "HTML", "CSS"],
        description: `
        Collaborated with Reena Castillo, a graphic designer, to bring
        their vision to life by developing a portfolio website that
        showcases their creative work.`,
        features: null,
        link: "https://github.com/esquek1/graphic-design-portfolio",
        isPrivate: false,
    },
    {
        title: compilerArt(),
        skills: ["Java"],
        description: `
        Collaborated with another developer to develop a compiler for the 
        Espresso language as a term project, to design and implement
        compiler components using Java.`,
        features: [
            "Scanner and Parser",
            "Parse Tree Construction",
            "Semantic Checker",
            "Type Checking",
            "Modifier Checking",
        ],

        isPrivate: true,
    },
    {
        title: rightWayArt(),
        skills: ["React Js", "JavaScript", "HTML", "CSS"],
        description: `
        A web application written in ReactJS and CSS aimed at simplifying
        the planning process for trip recommendations. Project was
        showcased at the Fred and Harriet Cox Senior Design Competition.`,
        features: null,
        link: "https://github.com/esquek1/RightWay",
        isPrivate: false,
    },
];

// Add PropTypes validation
ProjectItem.propTypes = {
    title: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
    isPrivate: PropTypes.bool.isRequired,
};

function ProjectItem({
    title,
    skills,
    description,
    features,
    link,
    isPrivate,
}) {
    return (
        <div className="project-item">
            {link ? (
                <a className="project-link" href={link}>
                    <pre className="project-title">{title}</pre>
                </a>
            ) : (
                <pre className="project-title">{title}</pre>
            )}
            <h5 className="project-skills">{skills.join(", ")}</h5>
            {isPrivate && (
                <h5 className="private">
                    (This project is a private repository.)
                </h5>
            )}
            <div className="project-description">{description}</div>
            {features?.length > 0 && (
                <ul className="project-features">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Projects() {
    return (
        <div className="project-container">
            <div className="project-content">
                Below are details of some of the projects I have worked on:
                {PROJECTS.map((project, index) => (
                    <ProjectItem key={index} {...project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;
