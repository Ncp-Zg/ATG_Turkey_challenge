import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { Divider } from "@mui/material";

export default function SwipeableTemporaryDrawer({ state: bool, onClose }) {
  const navigate = useNavigate();
  const arr = [
    "https://hatscripts.github.io/circle-flags/flags/us.svg",
    "https://hatscripts.github.io/circle-flags/flags/european_union.svg",
    "https://hatscripts.github.io/circle-flags/flags/gb.svg",
  ];
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {["USD", "EUR", "GBP"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              navigate(`/currency/${text}`);
              onClose();
            }}
          >
            <ListItemIcon>
              <img src={arr[index]} style={{ width: "30px", height: "30px" }} alt={text}/>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider/>
          <ListItem button onClick={() => {
              navigate("/currency");
              onClose();
            }}>
            <ListItemIcon>
              <ArrowCircleLeftOutlinedIcon sx={{ width: "30px", height: "30px",padding:"0px" }}/>
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer anchor={"right"} open={bool} onClose={onClose} onOpen={()=>(bool)}>
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
