import React from "react";

const Details = (props) => {
  return (
    <div>
      <h1>hi</h1>

      {/* renders props details to the DOM */}
      <pre>
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
    </div>
  );
};

export default Details;
