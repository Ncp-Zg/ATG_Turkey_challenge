import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "SECRET",
  authDomain: "atgturkey-challenge.firebaseapp.com",
  projectId: "atgturkey-challenge",
  storageBucket: "atgturkey-challenge.appspot.com",
  messagingSenderId: "SECRET",
  appId: "SECRET",
  measurementId: "SECRET",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);



export default function writeCurrencyData(
  currency,
  currencyCode,
  forexselling,
  forexbuying,
  bulten,
  date,
  banknoteselling,
  banknotebuying
) {
  get(ref(db, "currency/"))
    .then((snapshot) => {
      const previousValue = snapshot.val();
      if(previousValue){

        set(ref(db, "currency/" + currency + "/current"), {
          bulten,
          currencyCode,
          currency,
          forexselling,
          forexbuying,
          date,
          banknoteselling,
          banknotebuying
        }).then(() => {
          const arr = Object.values(previousValue);
          arr.map((x) => {
            if (x.current.bulten !== bulten) {
              update(ref(db, "currency/" + x.current.currency + "/previous"), {
                bulten: x.current.bulten,
                currencyCode:x.current.currencyCode,
                currency: x.current.currency,
                forexselling: x.current.forexselling,
                forexbuying: x.current.forexbuying,
                date:x.current.date,
                banknoteselling:x.current.banknoteselling,
                banknotebuying:x.current.banknotebuying
              });
            }
          });
        });
      }else {
        set(ref(db, "currency/" + currency + "/current"), {
          bulten,
          currencyCode,
          currency,
          forexselling,
          forexbuying,
          date,
          banknoteselling,
          banknotebuying
      }).then(()=>{
        set(ref(db, "currency/" + currency + "/previous"), {
          bulten,
          currencyCode,
          currency,
          forexselling,
          forexbuying,
          date,
          banknoteselling,
          banknotebuying
        })
      })
      }

    })
}
