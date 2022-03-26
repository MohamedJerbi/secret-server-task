import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import createSecret from "./queries/addSecret";
import Secret from "./types/Secret";
import Alert from "@mui/material/Alert";
import { API_URL } from "./config/defaultConfigs";
import { successMessages, errorMessages } from "./STATIC/alerts";
import "./App.css";

const secretInputID = "secretInput";
const expiresAfterInputID = "expiresInput";
const maxExpires = 999999999999;

function App() {
  const [secretText, setSecretText] = useState<string>("");
  const [expiresAfter, setExpiresAfter] = useState<number>(0);
  const [generatedSecretUrls, setGeneratedSecretUrls] = useState<Array<string>>(
    []
  );
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
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

  const handleSetSuccess = useCallback((message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 5000);
  }, []);

  const handleGenerateSecretUrl = useCallback(() => {
    if (!secretText) {
      document.getElementById(secretInputID)?.focus();
      handleSetError(errorMessages["secret-required"]);
      setTimeout(() => setError(""), 5000);
      return setSubmit(true);
    }
    if (expiresAfter > maxExpires) {
      document.getElementById(expiresAfterInputID)?.focus();
      handleSetError(errorMessages["expiration-valid"]);
      setTimeout(() => setError(""), 5000);
      return setSubmit(true);
    }
    setLoading(true);
    createSecret({ secretText, expiresAfter })
      .then(
        ({ data: { hash } }: { data: Secret }) => {
          setGeneratedSecretUrls([
            ...generatedSecretUrls,
            `${process.env.API_URL || API_URL}/${hash}`,
          ]);
          handleSetSuccess(successMessages["secret-added"]);
          setSubmit(false);
          setSecretText("");
        },
        (error) => {
          handleSetError(error.toString());
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [
    secretText,
    expiresAfter,
    handleSetError,
    generatedSecretUrls,
    handleSetSuccess,
  ]);

  const handleCopyUrl = useCallback(
    (url: string) => {
      handleSetSuccess(successMessages["secret-copied-to-clipboard"]);
      navigator.clipboard.writeText(url);
    },
    [handleSetSuccess]
  );

  return (
    <div>
      {error && <Alert severity="error">{error.toString()}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Container maxWidth="sm" className="grid-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid className="flex-center" item md={6} xs={8}>
              <TextField
                id={secretInputID}
                label="Secret Text"
                placeholder="my secret"
                value={secretText}
                onChange={handleSetSecret}
                autoFocus
                fullWidth
                error={submit && secretText.length === 0}
              />
            </Grid>
            <Grid className="flex-center" item md={3} xs={4}>
              <TextField
                id={expiresAfterInputID}
                label="Expires After"
                type={"number"}
                value={expiresAfter}
                onChange={handleSetExpiresAfter}
              />
            </Grid>
            <Grid className="flex-center-align" item md={3} xs={12}>
              {loading ? (
                <CircularProgress className="flex-center" />
              ) : (
                <Button variant="contained" onClick={handleGenerateSecretUrl}>
                  Generate secret URL
                </Button>
              )}
            </Grid>
            <Grid className="flex-center" item xs={12}>
              <Typography variant="subtitle2">
                *Expiration Time (in seconds), 0 means never expire
              </Typography>
            </Grid>
            {generatedSecretUrls.map((url: string) => (
              <Grid
                id={url}
                container
                className="flex-center"
                style={{ justifyContent: "space-between", margin: 0 }}
                xs={12}
                spacing={2}
              >
                <Grid className="flex-center" item md={8} xs={12}>
                  <Input className="input" value={url} fullWidth />
                </Grid>
                <Grid className="flex-center" item md={2} xs={6}>
                  <Button
                    variant="outlined"
                    onClick={() => handleCopyUrl(url)}
                    fullWidth
                  >
                    Copy
                  </Button>
                </Grid>
                <Grid className="flex-center" item md={2} xs={6}>
                  <Button
                    variant="outlined"
                    href={url}
                    target="_blank"
                    fullWidth
                  >
                    Open
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
