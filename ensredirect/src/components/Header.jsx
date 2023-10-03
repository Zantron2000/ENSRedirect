import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";

// Write a react component with tailwind css styling that renders a header with the following:
// ENS Redirect on the left side, and two buttons on the right side depending on if a prop
// called signedIn is true (it is a boolean value)
// If signedIn is true, render a button with the text "My Account" and a button with the text "Sign Out"
function Header({ signedIn }) {
  console.log(signedIn);

  return (
    <div className="flex justify-between items-center py-4 px-8 border-white border-b-2 h-[10%]">
      <div className="text-2xl font-bold">ENS Redirect</div>
      <div className="flex items-between">
        {signedIn ? (
          <>
            <div className="px-2">
              <Web3NetworkSwitch />
            </div>
            <div className="px-2">
              <Web3Button label="Disconnect">Sign Out</Web3Button>
            </div>
          </>
        ) : (
          <Web3Button label="Sign In">Sign In</Web3Button>
        )}
      </div>
    </div>
  );
}

module.exports = {
  Header,
};
