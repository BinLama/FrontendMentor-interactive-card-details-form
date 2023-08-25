import CardSubmited from "../CardSubmited";
import { useCreditContext } from "../CreditCard";
import CreditForms from "./CreditForms";

const CardInputs = () => {
  const { data } = useCreditContext();

  return (
    <section className="mx-6 flex-1 flex justify-center md:mx-0">
      <h1 className="hidden">Credit Card Information</h1>
      {data.submitted ? <CardSubmited /> : <CreditForms />}
    </section>
  );
};
export default CardInputs;
