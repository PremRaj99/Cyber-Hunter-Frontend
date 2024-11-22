// file imports
import Hero from "../components/home/hero";
import About from "../components/home/About";
import Service from "../components/home/Service";
import Team from "../components/home/team";
import Contact from "../components/home/contact";

const Home = () => {
  return (
    <div className="bg-black m-0 p-0 w-dvw">
        <Hero />
      <hr className="mt-11" />
      <About />
      <hr className="mt-11" />
      <Service />
      <hr className="mt-11" />
      <Team />
      <hr className="mt-11" />
      <Contact />

    </div>
  );
};

export default Home;
