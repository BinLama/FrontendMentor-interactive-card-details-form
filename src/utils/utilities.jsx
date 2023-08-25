export const formatAndSetCcNumber = (value) => {
  // https://stackoverflow.com/questions/65454587/how-to-make-autospace-after-every-4-digit-in-react

  const inputVal = value.replace(/ /g, "");
  let inputNubmersOnly = inputVal.replace(/\D/g, "");
  if (inputNubmersOnly.length > 16) {
    // If entered value has a length greater than 16 then take only the first 16 digits
    inputNubmersOnly = inputNubmersOnly.substr(0, 16);
  }

  // Get nd array of 4 digits per an elemnt EX: ["4242", "4242", ...]
  const splits = inputNubmersOnly.match(/.{1,4}/g);

  let spacedNumber = "";
  if (splits) {
    spacedNumber = splits.join(" "); // join all splits with empty space
  }
  return spacedNumber;
};

export const formatAndSetName = (value) => {
  const inputVal = value.replace(/[^A-Za-z ]/g, "");

  return inputVal;
};

export const formatAndSetMonth = (value) => {
  let inputVal = value.replace(/[^0-9]/g, "");

  if (inputVal.length > 2) {
    inputVal = inputVal.substr(0, 2);
  }

  return inputVal;
};

export const formatAndSetYear = (value) => {
  let inputVal = value.replace(/[^0-9]/g, "");

  if (inputVal.length > 2) {
    inputVal = inputVal.substr(0, 2);
  }

  return inputVal;
};

export const formatAndSetCVC = (value) => {
  let inputVal = value.replace(/[^0-9]/g, "");

  if (inputVal.length > 3) {
    inputVal = inputVal.substr(0, 3);
  }

  return inputVal;
};

export const validateSubmission = (error, data) => {
  let newError = { ...error };

  for (let [key, value] of Object.entries(data)) {
    if (value === "") {
      if (key === "month" || key === "year") {
        newError = {
          ...newError,
          expDate: {
            msg: `Can't be blank`,
            for: [...newError.expDate.for, key],
          },
          isError: true,
        };
      } else {
        newError = { ...newError, [key]: "Can't be blank", isError: true };
      }
    } else {
      if (key === "name") {
        newError = {
          ...newError,
          [key]: "",
        };
      }
      if (key === "cardNumber") {
        if (value.length != 19) {
          newError = {
            ...newError,
            [key]: "Please type correct card number",
            isError: true,
          };
        } else {
          newError = {
            ...newError,
            [key]: "",
          };
        }
      }

      if (key === "month") {
        if (parseInt(value) < 1 || parseInt(value) > 12) {
          const newMessage = [];
          if (newError.expDate.for.includes("year")) {
            newMessage.push("month");
            newMessage.push("year");
          }
          newError = {
            ...newError,
            expDate: { msg: "Please type correct month", for: newMessage },
            isError: true,
          };
        } else {
          if (newError.expDate.for.includes("year")) {
            const oldMessage = newError.expDate.msg;

            newError = {
              ...newError,
              expDate: { msg: oldMessage, for: ["year"] },
            };
          } else {
            newError = {
              ...newError,
              expDate: { msg: "", for: [] },
            };
          }
        }
      }

      if (key === "year") {
        const today = new Date().getFullYear().toString().substring(2);
        if (value.length !== 2 || value < today) {
          const newMessage = [];
          if (newError.expDate.for.includes("month")) {
            newMessage.push("month");
            newMessage.push("year");
          }

          newError = {
            ...newError,
            expDate: {
              msg: "Invalid date",
              for: newMessage,
            },
            isError: true,
          };
        } else {
          if (newError.expDate.for.includes("month")) {
            const oldMessage = newError.expDate.msg;
            newError = {
              ...newError,
              expDate: { msg: oldMessage, for: ["month"] },
            };
          } else {
            newError = {
              ...newError,
              expDate: { msg: "", for: [] },
            };
          }
        }
      }

      if (key === "cvc") {
        if (value.length !== 3) {
          newError = {
            ...newError,
            [key]: "Invalid cvc",
            isError: true,
          };
        } else {
          newError = {
            ...newError,
            [key]: "",
          };
        }
      }
    }
  }

  if (
    newError.name === "" &&
    newError.cardNumber === "" &&
    newError.expDate.msg === "" &&
    newError.cvc === ""
  ) {
    newError = { ...newError, isError: false };
  }

  return newError;
};
