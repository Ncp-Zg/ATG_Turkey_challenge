import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import "./CurrencyTable.css";
import CurrencyItem from "./CurrencyItem";
import logo from "../../assets/exchangemoney.png"
import Loading from "../Loading"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicStack({ Tarih, BultenNo, allData, search }) {
  const [filter, setFilter] = React.useState(allData);
  React.useEffect(() => {
    const filteredData = allData.filter((data) => {
      let currency = data.current.currency.toUpperCase();
      return currency.includes(search.toUpperCase());
    });
    setFilter(filteredData);
  }, [search, allData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "start",
        alignItems: "center",
        height: "85vh",
        minHeight: "400px",
      }}
    >
      <img src={logo} style={{width:"150px",height:"150px",marginBottom:"20px",marginTop:"25px"}}/>
      <Box className="boxCard" sx={{ width: "50%" }}>
        <Stack spacing={2}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              Bulten No: <b>{BultenNo ? BultenNo : <Loading size={10}/>}</b>
            </span>
            <span>
              Date : <b>{Tarih ? Tarih : <Loading size={10}/>}</b>
            </span>
          </div>
          <Item>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={2}>
                <b>Country</b>
              </Grid>
              <Grid item xs={3}>
                <b>Currency</b>
              </Grid>
              <Grid item xs={3}>
                <Grid>
                  <b>Buy(₺)</b>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid>
                  <b>Sell(₺)</b>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Grid>
                  <b>%</b>
                </Grid>
              </Grid>
            </Grid>
          </Item>

          {filter.length === 0 ? (
            <Item>No matching data</Item>
          ) : (
            filter?.map((data, index) => (
              <CurrencyItem data={data} key={index} />
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
}
