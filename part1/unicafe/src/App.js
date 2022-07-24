import { useState } from "react"
import { Button } from "./components/Button";
import { Header } from "./components/Header"
import { Statistics } from "./components/Statistics";



export const App = () => {

  const [feedBack, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const [statistics, setStatistics] = useState({
    total: 0,
    average: 0,
    positive: 0
  });


  const calculateAverage = (feedback) => {

    const good = 1, bad = -1;

    const total = (feedback.good * good) + (feedback.bad * bad);

    return total;
  }


  const handleClick = name => {

    setFeedBack({ ...feedBack, [name]: feedBack[name] + 1 });

    setStatistics({
      ...statistics,
      total: statistics.total + 1,
      average: calculateAverage(feedBack),
      positive: name !== 'good' ? (feedBack.good) / (statistics.total + 1) * 100 : (feedBack.good + 1) / (statistics.total + 1) * 100
    })

  }

  if (statistics.total > 0) {
    return (
      <div>
        <Header text={'Give feedback'} />

        {Object.keys(feedBack).map((keyName) => (
          <Button
            key={keyName}
            text={keyName}
            handleClick={() => handleClick(keyName)} />
        ))}

        <Header text={'Statistics'} />

        <Statistics statistics={feedBack} header={'Feedback totals'} />

        <Statistics statistics={statistics} header={'FeedBack statistics'} />
      </div>
    );
  }
  else {
    return (
      <div>
        <Header text={'Give feedback'} />

        {Object.keys(feedBack).map((keyName) => (
          <Button
            key={keyName}
            text={keyName}
            handleClick={() => handleClick(keyName)} />
        ))}
        <Header text={'Statistics'} />
        <Header text={'No feedback given'} />
      </div>

    )
  }

}