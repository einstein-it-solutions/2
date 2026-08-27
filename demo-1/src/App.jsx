import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowDownRight, ArrowUpRight, Bot, Camera, Check, ChevronRight, CircleDotDashed, Code2, Globe2, Megaphone, Menu, PenTool, Phone, Send, Share2, X } from 'lucide-react'
import qaseemImage1200 from './assets/optimized/al-qaseem-1200.webp'
import qaseemImage720 from './assets/optimized/al-qaseem-720.webp'
import palaceImage1200 from './assets/optimized/lebanese-palace-1200.webp'
import palaceImage720 from './assets/optimized/lebanese-palace-720.webp'
import wireframeDolphin1000 from './assets/optimized/dolphin-wireframe-transparent-1000.webp'
import wireframeDolphin620 from './assets/optimized/dolphin-wireframe-transparent-620.webp'
import portalReference from './assets/optimized/portal-reference-1100.webp'

const OrbitLottie = lazy(() => import('./components/OrbitLottie'))

const ease = [0.22, 1, 0.36, 1]
const services = [
  ['01', 'Branding', 'A strategic identity system that makes the right first impression.'],
  ['02', 'Creative content', 'Campaign concepts, social content and visual stories made to travel.'],
  ['03', 'Media production', 'Photography and video that give your product presence and momentum.'],
  ['04', 'Digital marketing', 'Performance-led campaigns, SEO and reporting that make growth visible.'],
  ['05', 'Web & apps', 'Useful, considered digital experiences built around real customer journeys.'],
  ['06', 'AI MSG', 'A responsive AI assistant for WhatsApp, Instagram and Facebook—24/7.'],
]
const processSteps = [
  ['01', 'Discover', 'We ask better questions before we make anything.'],
  ['02', 'Define', 'We find the sharpest opportunity and a direction worth owning.'],
  ['03', 'Create', 'Design, content and technology take shape as one connected system.'],
  ['04', 'Grow', 'We refine, measure and keep moving the work forward.'],
]
const heroServices = [
  { short: 'Brand', title: 'Branding', body: 'A strategic identity system that makes the right first impression.', x: 18, y: 23, delay: 0, headline: ['Build a brand', 'they remember.'] },
  { short: 'Content', title: 'Creative content', body: 'Campaign concepts, social content and visual stories made to travel.', x: 76, y: 16, delay: .4, headline: ['Create stories', 'that travel.'] },
  { short: 'Media', title: 'Media production', body: 'Photography and video that give your product presence and momentum.', x: 91, y: 52, delay: .8, headline: ['Give ideas', 'a physical presence.'] },
  { short: 'Growth', title: 'Digital marketing', body: 'Performance-led campaigns, SEO and reporting that make growth visible.', x: 73, y: 84, delay: 1.2, headline: ['Make growth', 'visible.'] },
  { short: 'Web', title: 'Web & apps', body: 'Useful, considered digital experiences built around real customer journeys.', x: 27, y: 85, delay: 1.6, headline: ['Make digital', 'feel effortless.'] },
  { short: 'AI MSG', title: 'AI MSG', body: 'A responsive AI assistant for WhatsApp, Instagram and Facebook—24/7.', x: 8, y: 55, delay: 2, headline: ['Be available', 'around the clock.'] },
]
const heroParticles = [
  [8, 16, 1.1], [19, 70, .8], [34, 10, .8], [45, 83, 1], [57, 22, .8], [66, 69, 1.2], [77, 35, .8], [89, 75, .9], [95, 16, .7], [52, 48, .7], [73, 9, .8], [12, 45, .7],
]
const serviceCardMeta = [
  { icon: PenTool, values: ['Strategic identity', 'A considered first impression'] },
  { icon: Megaphone, values: ['Campaign concepts', 'Social content that travels'] },
  { icon: Camera, values: ['Photography & video', 'More product presence'] },
  { icon: CircleDotDashed, values: ['Performance-led campaigns', 'SEO, reporting & growth'] },
  { icon: Code2, values: ['Customer-first journeys', 'Considered digital experiences'] },
  { icon: Bot, values: ['WhatsApp, Instagram & Facebook', 'Responsive 24/7 assistance'] },
]
const serviceCards = services.map(([number, title, body], index) => ({ number, title, body, ...serviceCardMeta[index] }))
const workFilters = ['All work', 'Branding', 'Digital marketing', 'Media production', 'Web & apps', 'AI MSG']
const workProjects = [
  { id: 'qaseem', number: '01', eyebrow: 'DIGITAL EXPERIENCE', title: ['Al Qaseem', 'Group'], detail: 'Website / Mobile app / Social media', filters: ['Web & apps', 'Digital marketing'], image1200: qaseemImage1200, image720: qaseemImage720, alt: 'Al Qaseem Group digital experience', className: 'project-card-wide' },
  { id: 'palace', number: '02', eyebrow: 'GROWTH ECOSYSTEM', title: ['Lebanese', 'Palace'], detail: 'Photography / E-commerce / Social media', filters: ['Media production', 'Digital marketing'], image1200: palaceImage1200, image720: palaceImage720, alt: 'Lebanese Palace food and product photography', className: '' },
  { id: 'ai', number: '03', eyebrow: 'AI & AUTOMATION', title: ['Always', 'available.'], detail: 'AI MSG for WhatsApp, Instagram and Facebook', filters: ['AI MSG'], className: 'project-card-cyan' },
]
const productionServices = [
  ['01', 'Product & food', 'Photography for restaurants, retail and product launches.'],
  ['02', 'Events & film', 'Event coverage, video and campaign-ready footage.'],
  ['03', 'Digital storefronts', 'Websites and digital touchpoints that carry the story further.'],
]

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return <motion.div className={`reveal ${className}`} initial={reduce ? false : { opacity: 0, y: 42, scale: .985, rotateX: -5, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.16, margin: '0px 0px -70px 0px' }} transition={{ duration: .88, delay, ease }}>{children}</motion.div>
}

