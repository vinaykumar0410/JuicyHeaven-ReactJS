
import { useEffect, useState } from "react"
import './fetchingjuices.css'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const FetchingJuices = ()=>{

    // hooks
    const [drinksData,setDrinksData] = useState([])
    const [searchTerm,setSearchTerm] = useState('')
    const [loading,setLoading] = useState(false)
    const [isError,setIsError] = useState({state:'false',msg:''})

    useEffect(()=>{
        const correctURL = `${URL}${searchTerm}`
        fetchDrinksData(correctURL)
    },[searchTerm])
    // functions

    const fetchDrinksData = async (apiURL)=>{
        setLoading(true)
        setIsError({state:false,msg:''})
        try {
            const response = await fetch(apiURL);
            const {drinks} = await response.json();
            setDrinksData(drinks)
            setLoading(false)
            setIsError({state:false,msg:''})
            if(!drinks) throw new Error('Data not found')
        } catch (error) {
            setLoading(false)  
            setIsError({state:true,msg:error.message || 'Oops Something went wrong...'})
        }
    }
    return <section>
        <form>
            <input type="text" id="search" name="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search Your Drink Here" />
            <hr />
            {
                loading && !isError?.state && <h3>Loading....</h3>
            }
            {
                isError?.state && <h2 style={{color:"red"}}>{isError.msg}</h2>
            }
            {
                !loading && !isError?.state && <ul className="box">
                {
                    drinksData.map((obj)=>{
                      const  {idDrink,strDrink,strDrinkThumb} = obj;
                      return <li style={{listStyle:"none"}} className="list-item">
                        <div className="card">
                        <img src={strDrinkThumb} alt={strDrink} />
                        </div>
                        <div className="text"><h3>{strDrink}</h3></div>
                      </li>
                    })
                }
                </ul>
            }
        </form>
    </section>
}

export default FetchingJuices