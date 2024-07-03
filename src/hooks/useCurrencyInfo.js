import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!currency) return;

    fetch(
      `https://v6.exchangerate-api.com/v6/5958173408ac0c0e9c807d19/latest/${currency}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setData(res.conversion_rates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
