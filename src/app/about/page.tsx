export default function AboutPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#dde4fc', marginBottom: '0.5rem' }}>About RuneGraph</h1>
      <p style={{ color: '#ccd4ee', lineHeight: 1.7 }}>
        RuneGraph는 AI 에이전트 스킬을 중심으로, 스킬 간 연결관계와 실행 흐름을 이해하기 쉽게 정리한 오픈소스 프로젝트입니다.
      </p>

      <section style={{ marginTop: '1.5rem', background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.1rem' }}>
        <h2 style={{ color: '#dde4fc', marginTop: 0 }}>왜 만들었나요?</h2>
        <p style={{ color: '#999', lineHeight: 1.7 }}>
          AI 워크플로우는 아이디어와 구현이 자주 단절됩니다. RuneGraph는 Rune(작은 실행 단위)과 Skill(기능 단위) 시각화를 통해
          기획자·개발자·운영자가 같은 기준에서 협업할 수 있도록 만들었습니다.
        </p>
      </section>

      <section style={{ marginTop: '1rem', background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.1rem' }}>
        <h2 style={{ color: '#dde4fc', marginTop: 0 }}>비전</h2>
        <ul style={{ paddingLeft: '1.2rem', color: '#999', lineHeight: 1.8, marginTop: '0.75rem' }}>
          <li>신뢰 가능한 AI 자동화를 위해, 파이프라인이 어떻게 동작하는지 먼저 보여준다.</li>
          <li>오픈된 스킬 카탈로그로 재사용성과 팀 전파 속도를 높인다.</li>
          <li>누구나 접근 가능한 무료 기반으로 실무 적용 장벽을 낮춘다.</li>
        </ul>
      </section>
    </div>
  )
}
