import React, { useEffect, useState } from 'react';

const Calculator = () => {
  const [weight, setWeight] = useState("");
  const [amount, setAmount] = useState("");
  const [hsnCode, setHSNCode] = useState("");
  const [finalIncentive, setFinalIncentive] = useState("");

  const data = {
    weight: weight,
    amount: amount,
    hsnCode: hsnCode,
  }
  useEffect(() => {
    fetch('http://localhost:4000/api/v1/get-hsncode')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);


  let api = 'http://localhost:4000/api/v1/create-tariff';
  const response = async (api, body) => {
    const res = await fetch(api, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  };


  const handleCalculation = () => {
    response(api, data).then(data => setFinalIncentive(data.finalIncentive));
  }

  return (
    <div><input type="text" placeholder='Weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
      <input type="text" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="text" placeholder='HSN Code' value={hsnCode} onChange={(e) => setHSNCode(e.target.value)} />
      <button onClick={handleCalculation}>Calculate RoDTEP </button>
      <div>{finalIncentive}</div>
    </div>
  )
}

export default Calculator