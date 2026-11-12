import { Fragment, useId, useMemo, useState } from "react";
import { agentCliSteps, memory } from "../content";
import Sway from "./sway";

/** Wraps each case-insensitive match of `query` in <mark>. */
const highlight = (text: string, query: string) => {
  if (!query) return text;
  const lower = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let from = 0;
  let at = lower.indexOf(query);
  while (at !== -1) {
    parts.push(text.slice(from, at));
    parts.push(<mark key={at}>{text.slice(at, at + query.length)}</mark>);
    from = at + query.length;
    at = lower.indexOf(query, from);
  }
  parts.push(text.slice(from));
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
};

const Workshop: React.FC = () => {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();

  const results = useMemo(
    () =>
      memory.filter(
        (entry) =>
          !q ||
          entry.title.toLowerCase().includes(q) ||
          entry.summary.toLowerCase().includes(q) ||
          entry.tags.some((tag) => tag.includes(q))
      ),
    [q]
  );

  return (
    <section className="section" id="workshop" aria-labelledby="workshop-title">
      <div className="wrap">
        <header className="section-head">
          <span className="section-head__index">03</span>
          <h2 className="section-head__title" id="workshop-title">
            <Sway text="The AI" /> <em><Sway text="workshop" /></em>
          </h2>
        </header>

        <div className="workshop__intro">
          <p className="workshop__lead">
            I work with AI every day, and I build the tools around it.
          </p>
          <p>
            When something in my workflow has friction, I build a small local
            tool to remove it, then keep iterating as the work changes. Most
            stay on my machine. The useful ones I share with my teammates.
          </p>
          <p className="workshop__note">
            <span aria-hidden="true">◆</span> These are personal tools built for
            my day-to-day work. They aren't published or open source, so
            there's no repo or download to link here.
          </p>
        </div>

        <div className="tool">
          <div className="tool__about">
            <p className="tool__kicker">
              Personal tool <span className="tool__private">· not published</span>
            </p>
            <h3 className="tool__name">Memory bank</h3>
            <p>
              A record of every AI agent session in my work setup, saved as a
              single local HTML page that both my agents and I can search. When I
              ask an agent about something from months ago, it looks it up in
              the memory bank instead of starting from zero. When I need the
              context myself, I search the same page.
            </p>
            <ul className="tool__points">
              <li>Records all agent work as it happens</li>
              <li>Outputs one searchable HTML page</li>
              <li>Agents use it to find older work I ask them about</li>
              <li>I use it to get context back in seconds</li>
            </ul>
          </div>

          <div className="bank" role="search">
            <div className="bank__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <p>memory-bank.html</p>
            </div>
            <label className="bank__label" htmlFor={inputId}>
              A stand-in, not the real tool: try it on the sessions that built
              this page. The real one and its work data stay private.
            </label>
            <input
              id={inputId}
              className="bank__input"
              type="search"
              placeholder="Search: kite, timeline, bend…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <p className="bank__count" aria-live="polite">
              {results.length} {results.length === 1 ? "session" : "sessions"}
            </p>
            <ol className="bank__list">
              {results.map((entry) => (
                <li className="bank__entry" key={entry.title}>
                  <p className="bank__meta">
                    <time dateTime={entry.date}>{entry.date}</time>
                    {entry.tags.map((tag) => (
                      <span key={tag}>{highlight(tag, q)}</span>
                    ))}
                  </p>
                  <p className="bank__title">{highlight(entry.title, q)}</p>
                  <p className="bank__summary">{highlight(entry.summary, q)}</p>
                </li>
              ))}
              {results.length === 0 && (
                <li className="bank__empty">Nothing here yet. Try “kite”.</li>
              )}
            </ol>
          </div>
        </div>

        <div className="tool tool--wip">
          <div className="tool__about">
            <p className="tool__kicker">
              <span className="tool__status" aria-hidden="true" />
              In progress <span className="tool__private">· personal, not published</span>
            </p>
            <h3 className="tool__name tool__name--mono">agent-cli</h3>
            <p>
              A layer on top of the usual CLI, built to save tokens. Agents
              repeat the same questions, lookups, file reads, and commands.
              agent-cli turns each repeat into one small command, so the
              agent asks once instead of working it out again.
            </p>
            <p>
              It works, on a small scale so far. I iterate on it every day as
              I find new repeats in my own work.
            </p>
          </div>

          <div className="steps">
            <ol className="steps__list">
              {agentCliSteps.map((step, index) => (
                <li className="steps__item" key={step.title}>
                  <span className="steps__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="steps__title">{step.title}</p>
                    <p className="steps__copy">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <figure className="steps__file">
              <figcaption>agents.md</figcaption>
              <pre>
                <code>Use agent-cli first. Prefer it over re-reading the file.</code>
              </pre>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshop;
