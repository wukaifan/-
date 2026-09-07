import SectionHeading from "./SectionHeading.jsx";
import { projects } from "../data/portfolio.js";

export default function Projects() {
  return (
    <section id="work" className="projects section">
      <div className="container">
        <SectionHeading
          index="03"
          tag="SELECTED WORK"
          title="精选项目"
          desc="从主图详情到品牌活动，一些我引以为傲的落地作品。"
        />

        <div className="projects__grid">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`project ${project.featured ? "project--featured" : ""}`}
              data-reveal
            >
              <a
                href={project.link || "#work"}
                className={`project__cover cover--${project.cover} ${
                  project.coverImage ? "project__cover--img" : ""
                }`}
                aria-label={project.title}
              >
                <span className="glow" aria-hidden="true" />
                {project.coverImage && (
                  <img
                    className="project__cover-img"
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="project__cover-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="project__cover-cat">{project.category}</span>
                {!project.coverImage && (
                  <span className="project__cover-word">{project.title}</span>
                )}
                <span className="project__cover-more" aria-hidden="true">
                  ↗
                </span>
              </a>

              <div className="project__meta">
                <div className="project__top">
                  <h3 className="project__title">{project.title}</h3>
                  <span className="project__year">{project.year}</span>
                </div>
                <p className="project__desc">{project.desc}</p>
                <div className="project__tags">
                  {project.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__more">
          <a className="projects__more-btn" href="#main-detail">
            进入主图详情页 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
