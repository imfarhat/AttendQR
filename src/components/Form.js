import React from "react";
// import Header from "../components/Header.js";
function Form({ scanResult }) {
  const handleForm = async (e) => {
    console.log(scanResult);
    e.preventDefault();
    const et = e.target;
    const submitButton = et.querySelector('button[type="submit"]');

    const submitBtnInitailaValue = submitButton.innerHTML;
    submitButton.innerHTML = "Please Wait... &#x23F3;";
    submitButton.disabled = true; // Disable submit button

    try {
      // Get current date and time
      const { submitDate, submitTime } = await getDateTime();

      // Get form data
      const formData = new FormData(et);

      // Append submitDate and submitTime to the formData
      formData.append("submitDate", submitDate);
      formData.append("submitTime", submitTime);
      formData.append("formName", "Attendance");
      formData.append("origin", window.location.origin);
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        formData.append("latitude", position.coords.latitude);
        formData.append("longitude", position.coords.longitude);
      } else {
        window.alert("Please allow location to continue...");
      }

      // Example: log the formData for demonstration
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":" + pair[1]);
      }

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyEkuLZbDjFozzyl1zeWaT7pnhgYRntih48PLoyrnG6drlhMlcTwE8DQ3meD1l0-LYs/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      console.log("Response:", res.result);

      if (res.result === "error") {
        throw new Error(res.error);
      }

      submitButton.innerHTML = "Successfully Marked &check;";
      // Handle success response here
    } catch (error) {
      submitButton.innerHTML = "Sorry an Error !";
      console.log(error);
      // Handle error here
    } finally {
      //et.reset(); // Reset the form
      setTimeout(() => {
        submitButton.innerHTML = submitBtnInitailaValue;
        submitButton.disabled = false; // Enable submit button
      }, 2500);
    }
  };

  const getDateTime = async () => {
    const now = new Date();
    const dd = now.getDate().toString().padStart(2, "0");
    const mm = (now.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = now.getFullYear();
    const submitDate = `${dd}/${mm}/${yyyy}`; // dd/mm/yyyy

    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    const s = now.getSeconds().toString().padStart(2, "0");
    const submitTime = `${h}:${m}:${s}`; // hh:mm:ss

    return { submitDate, submitTime };
  };
  return (
    <>
      {scanResult && (
        <main>
          {/* <Header className="w-full" /> */}
          <section className="w-full my-8 flex items-center justify-center">
            <form
              action=""
              name="Attendance"
              onSubmit={handleForm}
              className="flex flex-col items-center justify-center gap-6"
            >
              <div className="flex flex-col items-start justify-center bg-white relative">
                <label
                  className="absolute -top-2.5 py-0.5 px-1.5 text-xs left-2 bg-white rounded"
                  htmlFor="roll"
                >
                  University Roll No.
                </label>
                <input
                  type="tel"
                  name="roll"
                  id="roll"
                  required
                  value={scanResult}
                  readOnly
                  size={30}
                  pattern="[0-9]{2,15}"
                  placeholder="Your University Roll No."
                  className="border-2 border-sky-500 focus:outline-none focus:valid:border-green-500 shadow-md rounded px-3 py-2 text-black"
                />
              </div>

              <button
                type="submit"
                className="py-3 w-full active:scale-95 active:bg-sky-600/90 transition duration-150 md:duration-200 rounded m-2 bg-sky-500 text-white font-semibold"
              >
                Mark Your Presence
              </button>
            </form>
          </section>
        </main>
      )}
    </>
  );
}

export default Form;
