import React from "react";

function PriceContainer({
  handleHover,
  tradingPair,
  equal,
  price,
  positive,
  showToolTip,
  startTime,
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <dl className=" mx-auto bg-white rounded-lg shadow-lg ">
        <div className=" relative flex flex-col p-6 text-center border-t border-gray-100">
          <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
            {tradingPair}
          </dt>
          <dd
            onMouseOver={handleHover}
            onMouseOut={handleHover}
            className="border-1 text-5xl font-extrabold text-gray-500 cursor-pointer"
          >
            {equal && <span>{price.toString().slice(0, 4)}</span>}
            {!equal && positive && (
              <span className={positive && !equal ? "text-green-500" : ""}>
                {price.toString().slice(0, 4)}
              </span>
            )}
            {!equal && !positive && (
              <span className={!equal ? "text-red-500" : ""}>
                {price.toString().slice(0, 4)}
              </span>
            )}

            {equal && (
              <span className={"text-lg "}>
                .{price && price.toString().slice(5, 7)}
              </span>
            )}
            {!equal && positive && (
              <span className={"text-lg text-green-500"}>
                .{price && price.toString().slice(5, 7)}
              </span>
            )}
            {!equal && !positive && (
              <span className={"text-lg text-red-500"}>
                .{price && price.toString().slice(5, 7)}
              </span>
            )}
          </dd>
        </div>
        {showToolTip && startTime && (
          <dd className=" absolute z-10 p-2 bottom-4 ml-1 border-gray-200 rounded-md shadow text-sm w-max bg-white">
            Date & Time: {startTime}
          </dd>
        )}
      </dl>
    </div>
  );
}

export default PriceContainer;
