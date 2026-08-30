import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { getCategory } from "../data/projects";
import type { Project } from "../data/types";
import { ArrowIcon } from "./icons";

export default function ProjectCard({
  project,
  big = false,
}: {
  project: Project;
  big?: boolean;
}) {
  const { t } = useLang();
  const cat = getCategory(project.category);
  if (!cat) return null;

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(13,31,51,0.13)]"
      style={{ ["--card-accent" as string]: cat.color }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <img
          src={project.image}
          alt={t(project.title)}
          loading="lazy"
          className="img-zoom h-full w-full object-cover"
        />
        <span
          className="absolute top-3.5 start-3.5 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide"
          style={{ background: cat.tint, color: cat.color }}
        >
          {t(cat.name)}
        </span>
        {project.videoUrl && (
          <span className="absolute top-3.5 end-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        )}
        <span
          className="origin-inline-start absolute inset-x-0 bottom-0 h-1 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: cat.color }}
        />
      </div>

      <div className={big ? "p-6 md:p-7" : "p-5"}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-display font-extrabold text-ink transition-colors duration-200 group-hover:text-[var(--card-accent)] ${
              big ? "text-2xl" : "text-lg"
            }`}
          >
            {t(project.title)}
            <span className="mx-2 text-sm font-bold text-muted/60" dir="ltr">
              {project.year}
            </span>
          </h3>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--card-accent)] group-hover:text-white">
            <ArrowIcon className="rtl-flip h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {t(project.tagline)}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink-soft/70">
          <span className="rounded-full bg-paper px-2.5 py-1">{t(project.client)}</span>
          <span className="rounded-full bg-paper px-2.5 py-1">{t(project.duration)}</span>
        </div>
      </div>
    </Link>
  );
}
