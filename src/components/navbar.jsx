import { Link } from "react-router-dom"
import '../styling/home.css'
import { useEffect, useState } from "react"

function Navbar({data,setfilterdcoins,filteredcoins}){
    const [searchquery,setsearchquery]=useState("")
    const [sortvalue,setsortvalue]=useState('rank')
    const[loading,setloading]=useState(false)
    const handlesearch=(e)=>{
        e.preventDefault()
        if(searchquery.trim()==""){
            return
        }
        if(loading) return
        setloading(true)
         const filtered = data.filter((coin)=>{
            return coin.name.toLowerCase().startsWith(searchquery.toLowerCase())
        })
        setfilterdcoins(filtered)
        setloading(false)
        setsearchquery("")

    }
    const handlesort=(newstate)=>{
        
        if(newstate==="rank"){
            const arry=[...filteredcoins]
            const sortrank=arry.sort((a,b)=>a.market_cap_rank - b.market_cap_rank)
            setfilterdcoins(sortrank)
        }
        else if(newstate==="dec cng 24hr"){
            const arry=[...filteredcoins]
            const sortcng=arry.sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h)
            setfilterdcoins(sortcng)
        }
        else if(newstate==="price"){
            const arry=[...filteredcoins]
            const sortcng=arry.sort((a,b)=>b.current_price.toFixed(2) - a.current_price.toFixed(2))
            setfilterdcoins(sortcng)
        }

    }
    const titleclick=()=>{
        setfilterdcoins(data)
    }

    return(
        <div className="navbar">
                <div className="nav_left">
                    <Link onClick={titleclick} className="nav_title" to='/'>Crypto Tracker</Link>
                </div>
                <div className="nav_right">
                    <form onSubmit={handlesearch}>
                        <input onChange ={(e)=>{setsearchquery(e.target.value)}} type='text' placeholder="search crypto" className="nav_search" value={searchquery}/>
                        <button type='submit' className="nav_btn">search</button>
                    </form>
                    <div className="sort_values">
                    <label className="sort_label">sort by : </label>
                    <select value={sortvalue} onChange={(e)=>{setsortvalue(e.target.value),handlesort(e.target.value)}} className="dropdown">
                        <option value='rank'>rank(default)</option>
                        <option value='dec cng 24hr'>change % in 24hrs</option>
                        <option value='price'>price</option>
                    </select>
                    </div>
                </div>
            </div>
    )
}

export default Navbar
