import React from 'react';

const stats = [
  { label: '누적 거래액', value: '2,900억+' },
  { label: '연간 재구매율', value: '61%' },
  { label: '운영 브랜드', value: '18개' },
  { label: '해외 판매 국가', value: '12개' }
];

const capabilities = [
  {
    title: '브랜드 인큐베이션',
    body: '시장 신호를 읽어 빠르게 콘셉트를 만들고, 90일 내 론칭과 첫 매출을 완성합니다.'
  },
  {
    title: '데이터 상거래',
    body: '검색, 리뷰, 전환 데이터를 연결해 상품 기획과 퍼포먼스 마케팅을 동시에 고도화합니다.'
  },
  {
    title: '콘텐츠 커머스',
    body: '에디토리얼, 숏폼, 라이브까지 브랜드 스토리를 구매 여정에 매끄럽게 연결합니다.'
  },
  {
    title: '옴니채널 운영',
    body: '자사몰과 마켓, 글로벌 채널까지 통합 운영하며 재고와 가격 전략을 자동화합니다.'
  }
];

const principles = [
  {
    title: '사람 중심의 경험',
    desc: '고객의 시간과 감정을 가장 먼저 설계합니다.'
  },
  {
    title: '빠른 실험, 빠른 확장',
    desc: '가설을 2주 단위로 검증하고 즉시 확장합니다.'
  },
  {
    title: '지속 가능한 성장',
    desc: '장기 고객가치와 환경 영향을 함께 봅니다.'
  }
];

const timeline = [
  { year: '2021', text: '오르빗커머스 설립, 첫 브랜드 론칭' },
  { year: '2022', text: '연 매출 500억 돌파, 풀필먼트 센터 구축' },
  { year: '2023', text: '글로벌 6개국 진출, 데이터 플랫폼 내재화' },
  { year: '2024', text: '브랜드 포트폴리오 18개 확대' },
  { year: '2025', text: 'AI 수요예측으로 재고 회전 23% 개선' }
];

const testimonials = [
  {
    name: '박지윤 · 브랜드 파트너',
    quote: '기획부터 물류까지 한 팀처럼 움직여서 브랜드 성장이 훨씬 빨라졌어요.'
  },
  {
    name: '서민재 · 리테일 바이어',
    quote: '상품 스토리와 수치가 일관되게 관리돼 믿고 협업할 수 있었습니다.'
  },
  {
    name: '이도현 · 글로벌 셀러',
    quote: '현지화부터 가격 전략까지 원스톱으로 지원받았습니다.'
  }
];

const faqs = [
  {
    q: '브랜드 인수나 합작도 진행하나요?',
    a: '네. 성장 단계, 카테고리 적합성에 따라 인수, 합작, 공동 기획을 모두 검토합니다.'
  },
  {
    q: '운영 가능한 카테고리는?',
    a: '라이프스타일, 뷰티, 푸드, 리빙 중심이며 기능성 제품은 인증 검토가 필요합니다.'
  },
  {
    q: '브랜드 론칭에 걸리는 시간은?',
    a: '시장 검증부터 론칭까지 평균 10~14주가 소요됩니다.'
  }
];

