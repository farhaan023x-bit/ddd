import Streak from "../components/Dashboard/Streak";
import ProgressChart from "../components/Charts/ProgressChart";
import ACChart from "../components/Charts/XPChart";
import PerformanceMeter from "../components/Charts/PerformanceMeter";
import MiniGames from "../components/Gamification/MiniGames";
import Badges from "../components/Dashboard/Badges";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import "./styles.css";
import MotivationCard from "../components/Dashboard/MotivationCard";
import DailyGoal from "../components/Dashboard/DailyGoal";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <div className="card">
        <ProgressChart />
        <div className="card-title"> Month Progress Chart</div>
      </div>

      <div className="card">
        <ACChart />
        <div className="card-title"> Weekly Accuracy Breakdown</div>
      </div>

      <div className="card">
        <PerformanceMeter />
        <div className="card-title"> Today's Performance Meter</div>
      </div>

      <div className="card">
        <MiniGames />
        <div className="card-title"> Mini Games</div>
      </div>

      <div className="card">
        <Streak />
        <div className="card-title">Streak</div>
      </div>

      <div className="card">
        <Badges />
        <div className="card-title">Achievement Badges</div>
      </div>
      <div className="card">
        <MotivationCard/>
        <div className="card-title">Quote of the Day</div>
      </div>
      <div className="card">
        <DailyGoal/>
        <div className="card-title">Daily Goals</div>
      </div>

      <div className="card leaderboard-full">
        <Leaderboard />
        <div className="card-title">Leaderboard</div>
      </div>
    </main>
  );
};

export default Dashboard;
