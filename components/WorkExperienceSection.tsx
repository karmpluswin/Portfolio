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
        title: "SDE Intern",
        location: "Ahemdabad",
        employmentPeriod: {
          start: "01.2026",
          end: "06.2026",
        },
        description: `- Built an offline Java EE vehicle tracking platform at ISRO SAC using GraphHopper and GeoServer to reconstruct NavIC/GPS routes on OSM road networks with ~90-95% accuracy
- Engineered trip detection engine using ignition state transitions, Haversine distance calculation and POI proximity resolution to process live VTU telemetry across ISRO campus fleet`,
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
    isCurrentEmployer: false,
  },
];

export default function WorkExperienceSection() {
  return (
    <section className="w-full">
      <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
        Experience
      </h2>
      <div className="mt-4">
        <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
      </div>
    </section>
  );
}
