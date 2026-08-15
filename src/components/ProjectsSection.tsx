import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import { useLanguage } from '../i18n';
import kiosk11 from '../../External Photos/كشك 1.1.png';
import kiosk12 from '../../External Photos/كشك 1.2.png';
import kiosk13 from '../../External Photos/كشك 1.3.png';
import kiosk21 from '../../External Photos/كشك 2.1.png';
import kiosk22 from '../../External Photos/كشك 2.2.png';
import kiosk23 from '../../External Photos/كشك 2.3.png';
import kiosk31 from '../../External Photos/كشك 3.1.png';
import kiosk32 from '../../External Photos/كشك 3.2.png';
import kiosk33 from '../../External Photos/كشك 3.3.png';
import kiosk41 from '../../External Photos/كشك 4.1.png';
import kiosk42 from '../../External Photos/كشك 4.2.png';
import kiosk43 from '../../External Photos/كشك 4.3.png';
import kiosk44 from '../../External Photos/كشك 4.4.png';
import kiosk45 from '../../External Photos/كشك 4.5.png';
import kiosk46 from '../../External Photos/4.6.png';
import kiosk51 from '../../External Photos/كشك 5.1.png';
import kiosk52 from '../../External Photos/كشك 5.2.png';
import kiosk53 from '../../External Photos/كشك 5.3.png';
import kiosk61 from '../../External Photos/كشك 6.1.png';
import kiosk62 from '../../External Photos/كشك 6.2.png';
import kiosk63 from '../../External Photos/كشك 6.3.png';
import kiosk64 from '../../External Photos/كشك 6.4.png';
import kiosk65 from '../../External Photos/كشك 6.5.png';
import kiosk66 from '../../External Photos/كشك 6.6.png';
import kiosk71 from '../../External Photos/كشك 7.1.png';
import kiosk72 from '../../External Photos/كشك 7.2.png';
import kiosk73 from '../../External Photos/كشك 7.3.png';
import kiosk81 from '../../External Photos/كشك 8.1.png';
import kiosk82 from '../../External Photos/كشك 8.2.png';
import kiosk83 from '../../External Photos/كشك 8.3.png';
import kiosk91 from '../../External Photos/كشك 9.1.png';
import kiosk92 from '../../External Photos/كشك 9.2.png';
import kiosk93 from '../../External Photos/كشك 9.3.png';
import kiosk101 from '../../External Photos/كشك 10.1.png';
import kiosk102 from '../../External Photos/كشك 10.2.png';
import kiosk103 from '../../External Photos/كشك 10.3.png';
import kiosk104 from '../../External Photos/كشك 10.4.png';
import kiosk105 from '../../External Photos/كشك 10.5.png';
import kiosk106 from '../../External Photos/كشك 10.6.png';
import kiosk107 from '../../External Photos/كشك 10.7.png';
import kiosk108 from '../../External Photos/كشك 10.8.png';
import kiosk109 from '../../External Photos/كشك 10.9.png';
import kiosk1010 from '../../External Photos/كشك 10.10.png';

interface Project {
  number: string;
  categoryKey: string;
  name: string;
  col1Image1: string;
  col1Image2?: string;
  col2Image: string;
  col1Image1Position?: string;
  col2ImagePosition?: string;
  extraImages?: string[];
}

