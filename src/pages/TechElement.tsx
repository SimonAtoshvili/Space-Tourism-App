import { useEffect, useState } from 'react'
import { useMyContext } from '../Context.jsx'
import { Link, useParams } from 'react-router-dom';
import '../styles/tech.css'

export default function TechElement() {
    const { data } = useMyContext();
    const params = useParams<{ techId: string }>();
    const [newData, setNewData] = useState<undefined>();

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
            setNewData(data?.technology.filter((element: any) => element.name == params.techId)[0])
        } else {
            setNewData(data?.technology.filter((element: any) => element.name == params.techId?.split('-').join(' '))[0])
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
                                        {data?.technology.map((element: any, index: number) => (
                                            <Link
                                                to={`/technology/${data ? ((element.name).split(' ')).length == 1 ? element.name : ((element.name).split(' ')).join('-') : ''}`}
                                                key={index}>
                                                <div
                                                    className='tech_li'
                                                    style={params.techId?.split('-').length == 1 ? (element.name == params.techId ? { backgroundColor: '#FFF', color: '#000' } : {}) : (element.name == params.techId?.split('-').join(' ') ? { backgroundColor: '#FFF', color: '#000' } : {})}
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
