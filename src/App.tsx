/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Download,
  Briefcase,
  GraduationCap,
  Layers,
  ArrowUpRight,
  Menu,
  X,
  Languages
} from 'lucide-react';

// --- Types ---

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
}

interface Project {
  title: string;
  category: string;
  description: string;
  link: string;
  image?: string;
}

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 font-bold mb-4 flex items-center gap-4">
      <span className="h-px w-8 bg-white/20"></span>
      {title}
    </h2>
    {subtitle && (
      <p className="text-3xl md:text-4xl font-display font-medium text-white max-w-2xl leading-[1.1]">
        {subtitle}
      </p>
    )}
  </div>
);

const ExperienceItem = ({ exp }: { exp: Experience }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 py-12 border-b border-brand-border hover:bg-white/[0.01] transition-colors -mx-4 px-4"
  >
    <div className="space-y-1">
      <p className="text-sm font-mono text-white/40">{exp.period}</p>
      <h3 className="text-xl font-display font-semibold text-white">{exp.company}</h3>
      <p className="text-white/60 italic">{exp.role}</p>
    </div>
    <div className="space-y-4">
      <ul className="space-y-3">
        {exp.description.map((item, i) => (
          <li key={i} className="text-white/50 text-[15px] leading-relaxed flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/10 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-2">
        {exp.tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold py-1 px-2 bg-white/5 border border-white/10 rounded text-white/40">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -8 }}
    className="group block relative aspect-[4/5] bg-brand-card border border-brand-border rounded-3xl overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
    {project.image && (
      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" />
    )}
    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">{project.category}</p>
      <h3 className="text-2xl font-display font-medium text-white flex items-center justify-between">
        {project.title}
        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>
      <p className="text-sm text-white/50 mt-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        {project.description}
      </p>
    </div>
  </motion.a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- Profile Data ---
  const user = {
    name: "黄庆",
    role: "皮肤科医生 / 医美AI自媒体人",
    location: "中国",
    bio: "我是黄庆，一名深耕医美行业的皮肤科医生与AI产品操盘手。2025年正式跨入AI行业，开发了“景上医美AI系统”，并致力于通过Obsidian与Claude Code构建医生专属知识库，全方位赋能医美医生的专业力、销售力与个人IP。",
    email: "huangqing@example.com", // Placeholder as none provided
    socials: [
      { icon: <Twitter className="w-5 h-5" />, href: "#", name: "WeChat" },
      { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
      { icon: <Github className="w-5 h-5" />, href: "#", name: "RedNote" }
    ],
    experiences: [
      {
        company: "景上医美 AI 系统 / 创始人",
        role: "医美行业首个 AI 自媒体内容系统",
        period: "2025 — PRESENT",
        description: [
          "主导研发“景上医美AI系统”，作为行业首个AI自媒体内容系统，解决内容生产高成本痛点。",
          "帮助医美机构与医生实现专业内容的批量化、标准化生产，提升全平台运营效率。",
          "目前正基于 Obsidian + Claude Code 搭建医美医生专属知识库，深度赋能医疗专业、销售能力及个人 IP。",
          "发起“医生 IP 原创计划”，扶持医生原创医疗技术原理内容，建立自媒体端的专业护城河。"
        ],
        tags: ["AI 系统创始人", "行业首创", "知识库专家", "IP 发起人"]
      },
      {
        company: "医美MCN机构",
        role: "内容操盘手 / IP孵化导师",
        period: "转型至今",
        description: [
          "主导医美IP全流程孵化，将皮肤科医生专业背书转化为高传播力的自媒体人设。",
          "运用AI工具链优化内容生产，实现医学专业知识的降维输出与高效转化。",
          "搭建标准化的医美内容SOP，涵盖皮肤管理、微创注射及手术项目全链条。"
        ],
        tags: ["IP孵化", "AI内容流", "商业化操盘"]
      },
      {
        company: "美莱 / 鹏爱等医美连锁",
        role: "皮肤科医生 / 临床轮转医师",
        period: "临床7年",
        description: [
          "深耕皮肤科临床诊疗，系统完成整形外科、微针科及皮肤美容科的深度轮转。",
          "在整形外科轮转期间，掌握了面部解剖学基础与外科缝合美容逻辑。",
          "在微针科及皮肤科任职期间，精通各类仪器操作、中胚层疗法及联合治疗方案设计。",
          "积累过万例面诊档案，擅长根据求美者皮肤状态与面部基础提供综合变美方案。"
        ],
        tags: ["皮肤科", "整形外科轮转", "微针疗法", "联合诊疗"]
      }
    ],
    projects: [
      {
        title: "景上医美 AI 系统",
        category: "创始人 | 第一自媒体系统",
        description: "医美行业首个 AI 自媒体内容系统，帮助医美机构/医生批量生产高保真专业内容。",
        link: "#",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "医美医生知识库",
        category: "创始人 | 数字化赋能",
        description: "基于 Obsidian + Claude Code 搭建，实现医疗专业、销售能力、个人 IP 三合一赋能。",
        link: "#",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "医生 IP 原创计划",
        category: "发起人 | 专业影响力",
        description: "扶持医美医生原创医疗技术原理内容，助力建立自媒体端的专业权威与信任资产。",
        link: "#",
        image: "https://images.unsplash.com/photo-1576091160550-2173dad99a01?auto=format&fit=crop&q=80&w=800"
      }
    ],
    skills: ["AI内容工作流", "Claude Code", "Obsidian知识库", "临床医学", "面诊设计", "IP人设打造", "自媒体操盘"]
  };

  return (
    <div className="min-h-screen bg-brand-bg text-zinc-300 selection:bg-white/10">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50" 
        style={{ scaleX }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-8 md:px-12 flex justify-between items-center bg-gradient-to-b from-brand-bg to-transparent">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold text-white tracking-[0.2em]"
        >
          HUANG QING
        </motion.div>
        
        <div className="hidden md:flex gap-8 items-center">
          {[
            { label: '关于我', id: 'about' },
            { label: '品牌宣言', id: 'manifesto' },
            { label: '核心经历', id: 'experience' },
            { label: '成功案例', id: 'work' },
            { label: '核心技能', id: 'skills' },
            { label: '联系我', id: 'contact' }
          ].map(item => (
            <a key={item.id} href={`#${item.id}`} className="text-xs tracking-[0.2em] font-medium hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
          <button className="px-6 py-2.5 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-zinc-200 transition-all">
            获取简历
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-48 pb-32 max-w-7xl mx-auto overflow-hidden">
        {/* Matrix Rain Background */}
        <div className="matrix-container">
          <div className="matrix-pattern">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="matrix-column" />
            ))}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div className="space-y-12">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-mono text-white/40 tracking-wider flex items-center gap-3"
            >
              <span className="w-10 h-px bg-white/20"></span>
              HUANG QING | 黄庆
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white leading-[1.1] tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                医美医生的 <br />
                <span className="italic font-normal text-white/30">AI 架构师</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-6"
            >
              <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                7 年临床深耕 × 头部医美 MCN 操盘手 × 景上 AI 系统创始人 <br />
                <span className="text-white/40">轮转整形外科/微针科/皮肤科，用专业建立个人 IP</span>
              </p>
              <p className="text-white/30 text-xl md:text-2xl font-display italic max-w-xl border-l border-white/10 pl-6">
                “让每个医美医生都拥有自己的 AI 系统 + 自媒体阵地，用专业建立 IP，用技术放大价值。”
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-6 pt-4"
            >
              {user.socials.map(social => (
                <a key={social.name} href={social.href} title={social.name} className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white">
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative group translate-y-8"
          >
            <div className="aspect-[3/4.5] w-full max-w-sm ml-auto rounded-[40px] overflow-hidden border border-white/10 hover:border-brand-primary/30 transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img 
                src="/profile.jpg" 
                alt={user.name} 
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-brand-card border border-brand-border p-6 rounded-3xl shadow-2xl z-20">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">当前状态</p>
              <div className="flex items-center gap-2 text-white/80 font-medium whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                开放合作咨询与 AI 内容培训
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About / Bio */}
      <div className="border-y border-brand-border py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-12 text-[11px] uppercase tracking-[0.4em] text-white/10 font-bold">
          {Array(10).fill("皮肤科专业 • 整形外科轮转 • 微针技术 • IP孵化 • AI创作 • 行业SOP").map((txt, i) => (
            <span key={i}>{txt}</span>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-48">
        {/* About Section */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
          <SectionHeader 
            title="关于我" 
          />
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-display text-white leading-snug">
              从手术台跨界AI，用数字化工具赋能医美专业价值。
            </p>
            <div className="text-lg text-white/50 leading-relaxed space-y-4">
              <p>
                我有7年皮肤科及医美连锁机构临床经验，现已全面转向AI赋能医美领域。2025年我开发了“景上医美AI系统”，旨在通过技术手段打破医美内容生产的壁垒。
              </p>
              <p>
                我目前专注于基于Obsidian和Claude Code构建医美医生的数字化大脑，全方位提升医生的医疗专业力、销售话术沉淀及个人IP影响力。同时，我致力于扶持医生创作原创医疗技术原理，并在自媒体端实现精准引爆。
              </p>
            </div>
          </div>
        </section>

        {/* Brand Manifesto */}
        <section id="manifesto" className="py-24 border-y border-brand-border">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold text-center">
              品牌宣言
            </p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display text-white leading-relaxed text-center space-y-6">
              <p>
                一个<span className="italic text-white/60">不肯待在盒子里</span>的人。
              </p>
              <p className="text-white/80">
                7 年临床深耕学会了一件事——<span className="text-white">面部分层解剖</span>。
                <br className="hidden md:block" />
                跨界 AI 后又学会另一件——<span className="text-white">把知识变成系统</span>。
              </p>
              <p className="text-white/50 text-xl md:text-2xl font-normal">
                大多数医生不写代码，大多数程序员不懂解剖。
                <br />
                我站在交叉点上，用<span className="text-white">医学专业深度</span> × <span className="text-white">AI 工程能力</span> × <span className="text-white">内容审美洁癖</span>，
                <br />
                把"医美行业 AI 化"从一句口号变成<span className="text-white">可交付的产品</span>。
              </p>
              <p className="text-white/40 text-lg md:text-xl font-normal pt-4">
                不是让自己一个人出名，而是让<span className="text-white">每一个医美医生</span>都拥有自己的 AI 系统 + 自媒体阵地。
                <br />
                用专业建立 IP，用技术放大价值。
              </p>
            </blockquote>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <SectionHeader 
            title="核心经历" 
            subtitle="从手术台到流量池，用专业的医学背景赋能数字内容生产。" 
          />
          <div className="mt-16">
            {user.experiences.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} />
            ))}
          </div>
        </section>

        {/* Work Section */}
        <section id="work">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionHeader 
              title="成功案例" 
              subtitle="深耕医美赛道，助力多位专家与机构实现资产化运营。" 
            />
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              案例持续更新中
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {user.projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 font-bold mb-6">教育背景</h2>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-medium text-white">南昌大学</h3>
              <p className="text-white/60">临床医学 • 本科</p>
            </div>
          </div>
          <div className="text-lg text-white/50 leading-relaxed max-w-xl">
            系统学习临床医学理论与实践，为后续医美职业角色转型打下了坚实的医学基础，确保内容输出的专业度与合规性。
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 font-bold mb-6">核心技能</h2>
            <p className="text-xl text-white/60 leading-relaxed font-display">
              依托医学专业壁垒，融合AI工具与新媒体技术栈，构建差异化的竞争优势。
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {user.skills.map(skill => (
              <div key={skill} className="px-8 py-5 border border-brand-border rounded-full text-lg font-medium hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-default">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-32 bg-white/5 rounded-[64px] border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-full bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 px-8">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 font-bold mb-8">开启合作</h2>
            <p className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-12">
              让专业医学内容 <br />
              <span className="italic text-white/30 font-normal">高效</span> 回应求美者。
            </p>
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/50 text-sm tracking-widest font-mono">
                合作咨询 / 自媒体代运营 / AI内容培训 / IP孵化
              </p>
              <a 
                href={`mailto:${user.email}`}
                className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full text-lg font-bold hover:scale-105 transition-transform"
              >
                立即联系
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-white font-display font-bold text-2xl tracking-[0.2em]">HUANG QING</p>
            <p className="text-white/30 text-xs tracking-[0.2em] font-medium uppercase italic">医美内容专家 • 2026</p>
          </div>
          
          <div className="flex gap-12">
            {['WeChat', 'LinkedIn', 'RedNote'].map(link => (
              <a key={link} href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center hover:bg-white text-white hover:text-black transition-all"
          >
            <ArrowUpRight className="-rotate-90 w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        className="fixed inset-0 bg-brand-bg z-[60] flex flex-col items-center justify-center gap-12 md:hidden"
      >
        {[
          { label: '核心经历', id: 'experience' },
          { label: '成功案例', id: 'work' },
          { label: '核心技能', id: 'skills' },
          { label: '对话黄庆', id: 'contact' }
        ].map(item => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-display font-semibold text-white hover:text-white/50 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </motion.div> 
    </div>
  );
}
