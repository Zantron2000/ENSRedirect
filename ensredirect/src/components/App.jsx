"use client";
import { useSSX } from "@spruceid/ssx-react";

import { Header } from "./Header";
import ENS from "./Ens";

function App() {
  const { ssx, provider } = useSSX();
  const session = ssx?.session();
  const address = ssx?.address();

  return (
    <div className="App h-full">
      <Header signedIn={session}></Header>
      <div className="Content h-[90%]">
        <div className="Content-container h-full">
          {session ? <ENS address={address} /> : <ENS address={address} />}
        </div>
      </div>
    </div>
  );
}

export default App;
