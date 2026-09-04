import AmbientBackground from "./AmbientBackground.jsx";
import { profile } from "../data/portfolio.js";

const contactLinks = [
  { label: "电话", value: profile.phone, href: `tel:${profile.phoneRaw}` },
  { label: "邮箱", value: profile.email, href: `mailto:${profile.email}` },
  { label: "微信", value: profile.wechat },
  { label: "坐标", value: profile.location },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <AmbientBackground variant="contact" />
      <div className="contact__inner container">
        <p className="contact__eyebrow" data-reveal>
          <span className="section-head__index">05</span>
          <span className="section-head__line" />
          <span>CONTACT — 让我们聊聊</span>
        </p>

        <h2 className="contact__title" data-reveal>
          下一次，
          <br />
          <em>值得记住</em>的设计。
        </h2>

        <a
          className="contact__mail"
          href={`mailto:${profile.email}`}
          data-reveal
        >
          {profile.email}
        </a>

        <div className="contact__links" data-reveal>
          {contactLinks.map((link) => (
            link.href ? (
              <a key={link.label} href={link.href} className="contact__link">
                <span className="contact__link-label">{link.label}</span>
                <span className="contact__link-value">{link.value}</span>
              </a>
            ) : (
              <div key={link.label} className="contact__link">
                <span className="contact__link-label">{link.label}</span>
                <span className="contact__link-value">{link.value}</span>
              </div>
            )
          ))}
        </div>

        <div className="contact__action" data-reveal>
          <a href={`tel:${profile.phoneRaw}`} className="btn btn--solid btn--lg">
            <span>发起合作沟通</span>
            <span className="btn__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <footer className="footer">
        <span className="footer__brand">
          © 2026 {profile.name} · {profile.roleShort}
        </span>
        <span className="footer__credit">Designed &amp; Built with React + Vite</span>
        <a href="#home" className="footer__top">
          回到顶部 <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </section>
  );
}
