'use client';

/**
 * ImagePlaceholder — displays a styled block where a generated image will go.
 * Shows the Nano Banana Pro prompt and expected file path for the image.
 */
export function ImagePlaceholder({
  src,
  prompt,
  alt,
  className = '',
  aspectRatio = '16/9',
}: {
  /** Expected path to the generated image, e.g. "/images/hero-business-owner.jpg" */
  src: string;
  /** The Nano Banana Pro prompt used to generate this image */
  prompt: string;
  /** Alt text describing the image */
  alt: string;
  className?: string;
  /** CSS aspect-ratio value, e.g. "16/9", "4/3", "1/1" */
  aspectRatio?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-dashed border-primary/25 bg-gradient-to-br from-primary-light via-surface to-primary-light/50 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(71, 48, 198, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 48, 198, 0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      {/* Camera/image icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/15">
        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Zm6-13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-4">
        {/* Path badge */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-mono font-medium text-primary">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
            </svg>
            {src}
          </span>
        </div>

        {/* Prompt — expandable */}
        <div className="rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 mb-1">
            Nano Banana Pro Prompt
          </p>
          <p className="text-[11px] leading-relaxed text-foreground/70 line-clamp-3 group-hover:line-clamp-none transition-all">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Dark variant for use on dark backgrounds */
export function ImagePlaceholderDark({
  src,
  prompt,
  alt,
  className = '',
  aspectRatio = '16/9',
}: {
  src: string;
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-white/[0.03] ${className}`}
      style={{ aspectRatio }}
    >
      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(155, 140, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 140, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      {/* Camera/image icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10">
        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Zm6-13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-4">
        {/* Path badge */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-medium text-primary-bright">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
            </svg>
            {src}
          </span>
        </div>

        {/* Prompt */}
        <div className="rounded-xl bg-black/40 p-3 backdrop-blur-sm transition-all duration-300">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-bright/60 mb-1">
            Nano Banana Pro Prompt
          </p>
          <p className="text-[11px] leading-relaxed text-white/60 line-clamp-3 group-hover:line-clamp-none transition-all">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
