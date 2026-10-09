const KEY ='CG-zFPJchXhar41B1PvNHDceWqr'
const BASE_URL='https://api.coingecko.com/api/v3/'


    const Getcoindata=async(id)=>{
        const response=await fetch( `${BASE_URL}coins/${id}?vs_currency=usd&per_page=50&x_cg_demo_api_key=${KEY}`)
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }
    export const Getcoinchart=async(id,days=7)=>{
        const response=await fetch( `${BASE_URL}coins/${id}/market_chart?vs_currency=usd&vs_currency=usd&days=${days}&x_cg_demo_api_key=${KEY}`)
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }
    


export default Getcoindata


