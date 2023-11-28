import { useParams, Link } from "react-router-dom"
import { useMyContext } from '../Context.tsx'
import { useEffect, useState } from "react";

import '../styles/destination.css'

interface ParamsData {
  name: string;
  images: {
    png: string;
    webp: string;
  };
  description: string;
  distance: string;
  travel: string;
}

export default function DestinationElement() {
  const { data } = useMyContext();

  const [paramsData, setParamsData] = useState<ParamsData | undefined>()
  let params = useParams<{ destId: string }>()
  console.log(params);

  useEffect(() => {
    setParamsData(data?.destinations.filter((element: ParamsData) => element.name.toLowerCase() == params.destId)[0])
  }, [data, params])

  console.log('hello');

  return (
    <>
      {
        paramsData ?
          < div className="page_root" id="destination_root" >
            <div className="common">
              <h2><span>01</span>Pick your destination</h2>
              <div className='gross_content'>
                <img className="dest_img" src={paramsData.images.png} alt="" />
                <div className="content">
                  <ul className="destination_ul">
                    {data
                      ? data.destinations.map((element: ParamsData, index: number) => (
                        <li
                          key={index}
                          style={element.name.toLowerCase() == params.destId ? { borderColor: '#FFF' } : {}}
                        >
                          <Link to={`/destination/${element.name.toLowerCase()}`} style={element.name.toLowerCase() == params.destId ? { color: '#FFF' } : {}}>{element.name}</Link></li>
                      ))
                      : null}
                  </ul>
                  <h1 className='chosen_dest'>{params.destId}</h1>
                  <p className='description'>{paramsData.description}</p>
                  <hr />
                  <div className="destination_details">
                    <div>
                      <p className='detail_name'>Avg. Distance</p>
                      <p className="detail">{paramsData.distance}</p>
                    </div>
                    <div>
                      <p className='detail_name'>Est. travel time</p>
                      <p className="detail">{paramsData.travel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
          :
          null
      }
    </>
  )
}
