import axios from "axios";
import React, { useEffect, useState } from "react";
import writeCurrencyData, { db } from "../config/firebase";
import CurrencyTable from "../components/UI/CurrencyTable";
import { get, ref } from "firebase/database";
import Loading from "../components/Loading";
import { getAuth, signInAnonymously } from "firebase/auth";

const CurrencyPage = ({ search }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const getData = async () => {
    await axios
      .get("https://still-depths-79348.herokuapp.com/today.xml")
      .then((res) => {
        setData(res.data);
        const auth = getAuth();
        signInAnonymously(auth)
          .then((res) => {})
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      });
  };

  const getAllData = async () => {
    await get(ref(db, "/currency")).then((onsnapshot) =>
      setAllData(Object.values(onsnapshot.val()))
    );
  };

  const storeData = async () => {
    await CertainData?.map((data) =>
      writeCurrencyData(
        data.getElementsByTagName("CurrencyName")[0].innerHTML,
        data.attributes[2].value,
        data.getElementsByTagName("ForexSelling")[0].innerHTML,
        data.getElementsByTagName("ForexBuying")[0].innerHTML,
        Date[0]?.attributes[2].value.replace("/", ""),
        Date[0]?.attributes[0].value,
        data.getElementsByTagName("BanknoteSelling")[0].innerHTML,
        data.getElementsByTagName("BanknoteBuying")[0].innerHTML
      )
    );
  };

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/xml");

  const Date = xmlDoc.getElementsByTagName("Tarih_Date");
  const Currency = [...xmlDoc.getElementsByTagName("Currency")];
  const CertainData = Currency?.filter(
    (x) =>
      x.getElementsByTagName("CurrencyName")[0].innerHTML === "US DOLLAR" ||
      x.getElementsByTagName("CurrencyName")[0].innerHTML ===
        "POUND STERLING" ||
      x.getElementsByTagName("CurrencyName")[0].innerHTML === "EURO"
  );

  useEffect(() => {
    getData();
    storeData();
    if (allData.length === 0) {
      getAllData();
    }
  }, [CertainData]);
  return (
    <div>
      {allData.length !== 0 ? (
        <CurrencyTable
          BultenNo={Date[0]?.attributes[2].value}
          Tarih={Date[0]?.attributes[0].value}
          allData={allData}
          search={search}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Loading size={150} />
        </div>
      )}
    </div>
  );
};

export default CurrencyPage;
