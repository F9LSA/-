import React, { useEffect, useRef, useState } from 'react';
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

const ALL_PHOTOS = [
  kiosk11, kiosk12, kiosk13,
  kiosk21, kiosk22, kiosk23,
  kiosk31, kiosk32, kiosk33,
  kiosk41, kiosk42, kiosk43, kiosk44, kiosk45,
  kiosk51, kiosk52, kiosk53,
  kiosk61, kiosk62, kiosk63, kiosk64, kiosk65, kiosk66,
  kiosk71, kiosk72, kiosk73,
  kiosk81, kiosk82, kiosk83,
  kiosk91, kiosk92, kiosk93,
  kiosk101, kiosk102, kiosk103, kiosk104, kiosk105, kiosk106, kiosk107, kiosk108, kiosk109, kiosk1010,
];

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SHUFFLED_PHOTOS = shuffle(ALL_PHOTOS);

const ROW_1 = SHUFFLED_PHOTOS.slice(0, 21);
const ROW_2 = SHUFFLED_PHOTOS.slice(21);

const TRIPLED_ROW_1 = [...ROW_1, ...ROW_1, ...ROW_1];
const TRIPLED_ROW_2 = [...ROW_2, ...ROW_2, ...ROW_2];

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="theme-dark-surface pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {TRIPLED_ROW_1.map((src, i) => (
            <Tile key={`row1-${i}`} src={src} alt={`كشك photo ${(i % ROW_1.length) + 1}`} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {TRIPLED_ROW_2.map((src, i) => (
            <Tile key={`row2-${i}`} src={src} alt={`كشك photo ${ROW_1.length + (i % ROW_2.length) + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}