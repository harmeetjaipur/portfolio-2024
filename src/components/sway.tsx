type SwayProps = {
  text: string;
  by?: "word" | "letter";
};

/**
 * Splits text into pieces the kite string can nudge as it passes.
 * Screen readers get the plain text; the split copy is hidden from them.
 */
const Sway: React.FC<SwayProps> = ({ text, by = "word" }) => {
  const parts = by === "letter" ? Array.from(text) : text.split(/(\s+)/);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((part, index) =>
          part.trim() === "" ? (
            part
          ) : (
            <span className="sway" data-sway="" key={index}>
              {part}
            </span>
          )
        )}
      </span>
    </>
  );
};

export default Sway;
