import { useCreditContext } from "./CreditCard";
import complete from "../assets/images/icon-complete.svg";
const CardSubmited = () => {
  const { setData } = useCreditContext();

  const resetData = () => {
    setData({
      submitted: false,
      name: "",
      cardNumber: "",
      month: "",
      year: "",
      cvc: "",
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm w-full">
      <h2 className="hidden">Card Submitted</h2>
      <div className=" rounded-full my-10 mx-auto">
        <img src={complete} alt="complete icon " />
      </div>
      <p className="uppercase text-3xl text-center tracking-wider">
        thank you!
      </p>
      <p className="text-lg text-center text-gray-500">
        We've added your card details
      </p>
      <button
        className="bg-violet-950 text-white rounded-md py-3 hover:bg-violet-700 active:bg-violet-800 mt-3 w-full"
        onClick={resetData}
      >
        Continue
      </button>
    </div>
  );
};
export default CardSubmited;
