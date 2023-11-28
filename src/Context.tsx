import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'

interface DataInterface {
    destinations: {
        name: string;
        images: {
            png: string;
            webp: string;
        };
        description: string;
        distance: string;
        travel: string;
    }[];
    crew: {
        name: string;
        images: {
            png: string;
            webp: string;
        };
        role: string;
        bio: string;
    }[];
    technology: {
        name: string;
        images: {
            portrait: string;
            landscape: string;
        };
        description: string;
    }[];
}

interface MyContextType {
    data: any;
    isMobile: boolean;
}

interface MyProviderProps {
    children: any;
}

const MyContext = createContext<MyContextType | undefined>(undefined)

export const MyProvider = ({ children }: MyProviderProps) => {
    const [data, setData] = useState<DataInterface | null>(null)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 630);
        };

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
        <MyContext.Provider value={{ data, isMobile }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyProvider");
    }
    return context;
};