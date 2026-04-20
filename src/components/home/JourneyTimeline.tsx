"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLElement>(null);

  const milestones = [
    {
      year: "2000",
      title: "The Beginning",
      text: "Our journey started as a small local spice aggregator with a vision to deliver pure and high-quality agricultural products. We built strong relationships with farmers and focused on maintaining authenticity and freshness in every batch."
    },
    {
      year: "2005",
      title: "Building Trust",
      text: "Within a few years, we earned the trust of local markets by consistently delivering premium-quality spices. Our commitment to quality and fair trade practices helped us establish a loyal customer base."
    },
    {
      year: "2008",
      title: "National Reach",
      text: "We expanded our distribution network across the country, partnering with wholesalers and retailers. This phase marked our growth from a local supplier to a recognized national brand."
    },
    {
      year: "2012",
      title: "Infrastructure Growth",
      text: "Invested in modern storage, cleaning, and packaging facilities to ensure product safety, hygiene, and longer shelf life while maintaining international standards."
    },
    {
      year: "2015",
      title: "Global Export License",
      text: "Achieved export certification and began international operations. We started supplying premium spices and seeds to global markets, especially in the Middle East and Asia."
    },
    {
      year: "2018",
      title: "Product Diversification",
      text: "Expanded our product range to include a variety of seeds, grains, and superfoods like chia and quinoa, catering to evolving global demand."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      text: "Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency.Adopted modern technologies and digital platforms to streamline operations, improve customer engagement, and enhance supply chain efficiency."
    },
    {
      year: "2023",
      title: "ISO Certification",
      text: "Achieved international quality certifications, ensuring our processes meet global standards in packaging, hygiene, and product quality."
    },
    {
      year: "2025",
      title: "Global Expansion",
      text: "Strengthening our presence in international markets with a focus on sustainability, innovation, and long-term partnerships with global clients."
    }
  ];

  useGSAP(() => {
    // Animate timeline line drawing
    gsap.fromTo(".timeline-line",
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-wrapper",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Fade in milestones
    gsap.utils.toArray(".milestone").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-neutral-light overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Our Journey</h2>
          <p className="text-gray-600 text-lg">Decades of growth built on trust and quality.</p>
        </div>

        <div className="timeline-wrapper relative max-w-4xl mx-auto">
          {/* Vertical Line Container */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 transform rounded-full">
            {/* Animated Draw Line */}
            <div className="timeline-line w-full bg-secondary rounded-full" />
          </div>

          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={item.year} className={`milestone relative flex items-center mb-12 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>

                {/* Connector Dot */}
                <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-secondary rounded-full border-4 border-neutral-light -translate-x-1/2 transform z-10" />

                {/* Content Box */}
                <div className="ml-12 md:ml-0 md:w-1/2 p-4 md:p-8">
                  <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative group hover:shadow-xl transition-shadow ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="text-secondary font-bold text-3xl mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-primary mb-2 font-heading">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>

                    {/* Arrow connecting box to line in desktop view */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45 transform ${isEven ? '-right-2' : '-left-2'}`} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
