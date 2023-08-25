import { createContext, useContext, useState } from "react";
import CardDisplay from "./cardDisplay/CardDisplay";
import CardInputs from "./cardForm/CardInputs";

const CreditContext = createContext();

export const useCreditContext = () => {
  return useContext(CreditContext);
};

const CreditCard = () => {
  const [data, setData] = useState({
    submitted: false,
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [error, setError] = useState({
    isError: false,
    name: "",
    cardNumber: "",
    expDate: { msg: "", for: [] },
    cvc: "",
  });

  return (
    <CreditContext.Provider value={{ data, setData, error, setError }}>
      <main className=" font-creditCard text-base tracking-wide md:flex items-center h-screen w-full max-w-screen-2xl 2xl:mx-auto">
        <CardDisplay />
        <CardInputs />
      </main>
    </CreditContext.Provider>
  );
};
export default CreditCard;
