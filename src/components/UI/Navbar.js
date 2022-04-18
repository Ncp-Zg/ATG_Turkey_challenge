import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  createTheme,
  Stack,
  TextField,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#B33030",
    },
  },
});

export default function SearchAppBar({ setSearch }) {
  const [state, setState] = React.useState(false);

  const onTagsChange = (event, value) => {
    if (value === null) {
      setSearch("");
    } else {
      setSearch(value);
      navigate("/currency")
    }
  };

  const onClose = () => {
    setState(false);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setState(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              onClick={() => {
                navigate("/currency");
              }}
            >
              <Button sx={{ color: "white" }}>Currency</Button>
            </Typography>
            <Stack spacing={3} sx={{ width: 350 }}>
              <Autocomplete
                color="success"
                id="tags-standard"
                size="medium"
                options={["EURO", "POUND STERLING", "US DOLLAR"]}
                getOptionLabel={(option) => option}
                onChange={onTagsChange}
                renderInput={(params) => (
                  <TextField
                    className="textField"
                    {...params}
                    variant="standard"
                    color="warning"
                    placeholder="Enter a currency"
                  />
                )}
              />
            </Stack>
          </Toolbar>
        </AppBar>
        <Sidebar state={state} onClose={onClose} />
      </ThemeProvider>
    </Box>
  );
}
