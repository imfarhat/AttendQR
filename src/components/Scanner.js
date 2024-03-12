import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

function Scanner({ onScanResult }) {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 3,
    });

    const success = (result) => {
      scanner.clear();
      setScanResult(result);
      // Call the onScanResult callback with the result
      if (typeof onScanResult === "function") {
        onScanResult(result);
      }
    };

    const error = (err) => {
      console.log(err);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, [onScanResult]); // This effect should only run once when component mounts

  useEffect(() => {
    const imgSelector = 'img[alt="Info icon"]';
    const divSelector =
      'div[style="position: absolute; top: 10px; right: 10px; z-index: 2; display: none; padding: 5pt; border: 1px solid rgb(23, 23, 23); font-size: 10pt; background: rgba(0, 0, 0, 0.69); border-radius: 5px; text-align: center; font-weight: 400; color: white;"]';
    const elementId = "reader__scan_region";

    const readerDiv = document.getElementById("reader");
    if (readerDiv) {
      readerDiv.removeAttribute("style");
      readerDiv.classList.add("my-4");
    }

    const requestCamBtn = document.getElementById(
      "html5-qrcode-button-camera-permission"
    );
    if (requestCamBtn) {
      requestCamBtn.removeAttribute("style");
      requestCamBtn.classList.add(
        "rounded",
        "cursor-pointer",
        "px-6",
        "py-2",
        "bg-sky-500/80",
        "text-white",
        "font-semibold",
        "mb-8"
      );
    }

    const scanLocalImgFile = document.getElementById(
      "html5-qrcode-anchor-scan-type-change"
    );
    if (scanLocalImgFile) {
      scanLocalImgFile.removeAttribute("style");
      scanLocalImgFile.classList.add(
        "rounded",
        "cursor-pointer",
        "px-6",
        "py-2",
        "text-sky-500",
        "bg-white",
        "font-semibold",
        "mt-16"
      );
    }

    // Remove image element
    const imgElement = document.querySelector(imgSelector);
    if (imgElement) imgElement.remove();

    // Remove specified div element
    const divElement = document.querySelector(divSelector);
    if (divElement) divElement.remove();

    // Get the element by its id, remove style attribute, and add classes
    const element = document.getElementById(elementId);
    if (element) {
      element.removeAttribute("style");
      element.classList.add(
        "w-full",
        "py-8",
        "flex",
        "items-center",
        "justify-center"
      );
    }
  }, [scanResult]);

  const handleReset = () => {
    setScanResult(null);
    window.location.href = window.location.origin;
  };

  return (
    <>
      {scanResult && (
        <>
          {/* <div>Success: {scanResult}</div> */}
          <div className="absolute bottom-8 w-full flex items-center justify-center z-[101]">
            <button
              onClick={handleReset}
              className="rounded cursor-pointer px-6 py-2 bg-sky-500/90 text-white font-semibold"
            >
              Re-Scan
            </button>
          </div>
        </>
      )}
      <div id="reader"></div>
    </>
  );
}

export default Scanner;