function PhotoLightbox({ images, name }: { images: string[]; name: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const goTo = (index: number) => {
    setLightboxIndex(Math.max(0, Math.min(index, images.length - 1)));
  };

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 gap-3 h-full">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border-2 border-[var(--theme-border)] bg-black/20 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-text)]"
          >
            <img
              src={src}
              alt={`${name} photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Fullscreen lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 theme-dark-surface/80 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors duration-200 text-2xl"
            >
              ✕
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 theme-dark-surface/80 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Prev arrow */}
            {lightboxIndex > 0 && (
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); goTo(lightboxIndex - 1); }}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 theme-dark-surface/80 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors duration-200 text-2xl"
              >
                ‹
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              src={images[lightboxIndex]}
              alt={`${name} photo ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-[12px]"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next arrow */}
            {lightboxIndex < images.length - 1 && (
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); goTo(lightboxIndex + 1); }}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 theme-dark-surface/80 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors duration-200 text-2xl"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({
  project,
  index,
  total,
  t,
  onView,
}: {
  project: Project;
  index: number;
  total: number;
  t: (key: string) => string;
  onView: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh]"
      style={{ top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.div
        style={{ scale }}
        className="theme-dark-surface rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[var(--theme-border)] p-4 sm:p-6 md:p-8 h-full flex flex-col origin-top"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-between pb-6 sm:pb-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="theme-primary-text font-black"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="theme-secondary-text uppercase tracking-widest text-xs sm:text-sm font-medium">
                {t(project.categoryKey)}
              </span>
              <span className="theme-primary-text uppercase font-medium text-lg sm:text-2xl md:text-3xl">
                {t(project.name)}
              </span>
            </div>
          </div>
          <LiveProjectButton onClick={onView} />
        </div>

        {/* Bottom row: image grid */}
        <div className="flex-1 flex gap-3 min-h-0">
          {project.col1Image2 ? (
            <>
              <div className="flex flex-col gap-3" style={{ width: '40%' }}>
                <img
                  src={project.col1Image1}
                  alt={`${t(project.name)} detail 1`}
                  className={`w-full object-cover ${project.col1Image1Position || 'object-top'} rounded-[40px] sm:rounded-[50px] md:rounded-[60px]`}
                  style={{ height: 'clamp(130px, 16vw, 230px)' }}
                  loading="lazy"
                />
                <img
                  src={project.col1Image2}
                  alt={`${t(project.name)} detail 2`}
                  className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                  style={{ height: 'clamp(10px, 16vw, 250px)' }}
                  loading="lazy"
                />
              </div>
              <div
                className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ width: '60%' }}
              >
                <img
                  src={project.col2Image}
                  alt={`${t(project.name)} main visual`}
                  className={`w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover ${project.col2ImagePosition || 'object-center'}`}
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ width: '50%' }}
              >
                <img
                  src={project.col1Image1}
                  alt={`${t(project.name)} detail 1`}
                  className={`w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover ${project.col1Image1Position || 'object-top'}`}
                  loading="lazy"
                />
              </div>
              <div
                className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ width: '50%' }}
              >
                <img
                  src={project.col2Image}
                  alt={`${t(project.name)} main visual`}
                  className={`w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover ${project.col2ImagePosition || 'object-center'}`}
                  loading="lazy"
                />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProjectOverlay({
  project,
  index,
  t,
  onClose,
}: {
  project: Project;
  index: number;
  t: (key: string) => string;
  onClose: () => void;
}) {
  const albumImages = [project.col1Image1, project.col1Image2, project.col2Image, ...(project.extraImages || [])].filter((img): img is string => img !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] theme-dark-surface overflow-y-auto"
    >
      {/* Sticky header with close button */}
      <div className="sticky top-0 z-10 theme-dark-surface/95 backdrop-blur-md border-b border-[var(--theme-border)] px-5 sm:px-8 md:px-12 py-4 sm:py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span
              className="theme-primary-text font-black shrink-0"
              style={{ fontSize: 'clamp(2rem, 5vw, 60px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="theme-secondary-text uppercase tracking-widest text-xs sm:text-sm font-medium truncate">
                {t(project.categoryKey)}
              </span>
              <span className="theme-primary-text uppercase font-medium text-base sm:text-xl md:text-2xl truncate">
                {t(project.name)}
              </span>
            </div>
          </div>
          <LiveProjectButton expanded onClick={onClose} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 flex flex-col gap-8 sm:gap-10">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="theme-secondary-text text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl"
        >
          {t(`projects.desc.${index + 1}`)}
        </motion.p>

        {/* Photo album */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="h-[55vh] sm:h-[65vh] md:h-[70vh]"
        >
          <PhotoLightbox images={albumImages} name={t(project.name)} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({
  limit,
  onViewAll,
}: {
  limit?: number;
  onViewAll?: () => void;
}) {
  const { t } = useLanguage();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (number: string) => {
    setExpandedProject((current) => (current === number ? null : number));
  };

  const PROJECTS: Project[] = [
    {
      number: '01',
      categoryKey: 'projects.category.Riyadh Bolyvard',
      name: 'projects.name.1',
      col1Image1: kiosk12,
      col1Image1Position: 'object-top',
      col1Image2: kiosk13,
      col2Image: kiosk11,
    },
    {
      number: '02',
      categoryKey: 'projects.category.Riyadh City',
      name: 'projects.name.2',
      col1Image1: kiosk21,
      col1Image1Position: 'object-top',
      col1Image2: kiosk22,
      col2Image: kiosk23,
    },
    {
      number: '03',
      categoryKey: 'projects.category.Supply Chain Conference',
      name: 'projects.name.3',
      col1Image1: kiosk31,
      col1Image1Position: 'object-top',
      col1Image2: kiosk32,
      col2Image: kiosk33,
    },
    {
      number: '04',
      categoryKey: 'projects.category.Made in Saudi Exhibition',
      name: 'projects.name.4',
      col1Image1: kiosk41,
      col1Image1Position: 'object-top',
      col2Image: kiosk42,
      extraImages: [kiosk43, kiosk44, kiosk45, kiosk46],
    },
    {
      number: '05',
      categoryKey: 'projects.category.Hajj Season',
      name: 'projects.name.5',
      col1Image1: kiosk51,
      col1Image1Position: 'object-top',
      col1Image2: kiosk52,
      col2Image: kiosk53,
    },
    {
      number: '06',
      categoryKey: 'projects.category.Riyadh International Book Fair',
      name: 'projects.name.6',
      col1Image1: kiosk62,
      col1Image1Position: 'object-top',
      col2Image: kiosk61,
      extraImages: [kiosk63, kiosk64, kiosk65, kiosk66],
    },
    {
      number: '07',
      categoryKey: 'projects.category.Riyadh City',
      name: 'projects.name.7',
      col1Image1: kiosk71,
      col1Image1Position: 'object-top',
      col1Image2: kiosk72,
      col2Image: kiosk73,
    },
    {
      number: '08',
      categoryKey: 'projects.category.Kiosk',
      name: 'projects.name.8',
      col1Image1: kiosk81,
      col1Image1Position: 'object-top',
      col1Image2: kiosk82,
      col2Image: kiosk83,
    },
    {
      number: '09',
      categoryKey: 'projects.category.Decorations',
      name: 'projects.name.9',
      col1Image1: kiosk91,
      col1Image1Position: 'object-top',
      col1Image2: kiosk92,
      col2Image: kiosk93,
    },
    {
      number: '10',
      categoryKey: 'projects.category.3D Designs',
      name: 'projects.name.10',
      col1Image1: kiosk101,
      col1Image1Position: 'object-top',
      col1Image2: kiosk102,
      col2Image: kiosk103,
      extraImages: [kiosk105, kiosk106, kiosk104, kiosk107, kiosk108, kiosk109, kiosk1010],
    },
  ];

  const visibleProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  const expandedProjectData = PROJECTS.find((p) => p.number === expandedProject) || null;
  const expandedProjectIndex = PROJECTS.findIndex((p) => p.number === expandedProject);

  return (
    <section
      id="projects"
      className="theme-dark-surface section-shadow relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          {t('projects.heading')}
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto flex flex-col">
        {visibleProjects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={visibleProjects.length}
            t={t}
            onView={() => toggleProject(project.number)}
          />
        ))}
      </div>

      {onViewAll && (
        <div className="max-w-6xl mx-auto flex justify-center pt-16 sm:pt-20">
          <button
            type="button"
            onClick={onViewAll}
            className="theme-primary-text uppercase font-medium tracking-widest text-sm sm:text-base border-2 border-[var(--theme-border)] rounded-full px-8 py-4 transition-colors duration-200 hover:bg-[var(--theme-hover)]"
          >
            {t('projects.viewAll')}
          </button>
        </div>
      )}

      {/* Fullscreen project overlay */}
      <AnimatePresence>
        {expandedProjectData && (
          <ProjectOverlay
            project={expandedProjectData}
            index={expandedProjectIndex}
            t={t}
            onClose={() => toggleProject(expandedProjectData.number)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}