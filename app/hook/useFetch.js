import { useState, useEffect } from "react";
import axios from "axios";
// import { set } from "react-native-reanimated";
// import {RAPID_API_KEY} from "react-native-dotenv"

const rapidApiKey = process.env.RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
          ...query
        },
        headers: {
          'X-RapidAPI-Key': '4dfc059f59mshfbcc80152a0965ap1aa4d3jsndf5761350e07',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

      const fetchData = async () => {
        setIsLoading(true);
        
        try {
          const response = await axios.request(options);
          setData(response.data.data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          alert('Something went wrong, please try again later')
        } finally {
          setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);


      const refetch = () => {
        setIsLoading(true);
        fetchData();
      }

      return { data, isloading, error, refetch };
    
}

export default useFetch;