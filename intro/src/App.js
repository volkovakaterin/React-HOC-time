import React, {useEffect, useState} from 'react';
import './index.css';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const withData =(Component) =>{
  function Wrapper(props) { 
    const [timeAgo, setTimeAgo] = useState(props.date);
    const now = new Date();
    const timePassed = Date.parse(now) - Date.parse(props.date);
    useEffect(()=>{
      if (timePassed < 3600000) {setTimeAgo("12 минут назад")}
     else if (timePassed >= 3600000 && timePassed < 86400000) {setTimeAgo("5 часов назад")}
     else if (timePassed >= 86400000) {setTimeAgo("Х дней назад")}
    }, []);
    return <Component  date = {timeAgo} />
  }
  return Wrapper
}

const DateTimePretty = withData(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}
