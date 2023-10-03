import { useState, useEffect } from "react";
import EnsNames from "./EnsNames";
import EnsRedirect from "./EnsRedirect";

function ENS({ address }) {
  const [ensNames, updateEnsNames] = useState([]);
  const [ensTarget, updateEnsTarget] = useState("");

  const getNames = async () => {
    const response = await fetch("/api?address=garypalmerjr.eth", {
      method: "GET",
    });
    const data = await response.json();

    return data.data;
  };

  useEffect(() => {
    getNames().then((data) => {
      if (address) {
        updateEnsNames(data);
      }
    });
  }, [address]);

  return (
    <div className="flex flex-row h-full">
      <div className="basis-1/4">
        <EnsNames ensNames={ensNames} setTarget={updateEnsTarget}></EnsNames>
      </div>
      <div className="basis-3/4 border-white border-l-2 p-2">
        <EnsRedirect ensTarget={ensTarget}></EnsRedirect>
      </div>
    </div>
  );
}

export default ENS;
