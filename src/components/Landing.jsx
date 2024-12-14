import WhatIsAhp from "./Steps/WhatIsAhp";
import Introduction from "./Steps/Introduction";

function Landing() {
  return (
    <>
      <div
        className="land"
        style={{
          scrollBehavior: "smooth", // Smooth scrolling for the entire container
          height: "100vh",
          overflowY: "scroll", // Enable vertical scrolling
          transition: "scroll 1.5s ease-out", // Smooth transition between scroll snaps
        }}
      >
        <Introduction />

        <WhatIsAhp />
      </div>
    </>
  );
}

export default Landing;
