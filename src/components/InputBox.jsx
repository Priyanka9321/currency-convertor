import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  currencyInfo = {},
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-white p-3 rounded-lg text-sm flex flex-col sm:flex-row ${className}`}
    >
      <div className="mb-2 sm:mb-0 sm:w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          style={{ width: "100%" }}
          className="outline-none bg-transparent py-1.5"
          type="number"
          placeholder="0"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="sm:w-1/2 flex flex-col sm:flex-wrap sm:flex-row justify-end">
        <p className="text-black/40 mb-2 w-full sm:w-auto">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map(({ code, country }) => (
            <option key={code} value={code}>
              {code} - {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
