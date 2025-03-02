import { useRef, useState, useEffect } from "react";
import "../css/Terminal.css";

import About from "./About";
import Contact from "./Contact";
import Jokes from "./Joke";
import Projects from "./Projects";

const COMMANDS = [
    { cmd: "-about", desc: "About Me", component: <About /> },
    { cmd: "-clear", desc: "Clear the terminal", component: null },
    {
        cmd: "-contact",
        desc: "My Contact Information",
        component: <Contact />,
    },
    { cmd: "-help", desc: "Show available commands", component: null },
    {
        cmd: "-projects",
        desc: "Show projects I have worked on",
        component: <Projects />,
    },
];

const HELLO = ["Greetings!", "World!", "Hi!", "Hey!", "ヾ(•＾▽＾•)"];

const XSSATTACKS = [
    // Basic XSS Payloads
    "<script>alert('XSS');</script>",
    "<img src='invalid' onerror=\"alert('XSS')\">",
    "\"><script>alert('XSS');</script>",
    "<img src=x onerror=\"alert('XSS');\">",
    "<svg/onload=alert('XSS')>",
    '" onfocus="alert(\'XSS\')" autofocus',
    "<scr<script>ipt>alert('XSS');</scr<script>ipt>",
    '" onmouseover="alert(\'XSS\')"',
    "&#x3C;script&#x3E;alert('XSS')&#x3C;/script&#x3E;",
    "<<script>alert('XSS');//<</script>",
];
// https://www.asciiart.eu/text-to-ascii-art
// Block - DOS Rebel
const NameBanner = () => {
    return ` █████   ████          ████  ████                ██████████                                         ███          
░░███   ███░          ░░███ ░░███               ░░███░░░░░█                                        ░░░           
 ░███  ███     ██████  ░███  ░███  █████ ████    ░███  █ ░   █████   ████████ █████ ████  ██████   █████  ██████ 
 ░███████     ███░░███ ░███  ░███ ░░███ ░███     ░██████    ███░░   ███░░███ ░░███ ░███  ███░░███ ░░███  ███░░███
 ░███░░███   ░███████  ░███  ░███  ░███ ░███     ░███░░█   ░░█████ ░███ ░███  ░███ ░███ ░███████   ░███ ░███ ░███
 ░███ ░░███  ░███░░░   ░███  ░███  ░███ ░███     ░███ ░   █ ░░░░███░███ ░███  ░███ ░███ ░███░░░    ░███ ░███ ░███
 █████ ░░████░░██████  █████ █████ ░░███████     ██████████ ██████ ░░███████  ░░████████░░██████   ░███ ░░██████ 
░░░░░   ░░░░  ░░░░░░  ░░░░░ ░░░░░   ░░░░░███    ░░░░░░░░░░ ░░░░░░   ░░░░░███   ░░░░░░░░  ░░░░░░    ░███  ░░░░░░  
                                    ███ ░███                            ░███                   ███ ░███          
                                   ░░██████                             █████                  ░░██████           
                                    ░░░░░░                             ░░░░░                    ░░░░░░            `;
};

