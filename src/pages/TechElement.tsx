import { useEffect, useState } from 'react'
import { useMyContext } from '../Context.tsx'
import { Link, useParams } from 'react-router-dom';
import '../styles/tech.css'

interface NewData {
    name: string;
    images: {
        portrait: string;
        landscape: string;
    };
    description: string;
}

export default function TechElement() {
    const { data } = useMyContext();
    const params = useParams<{ techId: string }>();
    const [newData, setNewData] = useState<NewData | undefined>();

    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth < 1025);
        };

        console.log(isTablet);


        window.addEventListener('resize', handleResize);
        handleResize();
    });

    useEffect(() => {
        if ((params.techId?.split('-'))?.length == 1) {
            setNewData(data?.technology.filter((element: NewData) => element.name.toLowerCase() == params.techId)[0])
        } else {
            setNewData(data?.technology.filter((element: NewData) => element.name.toLowerCase()  == params.techId?.split('-').join(' ').toLowerCase())[0])
        }
    }, [data, params])
    return (
        <>
            {
                newData ?
                    <div className="page_root" id='tech_root'>
                        <div className='common'>
                            <h2><span>03</span>Space Launch 101</h2>
                            <div className='gross_content'>
                                <div className="content_tech">
                                    <div className="lis">
                                        {data?.technology.map((element: NewData, index: number) => (
                                            <Link
                                                to={`/technology/${data ? ((element.name).split(' ')).length == 1 ? element.name.toLowerCase() : ((element.name).split(' ')).join('-').toLowerCase() : ''}`}
                                                key={index}>
                                                <div
                                                    className='tech_li'
                                                    style={params.techId?.split('-').length == 1 ? (element.name.toLowerCase() == params.techId ? { backgroundColor: '#FFF', color: '#000' } : {}) : (element.name.toLowerCase() == params.techId?.split('-').join(' ').toLowerCase() ? { backgroundColor: '#FFF', color: '#000' } : {})}
                                                >
                                                    {index}</div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="tech_text">
                                        <h5 className='terminology'>THE TERMINOLOGY...</h5>
                                        <h4 className='tech_heading'>{newData.name}</h4>
                                        <p className="description" style={{ margin: 0 }}>
                                            {newData.description}
                                        </p>
                                    </div>
                                </div>
                                <img className='tech_img' src={isTablet ? newData.images.landscape : newData.images.portrait} alt="" />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}
