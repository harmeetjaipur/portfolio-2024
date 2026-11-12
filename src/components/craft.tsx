import { craft, motto, tools } from "../content";
import Sway from "./sway";

const Craft: React.FC = () => (
  <section className="section" id="craft" aria-labelledby="craft-title">
    <div className="wrap">
      <header className="section-head">
        <span className="section-head__index">02</span>
        <h2 className="section-head__title" id="craft-title">
          <Sway text="The" /> <em><Sway text="craft" /></em>
        </h2>
      </header>
      <p className="craft__motto">
        {motto.map((word) => (
          <span key={word}>
            <Sway text={word} />
          </span>
        ))}
      </p>
      <div className="craft">
        {craft.map((item) => (
          <article className="craft__item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
      <p className="craft__tools">
        <span className="craft__tools-label">Tools</span>
        {tools.join(" · ")}
      </p>
    </div>
  </section>
);

export default Craft;