function Terminal() {
    // Output name banner and introduction to program
    const generateBanner = () => {
        return (
            <>
                <div className="banner">
                    <pre className="name-banner">{NameBanner()}</pre>
                </div>

                <span className="help-description">
                    {/*exit single quote code */} Type or click &#39;
                    <span
                        className="output-unknown-tag"
                        onClick={() => processCommand("-help")}
                    >
                        -help
                    </span>
                    &#39; to view a list of commands.
                </span>
            </>
        );
    };
    const [inputVal, setInputVal] = useState("");
    const inputRef = useRef(null);

    // Array for previously entered commands including command name, description, and component
    const [terminalHistory, setTerminalHistory] = useState([]);

    // // State for Caps Lock
    // const [capsLock, setCapsLock] = useState(false);

    // Handles every change typed or deleted in the input field
    // Ensure inputVal state is in sync with the input value
    // best practices for form handling
    // makes the component controlled
    const handleInputChange = (inputText) => {
        setInputVal(inputText.target.value);
    };

    // Scrolls to the input text after command has been process
    const scrollToBottom = () => {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // When user presses 'Enter', verify input
    const processCommand = (inputCmd) => {
        let output = "";
        let component = null;

        // Check if it is on the list of XSS Attacks
        if (XSSATTACKS.includes(inputCmd)) {
            output = "Don't do that";
        } else {
            switch (inputCmd) {
                case "-clear":
                    clearTerminal();
                    return; // Do not append "-clear" to the history

                case "-help":
                    output = generateHelpOutput();
                    break;
                case "-hello":
                    output = generateHelloOutput();
                    break;
                case "-joke":
                    output = <Jokes />;
                    break;
                case "-secret":
                    output = "Not a secret command.";
                    break;
                default: {
                    // To avoid the following error: "Unexpected lexical declaration in case block"
                    // placed {} brackets
                    const command = COMMANDS.find(
                        (cmd) => cmd.cmd === inputCmd
                    );
                    if (command) {
                        // output = command.desc;

                        // If there is a component for the command, it will be added to the terminalHistory
                        if (command.component) {
                            component = command.component; // Render the corresponding component if available
                        }
                    } else {
                        output = unknownCommand(inputCmd);
                    }
                    break;
                }
            }
        }

        // Update the terminal history
        setTerminalHistory((prevHistory) => [
            ...prevHistory,
            { command: inputCmd, output, component },
        ]);
    };

    const unknownCommand = (inputCmd) => {
        return (
            <div className="output-unknown">
                Unknown command: &#39;{inputCmd}&#39; <br />
                Check the spelling of the command or &#39;
                {/*exit single quote code */}
                <span
                    className="output-unknown-tag"
                    onClick={() => processCommand("-help")}
                >
                    -help
                </span>
                &#39;
            </div>
        );
    };

    // Generates the output for the "-help" command
    const generateHelpOutput = () => {
        const commandsList = COMMANDS.map((cmd, index) => (
            <div key={index} className="command-item">
                {/* When the list of commands are outputted when user types '-help'
                Allow users to click any of them and execute said command */}
                <span
                    className="command-cmd"
                    onClick={() => processCommand(cmd.cmd)}
                >
                    {cmd.cmd || ""}
                </span>
                <span className="command-desc">{cmd.desc}</span>
            </div>
        ));

        const secretMessage = (
            <div className="secret-message">
                Hint: There are two secret commands! Can you guess it?
            </div>
        );

        return (
            <div>
                {commandsList}
                {secretMessage}
            </div>
        );
    };

    // Pick a random response from the HELLO array
    const generateHelloOutput = () => {
        const randomResponse = HELLO[Math.floor(Math.random() * HELLO.length)];
        return randomResponse;
    };

    // Clears the terminal history
    const clearTerminal = () => {
        setTerminalHistory([]);
    };

    // Handle user pressing Enter
    const handleKeyDown = (event) => {
        // Detect if Caps Lock is on
        // if (event.getModifierState("CapsLock")) {
        //     setCapsLock(true);
        // } else {
        //     setCapsLock(false);
        // }

        let matchingCommands = [];
        let currentMatchIndex = 0; // Keeps track of the current match index

        if (event.key === "Tab") {
            event.preventDefault(); // Prevent the default tab behavior

            // Get the matching commands based on the current input
            matchingCommands = COMMANDS.filter((command) =>
                command.startsWith(inputVal)
            );

            if (matchingCommands.length === 1) {
                // If there's exactly one match, complete the input
                setInputVal(matchingCommands[0]);
            } else if (matchingCommands.length > 1) {
                // If there are multiple matches, cycle through them using the currentMatchIndex
                currentMatchIndex =
                    (currentMatchIndex + 1) % matchingCommands.length;
                setInputVal(matchingCommands[currentMatchIndex]);
            }
        }

        if (event.key === "Enter") {
            const inputCmd = inputVal.trim(); // Trim white spaces
            processCommand(inputCmd);
            setInputVal(""); // Clear input field
        }
    };

    // Check if Caps Lock is on

    // When window or div is clicked, focus on the input field
    const handleDivClick = () => {
        inputRef.current && inputRef.current.focus();
    };

    // Click listener for focusing on the input field
    useEffect(() => {
        document.addEventListener("click", handleDivClick);
        return () => {
            document.removeEventListener("click", handleDivClick);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [terminalHistory]);

    return (
        <div className="terminal-container">
            <div className="terminal-content">
                {generateBanner()}

                {/* Iterate through the terminal history array and render the objects */}
                {terminalHistory.map((entry, index) => (
                    <div key={index} className="terminal-line">
                        <span className="prompt">C:\Users\KEsquejo&gt;</span>
                        <span className="terminal-command">
                            {entry.command}
                        </span>
                        <div className="entry-output"> {entry.output}</div>
                        {/* Render the component if present */}
                        {entry.component && (
                            <div className="component-container">
                                {entry.component}
                            </div>
                        )}
                    </div>
                ))}

                {/* User input */}
                <div className="terminal-line">
                    <span className="prompt">C:\Users\KEsquejo&gt;</span>
                    <input
                        ref={inputRef}
                        value={inputVal}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        type="text"
                        className="terminal-input"
                    />

                    {/* Show Caps Lock warning */}
                    {/* {capsLock && (
                        <div className="caps-lock-warning">Caps Lock is ON</div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default Terminal;
