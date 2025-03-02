import React, { useState, useEffect } from "react";
import "../css/joke.css";
// Joke API
// REST API (no token, membership, payment, etc)
// https://sv443.net/jokeapi/v2/#try-it

const JokeGenerator = () => {
    const [joke, setJoke] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch a random joke when the component mounts
        fetch(
            "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
        )
            .then((response) => response.json())
            .then((data) => {
                setJoke(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching joke:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading joke...</div>;
    }

    return (
        <div className="joke-container">
            {joke && (
                <>
                    {joke.type === "twopart" && (
                        <>
                            <div className="joke-setup">{joke.setup}</div>
                            <div className="joke-punchline">
                                {joke.delivery}
                            </div>
                        </>
                    )}
                    {joke.type === "single" && (
                        <div className="joke-single">{joke.joke}</div>
                    )}
                </>
            )}
        </div>
    );
};

export default JokeGenerator;
