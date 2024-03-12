import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error() {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>hey there</h1>
      {scanResult ? <div>Success: {scanResult}</div> : <div id="reader"></div>}
    </>
  );
}
export default Scanner;
