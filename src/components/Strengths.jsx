import SectionHeading from "./SectionHeading.jsx";
import { skills, tools } from "../data/portfolio.js";

export default function Strengths() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <SectionHeading
          index="04"
          tag="CAPABILITIES"
          title="我的优势"
          desc="能力不是名词的堆砌，而是能把一件事真正做好的素养。"
        />

        <div className="skills__grid">
          {skills.map((skill) => (
            <article className="skill" key={skill.index} data-reveal>
              <span className="glow" aria-hidden="true" />
              <div className="skill__top">
                <span className="skill__index">{skill.index}</span>
                <span className="skill__level">{skill.level}</span>
              </div>
              <h3 className="skill__title">{skill.title}</h3>
              <span className="skill__en">{skill.en}</span>
              <p className="skill__desc">{skill.desc}</p>
            </article>
          ))}
        </div>

        <div className="skills__tools" data-reveal>
          <span className="skills__tools-label">常用工具</span>
          <div className="tools">
            {tools.map((tool) => (
              <div className="tool" key={tool.name}>
                <span className="tool__badge">{tool.short}</span>
                <span className="tool__name">{tool.name}</span>
                <span className="tool__track">
                  <i style={{ width: `${tool.level}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
