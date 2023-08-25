import {
  formatAndSetCVC,
  formatAndSetCcNumber,
  formatAndSetMonth,
  formatAndSetName,
  formatAndSetYear,
  validateSubmission,
} from "../../utils/utilities";
import { useCreditContext } from "../CreditCard";

const CreditForms = () => {
  const { data, setData, error, setError } = useCreditContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError((curr) => {
      const newError = validateSubmission(curr, data);
      console.log(newError);
      if (newError.isError) {
        console.log("not submitted");
      } else {
        console.log("Submitted");
        setData((curr) => {
          return { ...curr, submitted: true };
        });
      }
      return newError;
    });
  };

  const handleOnChange = (type, value) => {
    console.log(type, value);
    if (type === "cardNumber") {
      const cardNumber = formatAndSetCcNumber(value);
      console.log(cardNumber);
      setData({ ...data, [type]: cardNumber });
    } else if (type === "name") {
      const name = formatAndSetName(value);
      setData({ ...data, [type]: name });
    } else if (type === "month") {
      const month = formatAndSetMonth(value);
      setData({ ...data, [type]: month });
    } else if (type === "year") {
      const year = formatAndSetYear(value);
      setData({ ...data, [type]: year });
    } else {
      const ccv = formatAndSetCVC(value);
      setData({ ...data, [type]: ccv });
    }
  };
  return (
    <form
      className="flex flex-col gap-4 max-w-sm justify-center"
      onSubmit={handleSubmit}
    >
      <div className="">
        <label htmlFor="name" className="uppercase text-sm mb-2 block">
          cardholder name
        </label>
        <input
          type="text"
          id="name"
          className={
            error.isError && error.name !== ""
              ? "border border-red-500 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
              : "border border-gray-300 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
          }
          placeholder="e.g. Jane Appleseed"
          autoComplete="off"
          onChange={(e) => {
            handleOnChange("name", e.target.value);
          }}
          value={data.name}
        />
        {error.isError && (
          <div className="text-xs text-red-500 mt-1">{error.name}</div>
        )}
      </div>
      <div className="">
        <label htmlFor="cardNumber" className="uppercase text-sm mb-2 block">
          card number
        </label>
        <input
          type="text"
          id="cardNumber"
          className={
            error.isError && error.cardNumber !== ""
              ? "border border-red-500 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
              : "border border-gray-300 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
          }
          placeholder="e.g. 1234 5678 9123 0000"
          autoComplete="off"
          onChange={(e) => {
            handleOnChange("cardNumber", e.target.value);
          }}
          value={data.cardNumber}
          max={19}
        />
        {error.isError && (
          <div className="text-xs text-red-500 mt-1">{error.cardNumber}</div>
        )}
      </div>
      <div className="flex">
        {/* EXP. DATE (MM/YY) */}
        <div className="w-1/2">
          <label htmlFor="month" className="uppercase text-sm mb-2 block">
            exp. date (mm/yy)
          </label>
          <div className="flex gap-x-2 mr-3.5">
            <input
              type="text"
              id="month"
              className={
                error.isError &&
                error.expDate.msg !== "" &&
                error.expDate.for.includes("month")
                  ? "border border-red-500 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
                  : "border border-gray-300 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
              }
              placeholder="MM"
              autoComplete="off"
              onChange={(e) => {
                handleOnChange("month", e.target.value);
              }}
              value={data.month}
            />
            <input
              type="text"
              id="year"
              className={
                error.isError &&
                error.expDate.msg !== "" &&
                error.expDate.for.includes("year")
                  ? "border border-red-500 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
                  : "border border-gray-300 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
              }
              placeholder="YY"
              autoComplete="off"
              onChange={(e) => {
                handleOnChange("year", e.target.value);
              }}
              value={data.year}
            />
          </div>
          {error.isError && (
            <div className="text-xs text-red-500 mt-1">{error.expDate.msg}</div>
          )}
        </div>
        {/* cvc */}
        <div className="w-1/2">
          <label htmlFor="cvc" className="uppercase text-sm mb-2 block">
            cvc
          </label>
          <input
            type="text"
            id="cvc"
            className={
              error.isError && error.cvc !== ""
                ? "border border-red-500 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
                : "border border-gray-300 rounded-md w-full h-11 px-4 outline-none focus:border-indigo-500"
            }
            placeholder="e.g. 123"
            autoComplete="off"
            onChange={(e) => {
              handleOnChange("cvc", e.target.value);
            }}
            value={data.cvc}
          />
          {error.isError && (
            <div className="text-xs text-red-500 mt-1">{error.cvc}</div>
          )}
        </div>
      </div>
      <button className="bg-violet-950 text-white rounded-md py-3 hover:bg-violet-700 active:bg-violet-800 mt-3">
        Confirm
      </button>
    </form>
  );
};
export default CreditForms;
