import React, { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import Footer from "./components/Footer";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(""); // Initial amount is an empty string
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const currencyInfo = useCurrencyInfo(from);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const currencyData = data
          .filter((country) => country.currencies) // Ensure the country has currencies defined
          .map((country) => {
            const code = Object.keys(country.currencies)[0];
            return {
              code,
              country: country.name.common,
            };
          })
          .sort((a, b) => a.country.localeCompare(b.country)); // Sort alphabetically by country name
        setCurrencyOptions(currencyData);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, []);

  const options = currencyOptions.map(({ code }) => code);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * (currencyInfo[to] || 1)); // Default to 1 if undefined
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-grow flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="w-full mx-auto">
          <div className="w-full max-w-screen-md max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Currency Converter
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={currencyOptions}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                  currencyInfo={currencyInfo}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={currencyOptions}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                  currencyInfo={currencyInfo}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
