import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./CurrencyTable.css";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ItemComponent = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Item
      className="card"
      onClick={() => navigate(`/currency/${data.current.currencyCode}`)}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <img
            src={
              data.current.currencyCode === "EUR"
                ? "https://hatscripts.github.io/circle-flags/flags/european_union.svg"
                : data.current.currencyCode === "USD"
                ? "https://hatscripts.github.io/circle-flags/flags/us.svg"
                : data.current.currencyCode === "GBP"
                ? "https://hatscripts.github.io/circle-flags/flags/gb.svg"
                : null
            }
            alt={data.current.currencyCode}
            style={{ width: "45%", height: "30%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <b>{data.current.currency}</b>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px",
            }}
          >
            <Grid
              sx={
                data.previous.forexselling > data.current.forexselling
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              {data.current.forexselling.slice(0, 5)}₺
            </Grid>
            {data.previous.forexselling > data.current.forexselling ? (
              <ArrowDropDownIcon className="dropDown" sx={{ color: "red" }} />
            ) : (
              <ArrowDropUpIcon className="dropUp" sx={{ color: "green" }} />
            )}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px",
            }}
          >
            <Grid
              sx={
                data.previous.forexbuying > data.current.forexbuying
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              {data.current.forexbuying.slice(0, 5)}₺
            </Grid>
            {data.previous.forexbuying > data.current.forexbuying ? (
              <ArrowDropDownIcon className="dropDown" sx={{ color: "red" }} />
            ) : (
              <ArrowDropUpIcon className="dropUp" sx={{ color: "green" }} />
            )}
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid
            sx={
              data.previous.forexbuying > data.current.forexbuying
                ? { color: "red" }
                : { color: "green" }
            }
          >
            %{data.current.forexbuying < data.previous.forexbuying ? (data.current.forexbuying - data.previous.forexbuying)
              .toString()
              .slice(0, 6) : ("+".concat((data.current.forexbuying - data.previous.forexbuying).toString())).slice(0, 6)}
          </Grid>
        </Grid>
      </Grid>
    </Item>
  );
};

export default ItemComponent;
