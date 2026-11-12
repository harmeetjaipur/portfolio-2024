import { useEffect, useRef, useState } from "react";
import { roles } from "../content";
import Sway from "./sway";

type ThreadProps = {
  cut: string[];
};

/** A slightly hand-drawn line down the list, so it reads as one string. */
const threadPath = (height: number) => {
  const step = 90;
  let d = "M 12 0";
  for (let y = step, i = 1; y < height + step; y += step, i++) {
    const x = 12 + Math.sin(i * 1.7) * 3.2;
    const cx = 12 + Math.sin(i * 1.7 - 0.9) * 4.5;
    d += ` Q ${cx.toFixed(1)} ${(y - step / 2).toFixed(1)} ${x.toFixed(1)} ${Math.min(y, height).toFixed(1)}`;
  }
  return d;
};

const Thread: React.FC<ThreadProps> = ({ cut }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => setHeight(list.offsetHeight));
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="section-head">
          <span className="section-head__index">01</span>
          <h2 className="section-head__title" id="work-title">
            <Sway text="The" /> <em><Sway text="thread" /></em>
          </h2>
        </header>
        <div className="thread__intro">
          <p>
            I live in Toronto, Canada, and grew up in Jaipur, India, the Pink
            City, where the sky fills with kites every January. I speak
            English, Hindi, and Punjabi.
          </p>
          <p>
            Since 2015 my work has centered on JavaScript and React. Startups
            kept me learning daily, and I still work that way. Here is the
            whole string, from the first job to now.
          </p>
        </div>

        <div className="thread">
          <svg
            className="thread__line"
            width="24"
            height={height}
            viewBox={`0 0 24 ${height || 1}`}
            aria-hidden="true"
          >
            <path d={threadPath(height)} />
          </svg>
          <ol className="thread__list" ref={listRef}>
          {roles.map((role) => {
            const isCut = cut.includes(role.id);
            return (
              <li
                className={isCut ? "tag is-cut" : "tag"}
                data-tag={role.id}
                key={role.id}
              >
                <p className="tag__when">{role.when}</p>
                <span className="tag__knot" aria-hidden="true" />
                <div className="tag__card">
                  <h3 className="tag__place">
                    {role.href ? (
                      <a href={role.href} rel="noopener noreferrer" target="_blank">
                        {role.place}
                      </a>
                    ) : (
                      role.place
                    )}
                    {isCut && (
                      <span className="tag__cut" title="Cut in a kite fight">
                        <span aria-hidden="true">◆</span>
                        <span className="sr-only">, cut in a kite fight</span>
                      </span>
                    )}
                  </h3>
                  <p className="tag__title">{role.title}</p>
                  {role.copy && <p className="tag__copy">{role.copy}</p>}
                  {role.stack && (
                    <p className="tag__stack">
                      <span className="sr-only">Tools: </span>
                      {role.stack.join(" · ")}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Thread;
