import React, { useCallback, useState } from "react";
import createSecret from "./queries/addSecret";
import Secret from "./types/Secret";
import { API_URL } from "./config/defaultConfigs";
import "./App.css";

function App() {
  const [secretText, setSecretText] = useState<string>("");
  const [expiresAfter, setExpiresAfter] = useState<number>(0);
  const [secretGeneratedUrl, setGeneratedSecretUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSetSecret = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSecretText(event.target.value);
    },
    []
  );

  const handleSetExpiresAfter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpiresAfter(parseInt(event.target.value));
    },
    []
  );

  const handleGenerateSecretUrl = useCallback(() => {
    createSecret({ secretText, expiresAfter }).then(
      ({ data: { hash } }: { data: Secret }) =>
        setGeneratedSecretUrl(`${process.env.API_URL || API_URL}/${hash}`),
      (error) => setError(error.toString())
    );
  }, [secretText, expiresAfter]);
  console.log(process.env.API_URL, API_URL);
  return (
    <div className="App">
      <input value={secretText} onChange={handleSetSecret} />
      <input
        type={"number"}
        value={expiresAfter}
        onChange={handleSetExpiresAfter}
      />
      <button onClick={handleGenerateSecretUrl}>Generate secret URL</button>
      {secretGeneratedUrl && <p>{secretGeneratedUrl}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
