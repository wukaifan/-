export default function SectionHeading({ index, tag, title, desc, align = "left" }) {
  return (
    <div className={`section-head section-head--${align}`}>
      <div className="section-head__overline" data-reveal>
        <span className="section-head__index">{index}</span>
        <span className="section-head__line" />
        <span className="section-head__tag">{tag}</span>
      </div>
      <h2 className="section-head__title" data-reveal>
        {title}
      </h2>
      {desc && (
        <p className="section-head__desc" data-reveal>
          {desc}
        </p>
      )}
    </div>
  );
}
