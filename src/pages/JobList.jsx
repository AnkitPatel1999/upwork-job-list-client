import React,{ useState, useEffect } from 'react'
import './jobList.scss'
import StarIcon from '@material-ui/icons/Star';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getJobList } from '../apiCalls/apiCalls'

const JobList = () => {
    const [error,setError] = useState();
    const [inc,setInc] = useState(0);
    const [data,setData] = useState([]);
    const [data1,setData1] = useState([]);

    const weeks = ['1 - 7','8 - 15','16 - 22'];
    //let currentWeek=weeks[inc];
    const [currentWeek,setCurrentWeek] = useState(weeks[inc]);
    const splitDate = weeks[inc].split(' ')
    const startDate = splitDate[0];
    const endDate = splitDate[2];

    let colorCondition;

    const loadAllProducts = () => {
        getJobList().then( data => {
            if(data.error) {
                setError(data.error);
            } else {
                setData1(data);
                getCurrentWeekData(startDate,endDate,data);
                console.log(startDate, endDate, data )
            }
        })
    }

    const invitedTrue = (data,index,invitation,colorCondition) => {
        return (
        <div>
            {invitation &&
            <div key={index} className="card" 
            style={ colorCondition ? { 'border-left':'12px solid #3AEBB6'} : {'border-left':'12px solid #333333'}}
            >
                 <div className="date-time">
                     <h2>{data.date}</h2>
                     <span>
                         <p>{data.time}</p>
                         <p>{data.job}</p>
                     </span>
                     
                     <span>${data.rate}/hr</span>
                 </div>
                 <div className="hr">
                     <div className="gray-hr"></div>
                 </div>
                 <div className="addresses">
                     <div className="comment">
                     <p>{data.hospitalName}</p>
                     <p>
                         <StarIcon htmlColor="#ffd11a"/>
                         <StarIcon htmlColor="#ffd11a"/>
                         <StarIcon htmlColor="#ffd11a"/>
                         <StarIcon htmlColor="#ffd11a"/>
                         <StarIcon htmlColor="#ffd11a"/>
                     </p>
                     </div>
                     <div className="address">
                         <p>{data.address}</p>
                         {/* <p>2000 NSW. Sydney</p> */}
                     </div>
                 </div>
                 <div className="buttons">
                     <div className="decline-btn"
                     style={colorCondition ? {}:{visibility:'hidden'}}
                     >
                         <button>DECLINE</button>
                     </div>
                     <div className="apply-btn">
                         <button>APPLY</button>
                     </div>
                 </div>
            </div>
             
            }
        </div>
        )
    }

    const week = () => {
        return (
            <div className="weekbar">
                <div className="icon-left" onClick={()=>getPreviousWeekData()}>
                    <ChevronLeftIcon htmlColor="lightgray"/>
                </div>
                <div className="weeks">
                    <h2>{weeks[inc]} Apr 2019</h2>
                </div>
                <div className="icon-right" onClick={()=>getNextWeekData()}>
                    <ChevronRightIcon htmlColor="lightgray"/>
                </div>
            </div>
        )
    }

    const getNextWeekData = (next) => {
        let stateInc= inc+1;
        let splitDate, startDate,endDate;
        if(stateInc <=2) {
            setInc(stateInc)
            setCurrentWeek(weeks[stateInc])
            splitDate = weeks[stateInc].split(' ')
            startDate = splitDate[0];
            endDate = splitDate[2];
            getCurrentWeekData(startDate,endDate, data1)
            console.log(startDate,endDate)
        } else {
            console.log("no data present")
        }
        

    }

    const getCurrentWeekData = (startDate,endDate,data1) => {
        let arrayx=[];
        console.log("getCurrentWeekData"+data+" startDate "+startDate+" endDate "+endDate);
        data1.map((d,index) => {
            const jobdate = d.date.split(' ');
            console.log("d.map called ");

            if(parseInt(jobdate[1]) >= startDate && parseInt(jobdate[1]) <= endDate) {
                console.log("between = "+ startDate+" , "+endDate);
                arrayx.push(d);
            }            
        })
        console.log(arrayx);
        setData(arrayx)
        setCurrentWeek(weeks[inc]);
    }

    const getPreviousWeekData = () => {
        let stateInc= inc-1;
        let splitDate, startDate,endDate;
        if(stateInc >=0) {
            setInc(stateInc)
            setCurrentWeek(weeks[stateInc])
            console.log("weeks[stateInc]"+weeks[stateInc])
            splitDate = weeks[stateInc].split(' ')
            startDate = splitDate[0];
            endDate = splitDate[2];
            getCurrentWeekData(startDate,endDate, data1)
            console.log(startDate,endDate)
        } else {
            console.log("no data present")
        }
    }

    useEffect(() => {
        loadAllProducts();
    },[]);

    return (
        <div>
            <div className="container">
                <h1>Shifts</h1>
                <p className="invite-msg">You've been invited</p>
                {data.map((data,index) =>{
                    return (
                    <>
                    {invitedTrue(data,index,data.invited ===true,colorCondition=true)}
                   </>
                    )
                })}
            
                {week()}
                
                {data.map((data,index) =>{
                    return (
                    <>
                    {invitedTrue(data,index,data.invited ===false,colorCondition=false)}
                   </>
                    )
                })}
                
            </div> 
            
        </div>
    )
}

export default JobList;
