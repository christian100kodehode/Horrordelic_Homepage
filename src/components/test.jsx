import { releases } from "./release-list";

const Test = () => {
  return (
    <>
      <h2>Use a map() inside a map() function in React | LearnShareIT</h2>
      <hr />
      <ul>
        {releases.map((item) => {
          return (
            <div>
              <p>Name: {item.artist}</p>
              {/* <li>Age: {footballer.age}</li> */}
              <div>
                {item.tracklist.map((e) => {
                  return <p>{e}</p>;
                })}
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Test;