function SectionMarker({ number }) { return <div className="section-marker" aria-hidden="true"><span>{number}</span><i /><i /><i /></div> }
function OrbitalMark() { return <div className="orbital-mark" aria-hidden="true"><span /><span /><span /><b /></div> }
function PageIntro() {
  const reduce = useReducedMotion()
  if (reduce) return null
  return <motion.div className="page-intro" aria-hidden="true" initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 68% 0, 50% 4%, 32% 0, 0 0)' }} transition={{ duration: 1.15, delay: .12, ease }}>
    <motion.div className="page-intro-brand" initial={{ opacity: 0, y: 18 }} animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -14] }} transition={{ duration: .78, delay: .16, ease }}><span className="brand-signal" /><strong>Echo</strong>Vision<sup>®</sup></motion.div>
    <motion.div className="page-intro-orbit" initial={{ opacity: 0, scale: .64, rotate: -34 }} animate={{ opacity: [0, 1, 1, 0], scale: [.64, 1, 1.08, 1.34], rotate: [-34, 0, 18, 36] }} transition={{ duration: .92, delay: .08, ease }}><i /><i /><b /></motion.div>
    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }} transition={{ duration: .72, delay: .25, ease }}>DUBAI / UAE — CREATIVE BUSINESS PARTNER</motion.p>
    <motion.em initial={{ x: '-110%', scaleX: .25, opacity: 0 }} animate={{ x: ['-110%', '0%', '120%'], scaleX: [.25, 1, .4], opacity: [0, 1, 0] }} transition={{ duration: .8, delay: .18, ease }} />
  </motion.div>
}
function DolphinVisual({ variant = 'hero' }) {
  const reduce = useReducedMotion()
  return <motion.div className={`dolphin-visual dolphin-visual-${variant}`} aria-hidden="true" initial={reduce ? false : { opacity: 0, scale: .86, y: 28, rotateZ: -8 }} animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -14, 0], rotateZ: [-5, -1, -5], rotateY: [0, 4, 0] }} transition={{ opacity: { duration: 1, delay: .5 }, scale: { duration: 1.1, delay: .5, ease }, y: { duration: 6.4, repeat: Infinity, ease: 'easeInOut' }, rotateZ: { duration: 6.4, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 6.4, repeat: Infinity, ease: 'easeInOut' } }}><picture><source media="(max-width: 700px)" srcSet={wireframeDolphin620} /><img src={wireframeDolphin1000} alt="" /></picture><span /><span /></motion.div>
}
function HeroOrbit({ activeService, onSelect, reduce }) {
  return <div className="hero-orbit-map" aria-label="EchoVision capabilities map">
    <svg className="hero-orbit-svg" viewBox="0 0 600 600" aria-hidden="true">
      <circle cx="300" cy="300" r="104" /><circle cx="300" cy="300" r="180" /><circle cx="300" cy="300" r="252" />
      {heroServices.map((service, index) => <motion.line key={service.title} className={activeService === index ? 'is-active' : ''} x1="300" y1="300" x2={service.x * 6} y2={service.y * 6} initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: activeService === index ? 1 : .72 }} transition={{ pathLength: { duration: 1.25, delay: .36 + index * .11, ease }, opacity: { duration: .35 } }} />)}
      <g className="hero-orbit-satellite satellite-one"><circle cx="300" cy="120" r="5" /><circle cx="300" cy="120" r="12" /></g><g className="hero-orbit-satellite satellite-two"><circle cx="490" cy="300" r="4" /><circle cx="490" cy="300" r="10" /></g><g className="hero-orbit-satellite satellite-three"><circle cx="300" cy="48" r="3.5" /><circle cx="300" cy="48" r="9" /></g>
      <circle className="hero-orbit-core-line" cx="300" cy="300" r="54" />
    </svg>
    <div className="hero-orbit-center"><span>Creative tech</span><strong>Echo<em>Vision</em></strong><i /></div>
    {heroServices.map((service, index) => <div key={service.title} className="hero-service-position" style={{ '--x': `${service.x}%`, '--y': `${service.y}%` }}>
      <motion.button type="button" className={`hero-service-node ${activeService === index ? 'is-active' : ''}`} aria-label={`Explore ${service.title}: ${service.body}`} aria-pressed={activeService === index} onClick={() => onSelect(index)} animate={reduce ? undefined : { y: [0, index % 2 ? -6 : 5, 0] }} whileHover={{ y: -4, scale: 1.03 }} whileFocus={{ y: -4, scale: 1.03 }} transition={{ y: { duration: 5.4 + index * .35, delay: service.delay, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: .2 } }}>
        <span>{service.short}</span><b>{service.title}</b><i>{service.body}</i>
      </motion.button>
    </div>)}
  </div>
}
function HeroSection() {
  const reduce = useReducedMotion()
  const [activeService, setActiveService] = useState(-1)
  const [orbitFocus, setOrbitFocus] = useState(0)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const backgroundX = useSpring(pointerX, { stiffness: 42, damping: 20, mass: .4 })
  const backgroundY = useSpring(pointerY, { stiffness: 42, damping: 20, mass: .4 })
  const message = activeService === -1 ? { key: 'overview', kicker: 'Dubai / UAE • Full-service digital agency', headline: ['Your creative', 'partner for success.'], body: 'From bold ideas to measurable growth. We bring strategy, content, marketing and technology together around ambitious brands.' } : { key: heroServices[activeService].title, kicker: `Service / 0${activeService + 1} • EchoVision`, headline: heroServices[activeService].headline, body: heroServices[activeService].body }
  const handlePointerMove = event => {
    if (reduce || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 18)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 16)
  }
  const resetPointer = () => { pointerX.set(0); pointerY.set(0) }
  useEffect(() => {
    if (reduce) return undefined
    const pulseTimer = window.setTimeout(() => setOrbitFocus(current => (current + 1) % heroServices.length), 2100)
    return () => window.clearTimeout(pulseTimer)
  }, [orbitFocus, reduce])

  return <section id="top" className="hero hero-tech" data-scene onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
    <motion.div className="hero-atmosphere" aria-hidden="true" style={reduce ? undefined : { x: backgroundX, y: backgroundY }}><span className="hero-noise" /><span className="hero-glow glow-one" /><span className="hero-glow glow-two" /><span className="hero-glow glow-three" />{heroParticles.map(([x, y, size], index) => <i key={index} className="hero-particle" style={{ '--x': `${x}%`, '--y': `${y}%`, '--size': `${size}px`, '--delay': `${index * -.52}s` }} />)}</motion.div>
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-copy">
      <motion.div className="hero-message" key={message.key} initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: activeService === -1 ? .72 : .42, ease }}>
          <motion.div className="hero-kicker" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .62, delay: activeService === -1 ? .08 : 0, ease }}><span /> {message.kicker.split(' • ')[0]} <i /> {message.kicker.split(' • ')[1]}</motion.div>
          <h1 className="hero-title"><motion.span initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: activeService === -1 ? .15 : .05, ease }}>{message.headline[0]}</motion.span><motion.em initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: activeService === -1 ? .26 : .13, ease }}>{message.headline[1]}</motion.em></h1>
          <motion.p className="hero-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .64, delay: activeService === -1 ? .4 : .22, ease }}>{message.body}</motion.p>
      </motion.div>
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .64, delay: .56, ease }} className="hero-actions"><a className="button button-primary" href="#contact">Start a project <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#work">Explore work <ArrowDownRight size={18} /></a></motion.div>
    </div>
    <DolphinVisual variant="hero" />
    <HeroOrbit activeService={activeService === -1 ? orbitFocus : activeService} onSelect={setActiveService} reduce={reduce} />
    {activeService !== -1 && !reduce && <motion.span key={message.key} className="hero-flash-word" aria-hidden="true" initial={{ opacity: 0, x: '-18%', clipPath: 'inset(0 100% 0 0)' }} animate={{ opacity: [0, .48, 0], x: ['-18%', '8%', '24%'], clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 100%)'] }} transition={{ duration: .9, ease }}>{heroServices[activeService].short}</motion.span>}
    <div className="hero-signal"><span>LIVE</span><i /><b>01. DUBAI</b></div><SectionMarker number="01" />
  </section>
}
function ServiceCards() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const [inView, setInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [flippedCard, setFlippedCard] = useState(null)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 650px)')
    const updateViewport = () => {
      setIsMobile(media.matches)
      if (media.matches) setFlippedCard(null)
    }
    updateViewport()
    media.addEventListener('change', updateViewport)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .18 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { media.removeEventListener('change', updateViewport); observer.disconnect() }
  }, [])

  useEffect(() => {
    if (reduce || isMobile || isPaused || !inView) return undefined
    const flipTimer = window.setTimeout(() => {
      setFlippedCard(card => card === null ? 0 : (card + 1) % serviceCards.length)
    }, 2000)
    return () => window.clearTimeout(flipTimer)
  }, [flippedCard, inView, isMobile, isPaused, reduce])

  const toggleCard = index => setFlippedCard(card => card === index ? null : index)
  const onCardKeyDown = (event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toggleCard(index)
  }

  return <div className="services-cards" ref={sectionRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }}>
    {serviceCards.map(({ number, title, body, icon: Icon, values }, index) => {
      const isFlipped = flippedCard === index
      return <motion.article key={title} className={`service-card ${isFlipped ? 'is-flipped' : ''}`} role="button" tabIndex={0} aria-label={`${title}. ${isFlipped ? 'Hide details' : 'Show details'}`} aria-pressed={isFlipped} onClick={event => { if (!event.target.closest('a')) toggleCard(index) }} onKeyDown={event => onCardKeyDown(event, index)} initial={reduce ? false : { opacity: 0, y: 32, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay: index * .11, ease }}>
        <div className="service-card-inner">
          <div className="service-card-face service-card-front">
            <div className="service-card-top"><span>{number}</span><Icon aria-hidden="true" size={26} strokeWidth={1.55} /></div>
            <div><h3>{title}</h3><p>{body}</p></div><small>View details <ArrowUpRight size={15} /></small>
          </div>
          <div className="service-card-face service-card-back">
            <span>{number} / ECHOVISION</span><h3>{title}</h3><p>{body}</p><ul>{values.map(value => <li key={value}>{value}</li>)}</ul><a href="#contact" onClick={event => event.stopPropagation()}>Discuss this service <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </motion.article>
    })}
  </div>
}
function WorkPortfolio() {
  const [activeFilter, setActiveFilter] = useState('All work')
  const visibleProjects = activeFilter === 'All work' ? workProjects : workProjects.filter(project => project.filters.includes(activeFilter))

  return <div className="work-portfolio">
    <div className="work-filters" role="tablist" aria-label="Filter selected work">
      {workFilters.map(filter => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} className={activeFilter === filter ? 'is-active' : ''} onClick={() => setActiveFilter(filter)}><i />{filter}</button>)}
    </div>
    <div className={`project-grid work-filter-results projects-${visibleProjects.length}`} aria-live="polite">
      {visibleProjects.map((project, index) => <motion.article key={project.id} className={`project-card ${project.className}`} initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .48, delay: index * .07, ease }}>
        <div className="work-project-frame">
          {project.image1200 ? <picture><source media="(max-width: 720px)" srcSet={project.image720} /><img src={project.image1200} alt={project.alt} loading="lazy" /></picture> : <><div className="project-pattern" /><Suspense fallback={null}><OrbitLottie className="project-orbit" /></Suspense></>}
          <div className="project-wash" /><div className="project-card-copy"><p>{project.number} / {project.eyebrow}</p><h3>{project.title[0]}<br />{project.title[1]}</h3><span>{project.detail}</span><a href={project.id === 'ai' ? '#services' : '#contact'} aria-label={project.id === 'ai' ? 'Explore AI MSG' : `Discuss a ${project.title.join(' ')} project`}>{project.id === 'ai' ? <Bot size={21} /> : <ArrowUpRight size={21} />}</a></div>
        </div>
      </motion.article>)}
    </div>
  </div>
}
function MomentumRail() {
  const reduce = useReducedMotion()
  return <motion.div className="momentum-rail" aria-hidden="true" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .45, delay: .2 }}>
    <motion.span className="momentum-rail-line" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: 1.15, delay: .18, ease }} />
    <i />
    {processSteps.map(([, title], index) => <b key={title} style={{ '--node-position': `${index * 33.333}%`, '--node-delay': `${index * .92}s` }} />)}
  </motion.div>
}
function CornerContact() {
  return <a className="corner-contact" href="#contact" aria-label="Start a project with EchoVision">
    <svg className="corner-contact-type" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="corner-contact-path" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs><text><textPath href="#corner-contact-path">START A PROJECT • ECHOVISION • </textPath></text></svg>
    <span><ArrowUpRight size={21} /></span>
  </a>
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [form, setForm] = useState({ problem: 'I need more customers', industry: '', budget: '$5K – $10K', name: '', company: '', email: '', phone: '' })
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (reduceMotion) return undefined

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.12,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.1,
      anchors: { duration: 1.05, offset: -10 },
    })
    let frameId = 0
    const raf = time => { lenis.raf(time); frameId = requestAnimationFrame(raf) }
    frameId = requestAnimationFrame(raf)

    return () => { cancelAnimationFrame(frameId); lenis.destroy() }
  }, [reduceMotion])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isSending) return
    setIsSending(true)
    window.setTimeout(() => { setSent(true); setIsSending(false) }, 650)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#content">Skip to content</a>
      <PageIntro />
      <CornerContact />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="EchoVision home"><span className="brand-signal" aria-hidden="true" /><strong>Echo</strong>Vision<sup>®</sup></a>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#about">About</a><a href="#work">Work</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
        <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={20} />}<span>{menuOpen ? 'Close' : 'Menu'}</span></button>
      </header>
      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'visible' : ''}`} aria-label="Mobile navigation"><a onClick={closeMenu} href="#about">About</a><a onClick={closeMenu} href="#work">Work</a><a onClick={closeMenu} href="#services">Services</a><a onClick={closeMenu} href="#contact">Contact</a><p>Dubai, UAE<br />Your creative business partner.</p></nav>

      <main id="content">
        <HeroSection />

        <section id="services" className="services section-pad" data-scene>
          <div className="services-orb"><OrbitalMark /></div><DolphinVisual variant="services" />
          <div className="section-heading services-heading"><Reveal><p className="eyebrow">01 / WHAT WE DO</p><h2>Six disciplines.<br /><em>One direction.</em></h2></Reveal><Reveal delay={0.1}><p>Every discipline connects to the next, so your brand has one voice wherever people find it.</p></Reveal></div>
          <ServiceCards /><SectionMarker number="01" />
        </section>

        <section id="about" className="intro section-pad" data-scene>
          <Reveal className="intro-label"><p className="eyebrow">02 / ABOUT ECHOVISION</p><div className="cyan-rule" /></Reveal>
          <Reveal className="intro-copy" delay={0.07}><h2>We turn ambition into a <em>connected digital presence.</em></h2><p>EchoVision is a full-service digital marketing agency in Dubai. Our team combines creative direction, strategic planning and technical expertise to make brands clearer, more relevant and ready to grow.</p><p className="brand-story">Our whale-inspired identity stands for strength, continuity and the kind of client relationships built to last.</p><a className="inline-link" href="#services">Discover our capabilities <ArrowDownRight size={19} /></a></Reveal>
          <div className="intro-panels"><Reveal delay={0.12}><article><span>Our mission</span><h3>Results that feel as good as they perform.</h3><p>Tailored digital solutions and tangible progress at every stage.</p></article></Reveal><Reveal delay={0.18}><article><span>Our vision</span><h3>A partner shaping what’s next.</h3><p>Helping ambitious businesses lead with confidence in a changing market.</p></article></Reveal></div>
        </section>

        <section id="work" className="work section-pad" data-scene>
          <div className="section-heading work-heading"><Reveal><p className="eyebrow">03 / SELECTED WORK</p><h2>Recent <em>work.</em></h2></Reveal><Reveal delay={0.1}><p>Brand systems, campaigns and digital experiences built with a clear business purpose.</p></Reveal></div>
          <WorkPortfolio />
          <div className="clients-band"><p>Trusted creative partner across the UAE</p><div><span>AL QASEEM</span><span>LEBANESE PALACE</span><span>EMIRATES MINTING</span><span>DIRECT LINE</span><span>ROZ</span></div></div><SectionMarker number="03" />
        </section>

        <section className="experience section-pad" data-scene>
          <div className="experience-portal" aria-hidden="true"><img src={portalReference} alt="" /><span /></div>
          <Reveal className="experience-copy"><p className="eyebrow">WEB & APPS / 05</p><h2>The website becomes<br />the <em>product.</em></h2><p>We design digital experiences that communicate, guide and convert—turning your brand into something people can explore, understand and remember.</p><a className="inline-link" href="#contact">Discuss a digital experience <ArrowUpRight size={18} /></a></Reveal>
          <div className="experience-values">{[['01', 'Immersive', 'A clear, considered experience at every touchpoint.'], ['02', 'Purposeful', 'Every interaction has a role in the customer journey.'], ['03', 'Built to perform', 'Designed for clarity, speed and conversion.']].map(([number, title, body], index) => <Reveal key={title} delay={.1 + index * .08}><article><span>{number}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}</div>
        </section>

        <section className="production section-pad" data-scene>
          <Reveal className="production-intro"><p className="eyebrow">MEDIA PRODUCTION / 05</p><h2>Turn real moments into<br /><em>visual assets.</em></h2><p>Photography, video and digital storefronts shaped for the places people discover, explore and remember your brand.</p></Reveal>
          <Reveal className="production-panel" delay={.12}><div className="production-panel-head"><span>Production</span><a href="#contact">Plan a production <ArrowUpRight size={17} /></a></div>{productionServices.map(([number, title, body]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight size={18} /></article>)}</Reveal>
        </section>

        <section className="process section-pad" data-scene><Reveal><p className="eyebrow">06 / HOW WE WORK</p><h2>Clear thinking.<br /><em>Visible momentum.</em></h2></Reveal><div className="process-steps"><MomentumRail />{processSteps.map(([number, title, body], index) => <Reveal className="process-step" key={title} delay={index * 0.1}><article><span>{number}</span><h3>{title}</h3><p>{body}</p><ChevronRight size={18} /></article></Reveal>)}</div></section>

        <section id="contact" className="contact section-pad" data-scene><div className="contact-background" aria-hidden="true" /><Reveal className="contact-copy"><p className="eyebrow">07 / START A CONVERSATION</p><h2>Make your next move <em>matter.</em></h2><p>Tell us where you want to go. We’ll bring the ideas, people and digital tools to help get you there.</p><div className="contact-direct"><a href="tel:+971521617218"><Phone size={17} /> +971 52 161 7218</a><a href="mailto:info@echovision.ae"><Send size={16} /> info@echovision.ae</a></div></Reveal>
          <Reveal className="form-wrap" delay={0.1}><form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-question"><span>01</span><fieldset><legend>What can we help with?</legend>{['I need more customers', 'I need a clearer brand', 'I need content that performs', 'I need a website or app'].map(label => <label className="choice" key={label}><input type="radio" name="problem" checked={form.problem === label} onChange={() => setForm({ ...form, problem: label })} /><span>{label}</span></label>)}</fieldset></div>
            <div className="form-question"><span>02</span><fieldset><legend>Tell us a little more</legend><label className="sr-only" htmlFor="industry">Industry</label><select id="industry" value={form.industry} required onChange={event => setForm({ ...form, industry: event.target.value })}><option value="">Your industry</option><option>Real estate</option><option>Hospitality</option><option>Luxury retail</option><option>Healthcare & wellness</option><option>Other</option></select><div className="budget-row">{['Under $5K', '$5K – $10K', '$10K+'].map(label => <label key={label}><input type="radio" name="budget" checked={form.budget === label} onChange={() => setForm({ ...form, budget: label })} /><span>{label}</span></label>)}</div></fieldset></div>
            <div className="form-question form-details"><span>03</span><fieldset><legend>How should we reach you?</legend><label>Name<input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} autoComplete="name" /></label><label>Company<input value={form.company} onChange={event => setForm({ ...form, company: event.target.value })} autoComplete="organization" /></label><label>Email<input required type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} autoComplete="email" /></label><label>Phone / WhatsApp<input type="tel" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} autoComplete="tel" /></label><button className="button button-primary form-submit" type="submit" disabled={isSending} aria-busy={isSending}>{sent ? <><Check size={17} /> Request received</> : isSending ? 'Sending…' : <>Book a free consultation <ArrowUpRight size={17} /></>}</button><p className="form-success" role="status" aria-live="polite">{sent ? 'Thank you. The EchoVision team will be ready to continue the conversation.' : ''}</p></fieldset></div>
          </form></Reveal><SectionMarker number="04" />
        </section>
      </main>

      <footer className="footer"><div><a className="brand" href="#top"><span className="brand-signal" aria-hidden="true" /><strong>Echo</strong>Vision<sup>®</sup></a><p>Your creative partner for success<br />in Dubai and the UAE.</p></div><div className="footer-end"><a href="#top">Back to top <ArrowUpRight size={16} /></a><div className="socials"><a href="https://www.instagram.com/echovision.ae/" aria-label="Instagram"><CircleDotDashed size={18} /></a><a href="https://www.facebook.com/echovision.ae" aria-label="Facebook"><Share2 size={18} /></a><a href="https://www.linkedin.com/company/echovisiondijitalmarketing" aria-label="LinkedIn"><Globe2 size={18} /></a></div><small>© 2026 EchoVision Digital Marketing. All rights reserved.</small></div></footer>
    </div>
  )
}

export default App
