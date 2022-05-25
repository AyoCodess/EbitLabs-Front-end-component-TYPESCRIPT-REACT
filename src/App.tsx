import { default as React, useEffect, useState } from "react";
import PriceContainer from "./components/PriceContainer";

function App() {
  const [price, setPrice] = useState("0000.00");
  const [price2, setPrice2] = useState("0000.00");

  const [startTime, setStartTime] = useState("");
  const [startTime2, setStartTime2] = useState("");

  const [showToolTip, setShowTooltip] = useState(false);
  const [showToolTip2, setShowTooltip2] = useState(false);

  const [positive, setPositive] = useState(false);
  const [positive2, setPositive2] = useState(false);

  const [equal, setEqual] = useState(true);
  const [equal2, setEqual2] = useState(true);

  useEffect(() => {
    let callAPI: number | null = null;

    const updatePrice = async () => {
      try {
        const response = await fetch(
          "https://ebitlabs-frontend-exercise.deno.dev/api/v1/fx/ETHUSD/ohlc",
        );

        const response2 = await fetch(
          "https://ebitlabs-frontend-exercise.deno.dev/api/v1/fx/ETHGBP/ohlc",
        );

        const data = await response.json();
        const data2 = await response2.json();

        // - getting time for tooltip
        const time =
          (+data.startTime.seconds + +data.startTime.microseconds) * 1000;

        const time2 =
          (+data2.startTime.seconds + +data2.startTime.microseconds) * 1000;

        const date = new Date(time);
        const date2 = new Date(time2);

        setStartTime(date.toISOString());
        setStartTime2(date2.toISOString());

        // - setting and checking price for increase/decrease
        checkPriceChange(data.close, data2.close);
      } catch (err) {
        console.error(err);
      }
    };

    // - checks for price every 5 seconds after initial call
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

  const handleHover2 = () => {
    if (!showToolTip2) {
      setShowTooltip2(true);
    } else {
      setShowTooltip2(false);
    }
  };

  const checkPriceChange = (price, price2) => {
    // - compare the indexes of each digit until it finds the change and push digit portions into an object properties to display in the JSX easily
    // let p = {
    //   unchanged: "",
    //   upSuffix: "",
    //   downSuffix: "",
    // };

    // setPrice((prev) => {
    // - turn prices in an array
    //   let prevPrice = Array.from(prev);
    //   let currentPrice = Array.from(price);
    //   let newCurrent = [];

    //   console.log(prevPrice);
    //   prevPrice.filter((digit, i) => {
    //     if (digit > currentPrice[digit]) {
    //       newCurrent = prevPrice.slice(+digit, -1);
    //       return (p.upSuffix = newCurrent.join(""));
    //     }

    //     if (digit < currentPrice[digit]) {
    //       newCurrent = prevPrice.slice(+digit, -1);
    //       return (p.downSuffix = newCurrent.join(""));
    //     }

    //     if (digit === currentPrice[digit]) {
    //       newCurrent = prevPrice.slice(+digit, -1);
    //       return (p.unchanged = newCurrent.join(""));
    //     }

    //     console.log("object:", p);
    //     return newCurrent;
    //   });

    //   return currentPrice;
    // });

    //, working code BUT only updates to whole number if there has been a price increase/decrease, not based on individual digits.
    setPrice((prev) => {
      if (prev) {
        if (price > prev) {
          //   console.log("higher GREEN", price, prev);
          setPositive(true);
          setEqual(false);
          return price;
        }

        if (price < prev) {
          //   console.log("lower RED", price, prev);
          setPositive(false);
          setEqual(false);
          return price;
        }

        if (price === prev) {
          //   console.log(" equal BLACK ", price, prev);
          setPositive(false);
          setEqual(true);
          return price;
        }

        return price;
      }
    });

    setPrice2((prev) => {
      if (prev) {
        if (price2 > prev) {
          //   console.log("higher GREEN", price2, prev);
          setPositive2(true);
          setEqual2(false);
          return price2;
        }

        if (price2 < prev) {
          //   console.log("lower RED", price2, prev);
          setPositive2(false);
          setEqual2(false);
          return price2;
        }

        if (price2 === prev) {
          //   console.log(" equal BLACK ", price2, prev);
          setPositive2(false);
          setEqual2(true);
          return price2;
        }

        return price2;
      }
    });
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
          <div className="flex flex-col gap-5 md:flex-row md:gap-0 relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <PriceContainer
              handleHover={handleHover}
              tradingPair={"ETH/USD"}
              equal={equal}
              price={price}
              positive={positive}
              showToolTip={showToolTip}
              startTime={startTime}
            />
            <PriceContainer
              handleHover={handleHover2}
              tradingPair={"ETH/GBP"}
              equal={equal2}
              price={price2}
              positive={positive2}
              showToolTip={showToolTip2}
              startTime={startTime2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
