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

  return (
    <div className="wrapper">
      <div>When is the next episode?</div>
      <div className="shows">
        {userShows.length === 0 ? (
          <div>No shows added yet!</div>
        ) : (
          userShows.map(show => {
            const showSlug = show.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return (
              <a key={show.id} href={`/${showSlug}`}> {show.name}</a>
            );
          })
        )}
        <a href="/add-shows"> Add Shows</a>
      </div>
    </div>
  );
};

export default Home;
