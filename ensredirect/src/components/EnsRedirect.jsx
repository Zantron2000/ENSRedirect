import { useState } from "react";

function EnsRedirect({ ensTarget }) {
  const [url, setUrl] = useState("");

  const redirectEns = async () => {
    const response = await fetch("/api?url=google.com", {
      method: "POST",
    });
    const data = await response.json();

    console.log(data);

    setUrl("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">{ensTarget}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form className="flex flex-col justify-center items-center mt-4">
          <input
            className="border-2 border-black rounded-md p-2 m-2 text-black"
            type="text"
            placeholder="Redirect to..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              redirectEns();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnsRedirect;
