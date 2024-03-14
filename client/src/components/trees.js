export default function Trees() {
  const styles = {
    backgroundImage: `url(/trees.jpg)`,
    backgroundPosition: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100%",
    filter: "blur(5px)",
  };

  return (
    <div className="relative">
      <div
        style={styles}
        className="absolute top-0 right-0 bottom-0 left-0"
      ></div>
    </div>
  );
}
