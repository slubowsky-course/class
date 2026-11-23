import React, { useEffect, useState } from 'react'
import Header from './Header';
import Conversion from './Conversion';
import NoConversion from './NoConversion';

export default function App() {
  const [currencies, setCurrencies] = useState();
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [rate, setRate] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://api.frankfurter.dev/v1/currencies');

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const currencies = await response.json();
        console.log(currencies);
        setCurrencies(currencies);

      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      if (!to || !from) {
        return;
      }

      try {
        const response = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const rateData = await response.json();
        console.log(rateData);
        setRate(rateData.rate);

      } catch (e) {
        if (e.name === 'AbortError') {
          console.log(`successfully aborted fetch - ${to} - ${from}`)
        } else {
          console.error(e);
        }
      }
    })();

    return () => {
      abortController.abort();
    }
  }, [to, from]);

  const currencyOptions = currencies ? Object.entries(currencies).map(([k, v]) => <option value={k} key={k}>{k}-{v}</option>) : null;

  const doConversion = to && from && amount;

  return (
    <>
      <Header />
      <div>
        <select value={from} onChange={e => setFrom(e.target.value)}>
          <option hidden>from</option>
          {currencyOptions}
        </select>
        <select onChange={e => setTo(e.target.value)}>
          <option hidden>to</option>
          {currencyOptions}
        </select>

        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />

        {doConversion ? <Conversion to={to} from={from} amount={amount} rate={rate} /> : <NoConversion />}
      </div>
    </>
  )
}
