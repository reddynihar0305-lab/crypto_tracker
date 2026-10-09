import { useEffect, useState } from "react"
import Fetchdata from "../api/crypto_api"
import Coincard from '../components/coincard'
import '../styling/home.css'
import Navbar from "../components/navbar"

function Home(){
    const[coins,setcoins]=useState([])
    const[loading,setloading]=useState(true)
    const [filteredcoins,setfilterdcoins]=useState([])
    
    const loadFetchdata=async()=>{
        try{
            const data= await Fetchdata()
            setcoins(data)
            setfilterdcoins(data)
        
        }catch(er){
            console.log(er)
            
        }finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        loadFetchdata()
    },[])

    return(
        
        <div>
            <Navbar data={coins} setfilterdcoins={setfilterdcoins} filteredcoins={filteredcoins}/>
        {loading ?( <div className="loader">
            <div className="spinner"></div>
            <h3 className="spinner_text">crypto data is loading...</h3>
        </div>
        ):(
            <div className="coin_main">
                {filteredcoins.map((coin)=>(
                    <Coincard coin={coin} key={coin.id} ></Coincard>
        )       )}
            </div>
        )}
        </div>
    )
}

export default Home