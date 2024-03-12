import React, { useState } from "react";
import Scanner from "../components/Scanner.js";
import Form from "../components/Form.js";
import Header from "../components/Header.js";

function Home() {
  const [scanResult, setScanResult] = useState(null);

  const handleScanResult = (result) => {
    setScanResult(result);
  };

  return (
    <>
      <Header />
      <Scanner onScanResult={handleScanResult} />
      <Form scanResult={scanResult} />
    </>
  );
}

export default Home;
