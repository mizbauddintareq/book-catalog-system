import heroBG from "../assets/pexels-aline-viana-prado-2465877.jpg";
export default function Hero() {
  return (
    <div
      className="hero min-h-[70vh]"
      style={{
        backgroundImage: `url(${heroBG})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="mx-auto">
          <h1 className="mb-5 text-5xl font-bold max-w-xl">
            Explore the Enchanting Realm of Books
          </h1>
          <p className="mb-5 max-w-xl">
            A gateway to a world of knowledge, imagination, and inspiration.
            Explore our vast collection of books spanning various genres, from
            timeless classics to contemporary masterpieces
          </p>
        </div>
      </div>
    </div>
  );
}
