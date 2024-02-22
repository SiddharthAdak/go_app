import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { getScoresApi } from "../../api/game";
import { LoadingSvg } from "../../assets/Svg";
type scores = {
  member: string;
  score: number;
}
const Rank = () => {
  const [rankList, setRankList] = useState<scores[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchRankings = async() => {
    setLoading(true);
    const {data, error} = await getScoresApi();
    if (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
    else{
      setRankList(data.scores);
      setError(false);
      setLoading(false);
    }
  }
  useEffect(() => {
    const getRanks = async() => {
      await fetchRankings();
    }
    getRanks();
  }, [])
  const username = useSelector((state: RootState) => state.user.username);
  return (
    <div className=" bg-gray-100 w-screen h-screen flex items-center justify-center overflow-scroll p-10">
      <div>
      <div className=" font-semibold text-lg flex gap-2 items-center mb-2">
        <span>Leaderboard</span>
        {(!loading) && 
        <button 
        onClick={fetchRankings}
        className=" font-semibold text-sm px-3 py-1 bg-black rounded-md text-white">
          refresh
        </button>}
      </div>
      <div className=" w-[800px] bg-white max-h-[500px] rounded-md overflow-scroll shadow-md">
        <table className=" w-full text-center relative">
          <thead className="bg-black leading-0 text-white sticky top-0">
            <tr className="">
              <th className=" p-2">rank</th>
              <th className=" p-2">name</th>
              <th className=" p-2">score</th>
            </tr>
          </thead>
          {(rankList.length !== 0) ? <tbody>
            {rankList.map((e , i) => {
              return(
                <tr key={e.member} 
                className= {(
                  (e.member === username) ? " bg-green-100": 
                  (i%2 === 0) ? "bg-gray-200": "bg-white")}>
                  <td className=" p-2">{i + 1}</td>
                  <td className=" p-2">{e.member}</td>
                  <td className=" p-2">{e.score}</td>
                </tr>
              )
            })}
          </tbody>:
          <tbody>
            <tr className=" text-center">
              {
                (loading) ? <td colSpan={3} className=" p-2">
                  <LoadingSvg className="animate-spin w-6 m-auto"/>
                </td>:
                (error) ? <td colSpan={3} className=" p-2 text-red-500">some error occured. Please retry</td>:
                <td colSpan={3} className=" p-2">no data available</td>
              }
            </tr>
          </tbody>
          }
        </table>
        </div>
      </div>
    </div>
  );
};

export default Rank;
