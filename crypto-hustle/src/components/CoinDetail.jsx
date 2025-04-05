import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      const details = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`
      );
      const description = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`
      );

      const detailsJson = await details.json();
      const descripJson = await description.json();

      setFullDetails({
        numbers: detailsJson.DISPLAY,
        textData: descripJson.Data[params.symbol]
      });
    };
    
    getCoinDetail().catch(console.error);
  }, [params.symbol]);

  if (!fullDetails) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <h1>
        {fullDetails.textData.FullName} ({params.symbol})
      </h1>
      <img
        src={`https://www.cryptocompare.com${fullDetails.textData.ImageUrl}`}
        alt={params.symbol}
      />
      <p>{fullDetails.textData.Description}</p>
      
      <table>
        <tbody>
          <tr>
            <td>Launch Date</td>
            <td>{fullDetails.textData.AssetLaunchDate || "N/A"}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>
              <a href={fullDetails.textData.WebsiteUrl} target="_blank" rel="noopener noreferrer">
                {fullDetails.textData.WebsiteUrl}
              </a>
            </td>
          </tr>
          <tr>
            <td>Current Price</td>
            <td>{fullDetails.numbers[params.symbol].USD.PRICE}</td>
          </tr>
          <tr>
            <td>24h Change</td>
            <td>{fullDetails.numbers[params.symbol].USD.CHANGEPCT24HOUR}%</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{fullDetails.numbers[params.symbol].USD.MKTCAP}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinDetail;