import SectionHeading from "./SectionHeading.jsx";
import CountUp from "./CountUp.jsx";
import {
  profile,
  stats,
  education,
  experience,
} from "../data/portfolio.js";
import portrait from "../assets/portrait.jpg";

const facts = [
  { key: "姓名", value: profile.name },
  { key: "年龄", value: `${profile.age} 岁` },
  { key: "电话", value: profile.phone, href: `tel:${profile.phoneRaw}` },
  { key: "邮箱", value: profile.email, href: `mailto:${profile.email}` },
  { key: "微信", value: profile.wechat },
  { key: "坐标", value: profile.location },
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeading
          index="02"
          tag="ABOUT"
          title="关于我"
          desc="设计和商业之间，我选择站在两者的交汇处。"
        />

        <div className="about__grid">
          <div className="about__portrait" data-reveal>
            <div className="portrait-card">
              <img src={portrait} alt={`${profile.name} 人像`} />
              <div className="portrait-card__tint" aria-hidden="true" />
              <div className="portrait-card__frame" aria-hidden="true" />
              <div className="portrait-card__tag">
                <span>WK</span>
                <span>Portrait</span>
              </div>
            </div>
            <div className="about__location">
              <span className="dot" />
              {profile.location} · {profile.status}
            </div>
          </div>

          <div className="about__body">
            <div className="about__lead" data-reveal>
              {profile.bio.map((str, i) => (
                <p key={i}>{str}</p>
              ))}
            </div>

            <dl className="about__facts" data-reveal>
              {facts.map((f) => (
                <div className="fact" key={f.key}>
                  <span className="glow" aria-hidden="true" />
                  <dt className="fact__key">{f.key}</dt>
                  <dd className="fact__value">
                    {f.href ? <a href={f.href}>{f.value}</a> : f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="about__edu" data-reveal>
              <span className="about__edu-school">{education.school}</span>
              <span className="about__edu-meta">{education.major}</span>
              <span className="about__edu-period">{education.period}</span>
              <span className="about__edu-courses">{education.courses}</span>
            </div>
          </div>
        </div>

        <ul className="about__stats" data-reveal>
          {stats.map((stat) => (
            <li className="stat" key={stat.label}>
              <span className="glow" aria-hidden="true" />
              <span className="stat__num">
                <CountUp
                  to={stat.to}
                  duration={1.3}
                  className="stat__value"
                />
                {stat.unit && <span className="stat__unit">{stat.unit}</span>}
              </span>
              <span className="stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="about__experience" data-reveal>
          {experience.map((exp) => (
            <article className="exp" key={exp.company}>
              <span className="glow" aria-hidden="true" />
              <div className="exp__when">
                <span className="exp__period">{exp.period}</span>
                <span className="exp__role">{exp.role}</span>
              </div>
              <div className="exp__body">
                <h3 className="exp__company">{exp.company}</h3>
                <div className="exp__tags">
                  {exp.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="exp__points">
                  {exp.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
