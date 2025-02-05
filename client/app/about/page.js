import styles from "./page.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>Willki.dev</h1>
      <h2>2025년 1월 18일부터 서비스해오고 있는 개인 블로그입니다.</h2>
      <span>
        만드는 과정에서 발생하는 문제를 해결하는 과정을 즐기며 개발하고
        있습니다.
      </span>
      <div className={styles.aboutRepositoryCard}>
        <a href="https://github.com/st42597/my-web">
          <img
            src="https://gh-card.dev/repos/st42597/my-web.svg"
            alt="github-repo"
          />
        </a>
      </div>
      <h2>기술 스택</h2>
      <ul>
        <li>Frontend: React</li>
        <li>Backend: Node.js(Express)</li>
        <li>Proxy Server: Nginx</li>
        <li>Hosting: CloueFlare</li>
      </ul>
    </div>
  );
}

export default About;
