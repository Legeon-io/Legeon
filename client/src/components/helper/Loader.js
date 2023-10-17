import "./loader.css";
const Loader = () => {
  const spanStyles = {
    "--i": 1,
  };

  // Create an array of 20 spans with different '--i' values
  const spans = Array.from({ length: 20 }, (_, i) => (
    <span key={i} style={{ "--i": i + 1 }}></span>
  ));

  return (
    <section>
      <div className="loader">{spans}</div>
    </section>
  );
};

export default Loader;
