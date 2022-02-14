import "./index.css";

const ShowWrapper = ({changeDate, airDate, nexpisode}) => (
    <div className="episode">
    <div>Next Air Date: {airDate.pst}</div>
    <br />
    <button onClick={changeDate}>
                            {nexpisode}
                            <br />
                            remaining...
        </button>
    </div>
    );
    
    export default ShowWrapper;