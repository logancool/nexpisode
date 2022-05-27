import { toPST } from "../utilities/parseDate";
import "./index.css";

const today = toPST(new Date());
const ShowWrapper = ({ changeDate, airDate, nexpisode }) => (
  <div className="episode">
    <div>
      Next Air Date: {airDate.pst > today ? airDate.pst : "¯\\_(ツ)_/¯"}
    </div>
    <br />
    <button onClick={changeDate}>
      {nexpisode}
      <br />
      remaining...
    </button>
  </div>
);

export default ShowWrapper;
