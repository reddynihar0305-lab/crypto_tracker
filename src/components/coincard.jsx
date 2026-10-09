import "../styling/coincard.css"
import { Link } from "react-router-dom";

function Coincard({ coin }) {
  function formatNumber(num) {
    if (num >= 1_000_000_000_000) {
        return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    }

    if (num >= 1_000_000_000) {
        return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }

    if (num >= 1_000_000) {
        return `$${(num / 1_000_000).toFixed(2)}M`;
    }

    if (num >= 1_000) {
        return `$${(num / 1_000).toFixed(2)}K`;
    }

    return `$${num}`;
}
  const changeNum = Number(coin.price_change_percentage_24h);
  const changeValid = Number.isFinite(changeNum);
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin_card">
        <div className="coin_card_head">
          <img src={coin.image} alt={coin.name} className="coin_img"/>
          <div style={{display:"flex",flexDirection:"column"}}>
          <h3 className="coin_name">{coin.name}</h3>
          <h4 style={{color:"gray"}}>{coin.symbol.toUpperCase()}</h4>
          </div>
        </div>
        <h4 className="coin_rank">#{coin.market_cap_rank}</h4>
        <div className="coin_price">
          <p className="coin_p">Current Price :</p>
          <p className="coin_cp">${coin.current_price.toFixed(2)}</p>
          </div>
          <hr></hr>
          <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              <h5 style={{color:"grey",}}>MARKET CAP</h5>
              <h4 style={{color:"rgb(237, 227, 214)"}}>{formatNumber(coin.market_cap)}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              <h5 style={{color:"grey",}}>VOLUME</h5>
              <h4 style={{color:"rgb(237, 227, 214)"}}>{formatNumber(coin.total_volume)}</h4>
            </div>
          </div>
          {changeValid ? (
            <p className={`changein24hrs ${changeNum > 0 ? 'up' : 'down'}`}>
              {changeNum >= 0 ? '+' : ''}{changeNum.toFixed(2)}%
            </p>
          ) : (
            <p className="changein24hrs">Nan</p>
          )}
        
      
    </div>   
    </Link>
  );
}

export default Coincard