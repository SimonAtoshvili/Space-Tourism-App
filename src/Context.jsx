import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'


const MyContext = createContext()

export const MyProvider = ({ children }) => {
    const [data, setData] = useState(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 630);
        };
    
        console.log(isMobile);
    
        window.addEventListener('resize', handleResize);
        handleResize();
      })

    useEffect(() => {
        const dataAxios = async () => {
            const response = await axios.get('../public/data.json');
            const axsiosData = await response.data;
            setData(axsiosData);
        }

        dataAxios();

    }, [])

    return (
        <MyContext.Provider value={{ data, isMobile}}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => {
    return useContext(MyContext);
};