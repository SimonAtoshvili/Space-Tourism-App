import { useParams, Link } from "react-router-dom"
import { useMyContext } from '../Context.jsx'
import { useEffect, useState } from "react";
import '../styles/crew.css'

export default function CrewElement() {
    const { data } = useMyContext();

    const [memberData, setMemberData] = useState<any>()
    let crewMember = useParams<{ crewId: string }>()

    useEffect(() => {
        setMemberData(data?.crew.filter((element: any) => element.name == crewMember.crewId?.split('-').join(' '))[0])
    }, [data, crewMember])

    return (
        <>
            {
                memberData ?
                    <div className="page_root" id='crew_root'>
                        <div className='common'>
                            <h2><span>02</span>Meet your crew</h2>
                            <div className='gross_content'>
                                <div className="content" id="crew_content">
                                    <h3 className='role'>{memberData.role}</h3>
                                    <h1 className='crew_name'>{memberData.name}</h1>
                                    <p className="description" id="crew_desc">
                                        {memberData.bio}
                                    </p>
                                    <div className="crew_nav">
                                        {data?.crew.map((item: any, index: number) => (
                                            <Link key={index} to={`/crew/${item.name.split(' ').join('-')}`}>
                                                <div
                                                    className='crew_li'
                                                    style={item.name == crewMember.crewId?.split('-').join(' ') ? { backgroundColor: '#FFF' } : {}}
                                                >
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <img className="crew_img" src={memberData.images.png} alt="" />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}