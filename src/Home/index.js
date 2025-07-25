import './index.css';

const Home = ({ user }) => {
  if (!user) {
    return (
      <div className="wrapper">
        <div>Sign in to track your shows</div>
      </div>
    );
  }

  const userShows = user.shows || [];

  if (userShows.length === 0) {
    return (
      <div className="wrapper">
        <div>Track your favorite TV shows</div>
        <div className="shows">
          <a href="/nexpisode/add-shows"> Add Shows</a>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div>When is the next episode?</div>
      <div className="shows">
        {userShows.map(show => {
          const showSlug = show.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          return (
            <a key={show.id} href={`/nexpisode/${showSlug}`}> {show.name}</a>
          );
        })}
        <a href="/nexpisode/add-shows"> Add Shows</a>
      </div>
    </div>
  );
};

export default Home;
