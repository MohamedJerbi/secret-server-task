import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import createSecret from "./queries/addSecret";
import Secret from "./types/Secret";
import Alert from "@mui/material/Alert";
import { API_URL } from "./config/defaultConfigs";
import "./App.css";

function App() {
  const [secretText, setSecretText] = useState<string>("");
  const [expiresAfter, setExpiresAfter] = useState<number>(0);
  const [secretGeneratedUrl, setGeneratedSecretUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);

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

  const handleSetError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  }, []);

  const handleGenerateSecretUrl = useCallback(() => {
    if (!secretText) {
      document.getElementById("secretInput")?.focus();
      handleSetError("Please enter a secret");
      setTimeout(() => setError(""), 5000);
      return setSubmit(true);
    }
    setLoading(true);
    createSecret({ secretText, expiresAfter })
      .then(
        ({ data: { hash } }: { data: Secret }) => {
          setGeneratedSecretUrl(`${process.env.API_URL || API_URL}/${hash}`);
          setSuccess(true);
          setTimeout(() => setSuccess(null), 5000);
        },
        (error) => {
          handleSetError(error.toString());
        }
      )
      .finally(() => setLoading(false));
  }, [secretText, expiresAfter, handleSetError]);

  return (
    <div>
      {error && <Alert severity="error">{error.toString()}</Alert>}
      {success && (
        <Alert severity="success">
          Your secret url was generated succefully!
        </Alert>
      )}
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} style={{ marginTop: "20vh" }}>
            <Grid className="flex-center" item xs={6}>
              <TextField
                id="secretInput"
                label="Secret Text"
                placeholder="my secret"
                value={secretText}
                onChange={handleSetSecret}
                autoFocus
                fullWidth
                error={submit && secretText.length === 0}
              />
            </Grid>
            <Grid className="flex-center" item xs={3}>
              <TextField
                label="Expires After"
                type={"number"}
                value={expiresAfter}
                onChange={handleSetExpiresAfter}
              />
            </Grid>
            <Grid className="flex-center" item xs={3}>
              {loading ? (
                <CircularProgress className="flex-center" />
              ) : (
                <Button variant="contained" onClick={handleGenerateSecretUrl}>
                  Generate secret URL
                </Button>
              )}
            </Grid>
            <Grid className="flex-center" item xs={12}>
              <p>*Expiration Time (in seconds), 0 means never expire</p>
            </Grid>
            {secretGeneratedUrl && (
              <>
                <Grid className="flex-center" item xs={8}>
                  <Input value={secretGeneratedUrl} fullWidth />
                </Grid>
                <Grid className="flex-center" item xs={2}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigator.clipboard.writeText(secretGeneratedUrl)
                    }
                  >
                    Copy
                  </Button>
                </Grid>
                <Grid className="flex-center" item xs={2}>
                  <Button
                    variant="outlined"
                    href={secretGeneratedUrl}
                    target="_blank"
                  >
                    Open
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
