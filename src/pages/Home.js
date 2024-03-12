import React, { useState } from "react";
function Home() {
  const [user, setUser] = useState({
    roll: "",
    resetId: "",
  });

  let name, value;
  const handleInputChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const et = e.target;
    const submitButton = et.querySelector('button[type="submit"]');

    const submitBtnInitailaValue = submitButton.innerHTML;
    submitButton.innerHTML = "Wait... &#x23F3;";
    submitButton.disabled = true; // Disable submit button

    try {
      // Get current date and time
      const { submitDate, submitTime } = await getDateTime();

      // Get form data
      const formData = new FormData(et);

      // Append submitDate and submitTime to the formData
      formData.append("submitDate", submitDate);
      formData.append("submitTime", submitTime);
      formData.append("formName", et.name);
      formData.append("origin", window.location.origin);
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        formData.append("latitude", position.coords.latitude);
        formData.append("longitude", position.coords.longitude);
      }

      // Example: log the formData for demonstration
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":" + pair[1]);
      }

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw-NcvyHfgImItjDgji8I9ysah6St7VZeHCxq__EhKKyfTHWtbK0god8_Zfq3u6sbEf/exec",
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

      submitButton.innerHTML = "Success &check;";
      // Handle success response here
    } catch (error) {
      submitButton.innerHTML = "Error !";
      console.log(error);
      // Handle error here
    } finally {
      setUser({
        roll: "",
        resetId: "",
      });
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
      <main className="bg-sky-400 h-screen p-4 py-16">
        <section className="text-white">
          <form
            action=""
            name="Attendance"
            onSubmit={handleForm}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <input
              type="tel"
              name="roll"
              onChange={handleInputChange}
              value={user.roll}
              size={30}
              placeholder="You Roll No. here"
              className="rounded px-4 py-2 text-black"
            />
            <button
              type="submit"
              className="rounded px-4 py-2 bg-white text-black"
            >
              Submit
            </button>
          </form>
        </section>
        <section></section>
      </main>
    </>
  );
}

export default Home;
