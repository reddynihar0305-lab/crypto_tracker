import Navbar from "../components/navbar"
import { useParams ,Link} from "react-router-dom"
import Getcoindata from "../api/coin_api"
import {Getcoinchart} from "../api/coin_api"
import { useEffect ,useState} from "react"
import { AreaChart,Area,ResponsiveContainer,LineChart ,XAxis,YAxis,CartesianGrid,Legend,Line,Tooltip } from "recharts"
import '../styling/coinpage.css'
import {
  FaCoins,
  FaTrophy,
  FaDollarSign,
  FaCubes,
  FaRegStar,
  FaRegCalendarAlt,
} from "react-icons/fa";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";


function CoinDetails(){
    const { id } = useParams()
    const [loading,setloading]=useState(true)
    const [coin,setcoin]=useState(null)
    const [chart,setchart]=useState(null)
    const [day,setday]=useState(1)
    const [change,setchange]=useState(false)


    function formatNumber(num) {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
}

    const Getdata=async(id)=>{
        try{
           const coindata= await Getcoindata(id)
           setcoin(coindata)
        }catch(er){
            console.log(er)
        }finally{
            setloading(false)
        }
        
    }
    const Getchart=async(id,days)=>{
        setchange(true)
        try{
           const coinchart= await Getcoinchart(id,days)
           setchart(coinchart.prices)
        }catch(er){
            console.log(er)
        }finally{
            setchange(false)
        }
        
    }
    useEffect(()=>{
        Getdata(id)
        Getchart(id,day)
    },[id,day])

const formattedData = day > 1
  ? chart?.map((item) => ({
      time: new Date(item[0]).toLocaleDateString(),
      price: Number(item[1].toFixed(2)),
    }))
  : chart?.map((item) => ({
      time: new Date(item[0]).toLocaleTimeString(),
      price: Number(item[1].toFixed(2)),
    }));


    return(
        <div className="container">
            {loading ? (
                <div className="loader">
                    <div className="spinner"></div>
                    <h3 className="spinner_text">crypto analysis is loading...</h3>
                </div>
            ) : (
            <div className="container">
                {coin? (
                <div >
                    <div className="navbar">
                        <div className="nav_left">
                        <Link className="nav_title" to='/'>Crypto Tracker</Link>
                        </div>
                    </div>

                        <div className="header">
                            <div className="head_left">
                                <img src={coin.image.large} className="coin_img" alt={coin.name}/>
                                <div style={{display:"flex",flexDirection:"column" ,gap:"0.5rem"}}>
                                <h2 className="coin_name">{coin.name}</h2>
                                <h4 className="coin_sym">{coin.symbol.toUpperCase()}</h4>
                                </div>
                            </div>
                            <div className="head_right">
                                <h2 style={{color:" #e4d2bc"}}>${coin.market_data.current_price.usd.toFixed(2)}</h2>
                                <div className="coin_changes">
                                <h4 className={`change ${coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2) > 0 ? 'up' : 'down'}`}>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2) >= 0 ? '+' : ''}{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%</h4>(1hr)
                                <h4 className={`change ${coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2) > 0 ? 'up' : 'down'}`}>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2) >= 0 ? '+' : ''}{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%</h4>(24hr)
                                <h4 className={`change ${coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2) > 0 ? 'up' : 'down'}`}>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2) >= 0 ? '+' : ''}{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%</h4>(7d)
                                </div>
                            </div>
                        </div>
                      
                        <div className="chart">
                            <div className="btns">
                            <button className={day==1?'btn active':"btn"} onClick={()=>{setday(1)}}>1day</button>
                            <button className={day==7?'btn active':"btn"} onClick={()=>{setday(7)}}>7days</button>
                            <button className={day==30?'btn active':"btn"} onClick={()=>{setday(30)}}>30days</button>
                            <button className={day==60?'btn active':"btn"} onClick={()=>{setday(60)}}>60days</button>
                            </div>
                            {change ?
                                    <div className="loader_chart">
                                        <div className="spinner_chart"></div>
                                        <div className="spinner_text_chart">loading...</div>
                                        
                                    </div>
                                    :(<ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={formattedData}>
                                    <defs>
                                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                                    </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="time" tick={{ fill: "#ccc", fontSize: 12 }} />
                                    <YAxis tick={{ fill: "#ccc", fontSize: 12 }} tickFormatter={coin.market_data.current_price.usd > 1000? (value) => `$${(value / 1000).toFixed(1)}k`: (value) => `$${value}`}/>

                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: "#1f1f1f",
                                        border: "1px solid #555",
                                        color: "#fff",
                                      }}
                                    />
                        
                                    <Area
                                       type="monotone"
                                       dataKey="price"
                                       stroke="#f59e0b"
                                       strokeWidth={2}
                                       fill="url(#priceGradient)"
                                    />
                                    
                                </AreaChart>
                            </ResponsiveContainer>)}
                            
                        </div>
                    <div className="stats_main">
                    <div className="stats_grid">
                    <div className="stats_comp">
                        <FaCoins className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">Market Cap:</h4>
                            <h3 className="stats_value">{formatNumber(coin.market_data.market_cap.usd)}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaTrophy className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">Market Rank:</h4>
                            <h3 className="stats_value">#{coin.market_cap_rank}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaDollarSign className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">Current Price:</h4>
                            <h3 className="stats_value">{formatNumber(coin.market_data.current_price.usd)}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaCubes className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">Total Supply:</h4>
                            <h3 className="stats_value">{formatNumber(coin.market_data.total_supply)}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaRegStar className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">All Time Highest:</h4>
                            <h3 className="stats_value">{formatNumber(coin.market_data.ath.usd)}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaRegCalendarAlt className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">All Time Highest Date:</h4>
                            <h3 className="stats_value">{coin.market_data.ath_date.usd.split('T')[0]}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaArrowTrendUp className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">24hr high:</h4>
                            <h3 className="stats_value">{formatNumber(coin.market_data.high_24h.usd)}</h3>
                        </div>
                    </div> 
                    <div className="stats_comp">
                        <FaArrowTrendDown className="icon"/>
                        <div className="stats_data">
                            <h4 className="stats_title">24hr low:</h4>
                            <h3 className="stats_value">{formatNumber(coin.market_data.low_24h.usd)}</h3>
                        </div>
                    </div> 
                </div>
                <div className="stats_desc"><h3>About {coin.name}</h3><h4>{coin.description.en.slice(0,1000)}</h4></div>
                </div>
                </div>
                
                ):(
                    <div style={{backgroundColor:'black',height:'100vh',width:'100vw',display:"flex",justifyContent:"center"}}>
                        <h1 style={{color:"whitesmoke"}}> coin not found! </h1>
                    </div>
                    )}
            
                </div>
                )}
        </div>
    )
}

export default CoinDetails
