"use client";

import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "isro",
    companyName: "ISRO",
    companyLogo: "/isro.jpg",
    positions: [
      {
        id: "sde-intern",
        title: "SDE intern",
        location: "Ahemdabad",
        employmentPeriod: {
          start: "01.2026",
        },
        description: `- Built backend systems in Java for VFMS to track and monitor mission vehicles in real time
- Developed Telemedicine platform supporting remote medical communication via satellite for the Indian Army
- Worked with GraphHopper and GeoServer to enable geospatial routing and mapping solutions`,
        skills: [
          "Java",
          "Spring Boot",
          "REST APIs",
          "MySQL",
          "GraphHopper",
          "GeoServer",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
];

export default function WorkExperienceSection() {
  return (
    <section className="w-full">
      <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--secondary)]">
        Experience
      </h2>
      <div className="mt-4">
        <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
      </div>
    </section>
  );
}
