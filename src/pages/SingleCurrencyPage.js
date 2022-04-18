import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { Box } from "@mui/system";
import Loading from "../components/Loading";
import "./SingleCurrencyPage.css";
import LineChart from "../components/LineChart";

const SingleCurrencyPage = () => {
  const [state, setState] = useState([]);
  const [chartData, setChartData] = useState();
  const { code } = useParams();
  const getPreviousData = async () => {
    await get(ref(db, "/currency")).then((onsnapshot) =>
      setState(Object.values(onsnapshot.val()))
    );
  };

  useEffect(() => {
    getPreviousData();
  }, [state.length]);
  const filteredData = state.filter(
    (data) => data.current.currencyCode === code
  );
  useEffect(() => {
    if (filteredData.length !== 0) {
      setChartData({
        labels: [filteredData[0]?.previous.date, filteredData[0]?.current.date],
        datasets: [
          {
            label: `Forex buying for ${filteredData[0]?.previous.currencyCode}`,
            data: [
              filteredData[0]?.previous.forexbuying,
              filteredData[0]?.current.forexbuying,
            ],
            backgroundColor:
              filteredData[0]?.previous.forexbuying <
              filteredData[0]?.current.forexbuying
                ? "rgba(75, 192, 192, 0.2)"
                : "rgba(255, 99, 132, 0.2)",

            borderColor:
              filteredData[0]?.previous.forexbuying <
              filteredData[0]?.current.forexbuying
                ? "green"
                : "red",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [filteredData.length, filteredData[0]?.previous.currencyCode]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "85vh",
        minHeight: "250px",
      }}
    >
      {filteredData[0] ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "30%",
              minWidth: "135px",
              marginTop: "10px",
            }}
          >
            <img
              src={
                code === "EUR"
                  ? "https://hatscripts.github.io/circle-flags/flags/european_union.svg"
                  : code === "USD"
                  ? "https://hatscripts.github.io/circle-flags/flags/us.svg"
                  : code === "GBP"
                  ? "https://hatscripts.github.io/circle-flags/flags/gb.svg"
                  : null
              }
              alt={code}
              style={{ width: "70%", height: "70%" }}
            />
            <p style={{ marginBottom: "5px", marginTop: "0px" }}>
              {filteredData[0]?.current.currency}
            </p>
          </Box>
          <TableContainer
            className="singleContainer"
            component={Paper}
            sx={{ width: "60%", height: "30%", display: "flex" }}
          >
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Code</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>ForexBuy</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>ForexSell</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>BanknoteBuy</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>BanknoteSell</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Bulten</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[filteredData[0]?.current, filteredData[0]?.previous].map(
                  (data, index) => (
                    <TableRow
                      key={index}
                      sx={
                        index === 0
                          ? {
                              "&:last-child td, &:last-child th": { border: 0 },
                              backgroundColor: "lightgray",
                            }
                          : {
                              "&:last-child td, &:last-child th": { border: 0 },
                            }
                      }
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        size="small"
                        padding="none"
                        sx={{ paddingLeft: "3px" }}
                      >
                        {data.date}
                      </TableCell>
                      <TableCell align="center">{data.currencyCode}</TableCell>
                      <TableCell align="center" color="warning">
                        <span
                          style={
                            index === 0 &&
                            filteredData[0]?.current.forexbuying <
                              filteredData[0]?.previous.forexbuying
                              ? { color: "red" }
                              : index === 0
                              ? { color: "green" }
                              : null
                          }
                        >
                          {data.forexbuying}₺
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span
                          style={
                            index === 0 &&
                            filteredData[0]?.current.forexselling <
                              filteredData[0]?.previous.forexselling
                              ? { color: "red" }
                              : index === 0
                              ? { color: "green" }
                              : null
                          }
                        >
                          {data.forexselling}₺
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span
                          style={
                            index === 0 &&
                            filteredData[0]?.current.banknoteselling <
                              filteredData[0]?.previous.banknoteselling
                              ? { color: "red" }
                              : index === 0
                              ? { color: "green" }
                              : null
                          }
                        >
                          {data.banknoteselling}₺
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span
                          style={
                            index === 0 &&
                            filteredData[0]?.current.banknotebuying <
                              filteredData[0]?.previous.banknotebuying
                              ? { color: "red" }
                              : index === 0
                              ? { color: "green" }
                              : null
                          }
                        >
                          {data.banknotebuying}₺
                        </span>
                      </TableCell>
                      <TableCell align="center" className="singleCell">
                        {data.bulten}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Loading size={100} />
        </div>
      )}
      {chartData ? (
        <div style={{ marginTop: "20px" }}>
          <LineChart data={chartData} />
        </div>
      ) : null}
    </Box>
  );
};

export default SingleCurrencyPage;
