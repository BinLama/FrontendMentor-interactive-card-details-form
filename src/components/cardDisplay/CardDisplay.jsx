import cardFront from "../../assets/images/bg-card-front.png";
import cardBack from "../../assets/images/bg-card-back.png";
import { useCreditContext } from "../CreditCard";

const CardDisplay = () => {
  const { data } = useCreditContext();

  const monthFormat = () => {
    if (data.month.length === 0) {
      return "00";
    } else if (data.month.length === 1) {
      return `0${data.month}`;
    } else {
      return data.month;
    }
  };

  return (
    <section className="flex-1">
      <h1 className="hidden">Credit Card Display</h1>
      <div className="mb-20 relative bg-[url('../../assets/images/bg-main-mobile.png')] text-white h-60 md:h-screen md:bg-[url('../../assets/images/bg-main-desktop.png')] md:mb-0 md:w-4/5 md:bg-repeat-y">
        {/* data presentation */}
        <div className="absolute w-72 right-7 top-10 top-custom md:-right-1/4 lg:w-96 ">
          <div className="relative">
            <img src={cardBack} alt="credit card back" />
            <span className="absolute card__cvc right-10 text-xs lg:text-sm lg:right-12">
              {data.cvc.length === 0 ? "000" : data.cvc}
            </span>
          </div>
        </div>
        <div className="absolute -bottom-12 w-72 left-7 md:bottom-1/2 md:left-1/4 lg:w-96 ">
          <div className="relative">
            <img src={cardFront} alt="credit card front" />

            {/* design */}
            <span className=" absolute bg-white w-9 h-9 top-7 left-7 rounded-full lg:w-12 lg:h-12 "></span>
            <span className=" absolute border-2 w-3.5 h-3.5 top-10 left-20 rounded-full lg:w-6 lg:h-6 lg:left-24 "></span>

            {/* data presentation */}
            <span className="absolute bottom-12 text-lg left-7 tracking-widest lg:text-2xl lg:left-9 lg:bottom-16">
              {data.cardNumber.length === 0
                ? "0000 0000 0000 0000"
                : data.cardNumber}
            </span>
            <span className="absolute bottom-4 left-7 uppercase text-xs lg:text-sm lg:left-9">
              {data.name.length === 0 ? "jane appleseed" : data.name}
            </span>
            <span className="absolute bottom-4 right-7 text-xs lg:text-sm">
              {monthFormat()}/{data.year.length === 0 ? "00" : data.year}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CardDisplay;
