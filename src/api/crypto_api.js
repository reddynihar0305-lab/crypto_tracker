
const KEY ='CG-zFPJchXhar41B1PvNHDceWqr'
const BASE_URL='https://api.coingecko.com/api/v3/'


    const Fetchdata=async()=>{
        const response=await fetch( `${BASE_URL}coins/markets?vs_currency=usd&per_page=50&x_cg_demo_api_key=${KEY}`)
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }


export default Fetchdata
    