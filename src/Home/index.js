import './index.css';

const Home = ({ user }) => {
  if (!user) {
    return (
      <div className="wrapper">
        <div>Sign in to track your shows</div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div>When is the next episode?</div>
      <div className="shows">
        <a href="/bachelor"> Bachelor</a>
        <a href="/bachelorette"> Bachelorette</a>
        <a href="/sp"> South Park</a>
        <a href="/st"> Stranger Things</a>
        <a href="/kardashians"> Keeping up with the Kardashians</a>
        <a href="/my-shows"> My Shows</a>
      </div>
    </div>
  );
};

export default Home;