export default function App() {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    consent: false
  });
  const [formStatus, setFormStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox') {
      const target = event.target as HTMLInputElement;
      setFormState((prev) => ({ ...prev, [name]: target.checked }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || '문의 전송에 실패했습니다.');
      }

      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        consent: false
      });
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : '문제가 발생했습니다.');
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <div className="logo">
            <span className="logo-dot" />
            <span>오르빗커머스</span>
          </div>
          <div className="nav-links">
            <a href="#about">회사 소개</a>
            <a href="#capability">역량</a>
            <a href="#portfolio">포트폴리오</a>
            <a href="#contact" className="nav-cta">파트너 문의</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">E-commerce Company</p>
            <h1>
              감도 있는 브랜드를
              <br />
              데이터로 성장시키는
              <span> 커머스 스튜디오</span>
            </h1>
            <p className="lead">
              오르빗커머스는 브랜드 전략, 상품 기획, 퍼포먼스 마케팅, 물류 운영을
              한 팀으로 연결해 빠르고 지속 가능한 성장을 만듭니다.
            </p>
            <div className="hero-actions">
              <button className="primary">회사 소개서 받기</button>
              <button className="ghost">브랜드 상담 예약</button>
            </div>
            <div className="hero-badges">
              <span>서울·도쿄·싱가포르 운영</span>
              <span>자체 데이터 플랫폼</span>
              <span>24시간 주문 대응</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-top">
              <p>Realtime Growth</p>
              <strong>+38.5%</strong>
            </div>
            <div className="card-body">
              <p>브랜드 풀퍼널 전환율</p>
              <div className="sparkline">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="card-footer">
              <div>
                <span>신규 고객 CAC</span>
                <strong>-21%</strong>
              </div>
              <div>
                <span>재고 회전</span>
                <strong>+17%</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="section about">
        <div className="section-title">
          <p className="eyebrow">About</p>
          <h2>브랜드의 성장을 한 번에 설계합니다</h2>
          <p>
            우리는 제품과 채널, 고객 경험을 분리하지 않습니다. 기획부터 판매까지의
            전 과정을 하나의 리듬으로 맞춰, 성장 비용은 줄이고 전환은 높입니다.
          </p>
        </div>
        <div className="stats">
          {stats.map((item) => (
            <div key={item.label} className="stat">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="capability" className="section capability">
        <div className="section-title">
          <p className="eyebrow">Capability</p>
          <h2>아이디어가 매출이 되는 시스템</h2>
        </div>
        <div className="grid">
          {capabilities.map((cap) => (
            <div key={cap.title} className="card">
              <h3>{cap.title}</h3>
              <p>{cap.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="section portfolio">
        <div className="section-title">
          <p className="eyebrow">Portfolio</p>
          <h2>다양한 카테고리에서 검증된 성과</h2>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <h3>뷰티 & 웰니스</h3>
            <p>성분 중심의 D2C 브랜드를 글로벌 히트 상품으로 확장</p>
            <span>연 매출 320억</span>
          </div>
          <div className="portfolio-card">
            <h3>리빙 & 홈</h3>
            <p>프리미엄 리빙 라인을 리테일과 호텔 B2B까지 확장</p>
            <span>리텐션 64%</span>
          </div>
          <div className="portfolio-card">
            <h3>푸드 & 스낵</h3>
            <p>라이프스타일 스낵을 라이브커머스 중심으로 성장</p>
            <span>월 12만 건 주문</span>
          </div>
        </div>
      </section>

      <section className="section principles">
        <div className="section-title">
          <p className="eyebrow">Principles</p>
          <h2>오르빗커머스가 지키는 약속</h2>
        </div>
        <div className="principles-grid">
          {principles.map((item) => (
            <div key={item.title} className="principle">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section timeline">
        <div className="section-title">
          <p className="eyebrow">History</p>
          <h2>성장의 궤적</h2>
        </div>
        <div className="timeline-list">
          {timeline.map((item) => (
            <div key={item.year} className="timeline-item">
              <span>{item.year}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <div className="section-title">
          <p className="eyebrow">Partners</p>
          <h2>함께 일한 팀들의 이야기</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div key={item.name} className="testimonial">
              <p>“{item.quote}”</p>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq">
        <div className="section-title">
          <p className="eyebrow">FAQ</p>
          <h2>자주 묻는 질문</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((item) => (
            <div key={item.q} className="faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Let’s grow</p>
            <h2>브랜드와 제품을 함께 키울 파트너를 찾습니다</h2>
            <p>
              투자, 인수, 합작, 운영 대행 등 다양한 방식으로 협업합니다.
              간단한 소개와 목표를 남겨주시면 2영업일 내에 회신드립니다.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">이름 *</label>
                <input id="name" name="name" value={formState.name} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="email">이메일 *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="company">회사명</label>
                <input id="company" name="company" value={formState.company} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="phone">연락처</label>
                <input id="phone" name="phone" value={formState.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">문의 내용 *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                required
              />
            </div>
            <label className="consent">
              <input
                type="checkbox"
                name="consent"
                checked={formState.consent}
                onChange={handleChange}
              />
              개인정보 처리방침에 동의합니다.
            </label>
            <button className="primary" type="submit" disabled={formStatus === 'loading'}>
              {formStatus === 'loading' ? '전송 중...' : '파트너 문의하기'}
            </button>
            {formStatus === 'success' && <p className="form-success">문의가 접수되었습니다. 곧 연락드릴게요.</p>}
            {formStatus === 'error' && <p className="form-error">{formError}</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>오르빗커머스</strong>
          <p>서울시 성동구 연무장길 77, 7F</p>
          <p>partnership@orbitcommerce.co</p>
        </div>
        <div className="footer-links">
          <a href="#about">회사 소개</a>
          <a href="#capability">역량</a>
          <a href="#portfolio">포트폴리오</a>
          <a href="#contact">문의</a>
        </div>
      </footer>
    </div>
  );
}

