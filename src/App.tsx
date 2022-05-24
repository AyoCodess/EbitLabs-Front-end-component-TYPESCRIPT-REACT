import { default as React, useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState("0000.00");
  const [startTime, setStartTime] = useState("");
  const [showToolTip, setShowTooltip] = useState(false);

  useEffect(() => {
    let callAPI: number | null = null;

    const updatePrice = async () => {
      try {
        const response = await fetch(
          "https://ebitlabs-frontend-exercise.deno.dev/api/v1/fx/ETHUSD/ohlc",
        );

        const data = await response.json();
        const time = +data.startTime.seconds * 1000;
        const date = new Date(time);

        setPrice(data.close);
        setStartTime(date.toISOString());
      } catch (err) {
        console.error(err);
      }
    };

    if (!callAPI) updatePrice();
    callAPI = setInterval(updatePrice, 5000);
  }, []);

  const handleHover = () => {
    if (!showToolTip) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  return (
    <div className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ethereum Price
          </h2>
        </div>
      </div>
      <div className="pb-12 mt-10 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="w-1/3 mx-auto bg-white rounded-lg shadow-lg cursor-pointer">
                <div className=" relative flex flex-col p-6 text-center border-t border-gray-100">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    ETH/USD
                  </dt>
                  <dd
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                    className="order-1 text-5xl font-extrabold text-gray-500"
                  >
                    {price && price.toString().slice(0, 4)}
                    <span className="text-2xl">
                      .{price && price.toString().slice(5, 7)}
                    </span>
                  </dd>
                </div>
                {showToolTip && startTime && (
                  <dd className=" absolute z-10 p-2 bottom-4 ml-1 border-gray-200 rounded-md shadow text-sm w-max bg-white">
                    Date & Time: {startTime}
                  </dd>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
