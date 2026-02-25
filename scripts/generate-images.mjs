/**
 * Generate all placeholder images in parallel using the Gemini API.
 *
 * Usage:
 *   GEMINI_API_KEY=your-key node scripts/generate-images.mjs
 *
 * Images are saved to public/images/ as .png files.
 * Rate-limited to 5 concurrent requests to stay under 10 IPM.
 */

import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../public/images');

// ─── All image prompts ───────────────────────────────────────────────

const images = [
  {
    name: 'hero-business-owner',
    prompt:
      'Candid photograph of a person working on a laptop at a minimalist desk, shot from a low angle with shallow depth of field. The laptop screen glows with a soft purple light reflecting on their face. The workspace is modern and uncluttered — concrete walls, a single monstera plant, warm ambient lighting. The mood is focused and confident. Muted color palette with deep purple (#4730C6) and warm amber (#c4956a) accents in the environment. Film grain, editorial tone, no direct eye contact with camera.',
  },
  {
    name: 'problem-frustrated-owner',
    prompt:
      'Abstract editorial photograph — extreme close-up of a cracked, glitching old computer screen displaying a broken website with 404 errors and misaligned layouts. The screen light casts a cold, harsh blue-white glow in a dark room. Out-of-focus hands rest on the keyboard in the foreground. Heavy film grain, desaturated except for red error indicators. Conveys digital frustration without showing a face. Dark, moody, cinematic.',
  },
  {
    name: 'process-step-1-conversation',
    prompt:
      'Overhead flat-lay of a minimal workspace: an open notebook with rough wireframe sketches, a mechanical pencil, a ceramic espresso cup, and the corner of a laptop screen showing a Figma-style design tool. Warm natural light casting soft shadows on a light oak desk. Tight crop, intentional negative space, muted warm tones with subtle purple ink in the sketches. Clean editorial flat-lay, no people visible.',
  },
  {
    name: 'process-step-2-editing',
    prompt:
      'Close-up of fingers tapping on a modern tablet screen showing a minimal CMS interface with clean typography and toggle switches. Soft purple UI elements on a white interface. The background is blurred — a bright, airy room. Shallow depth of field focusing on the fingertip touching the screen. Warm ambient light, modern and effortless feel, no clutter.',
  },
  {
    name: 'process-step-3-maintenance',
    prompt:
      'Minimal 3D render of a floating shield icon with a soft glow, surrounded by orbiting abstract shapes — small spheres, rings, and check marks. Deep purple (#4730C6) gradient background fading to near-black. Warm amber (#c4956a) accent light from below. Clean geometric forms, glass-morphism effects, subtle reflections. Modern SaaS illustration style like Linear or Stripe, not stock.',
  },
  {
    name: 'feature-seo-ranking',
    prompt:
      'Minimal 3D render of a browser window floating at an angle, showing an abstract search results page with the #1 result highlighted by a glowing purple (#4730C6) accent bar. Small upward-trending graph icons orbit around the window. Dark gradient background, glass-morphism browser frame, soft warm amber (#c4956a) glow from behind. Modern SaaS product illustration style, clean geometry, depth of field blur on edges.',
  },
  {
    name: 'feature-responsive-devices',
    prompt:
      'Three devices — phone, tablet, laptop — floating in a staggered arrangement against a soft off-white background. Each screen shows abstract UI blocks in purple and white representing a responsive layout. Subtle drop shadows, slight rotation on each device for depth. Minimal, clean product render with no text visible on screens. Soft directional light from top-left, matte finishes, modern tech illustration.',
  },
  {
    name: 'feature-speed',
    prompt:
      'Minimal 3D render of a circular speedometer/gauge showing 100, with a glowing purple (#4730C6) arc and warm amber (#c4956a) needle. Small lightning bolt shapes float nearby. Soft gradient background from light lavender to white. Clean geometric forms, frosted glass material, subtle shadows. Modern SaaS illustration, not clipart — think Linear or Vercel aesthetic.',
  },
  {
    name: 'lifestyle-storefront',
    prompt:
      'Moody editorial photograph of a small European storefront at dusk — warm interior light spills through large windows onto wet cobblestones. The shop has a minimal modern facade with clean signage. A bicycle leans against the wall. Deep purple twilight sky, warm amber window glow creating contrast. Shot with film grain, slightly desaturated except for the warm light. Atmospheric, cinematic, quiet. No people visible.',
  },
  {
    name: 'lifestyle-phone-website',
    prompt:
      'Close-up of a smartphone held loosely in one hand, screen facing camera showing abstract purple and white UI blocks. The background is intentionally blurred — warm ambient bokeh lights suggesting a café or living room. Only the hand and phone are in focus. Warm skin tones, natural grain, no branding visible on the phone. Intimate and candid feel.',
  },
  {
    name: 'lifestyle-laptop-analytics',
    prompt:
      'Side-angle photograph of a laptop screen showing an abstract analytics dashboard with an upward-curving line graph. The screen has a dark UI with purple (#4730C6) accent lines and warm amber (#c4956a) data points. Shallow depth of field — only the center of the screen is sharp, edges fall off into blur. Dark, moody workspace with a single desk lamp casting warm directional light. Minimal, no clutter.',
  },
  {
    name: 'testimonial-mohamed',
    prompt:
      'Candid portrait of a man in his late 30s, dark features, wearing a simple white coat. Shot from slightly below in soft natural light. He is mid-laugh, looking slightly off-camera. Background is heavily blurred — just shapes and warm tones suggesting a professional space. Heavy film grain, warm color grade, shallow depth of field. Authentic and unposed, no studio lighting. Editorial documentary style.',
  },
  {
    name: 'testimonial-lisa',
    prompt:
      'Candid portrait of a woman in her early 30s, hair loosely tied back, wearing a paint-flecked work shirt. She is looking directly at camera with a calm, confident expression. Soft window light from one side creates gentle shadows. Background is abstract — out-of-focus painted surfaces in white and cream. Tight crop from chest up. Warm tones, film grain, natural imperfections. Real and unpolished.',
  },
  {
    name: 'testimonial-jan',
    prompt:
      'Candid portrait of an older man in his 50s, grey-streaked hair, wearing a dark green work vest. He stands outdoors, slightly squinting in golden hour light with greenery blurred behind him. Hands in pockets, relaxed posture. The light catches the texture of his face naturally. Warm amber tones, heavy bokeh, film grain. Shot on film, not digital — authentic and lived-in feel.',
  },
  {
    name: 'cta-happy-team',
    prompt:
      'Abstract photograph — a person silhouetted against a large bright window, arms relaxed at their sides, looking out. The window light creates a strong warm amber glow around their figure. The room is dark with deep purple shadows. You cannot see their face — just the confident posture and the light. Cinematic, aspirational, minimal. Heavy grain, high contrast, almost like a film still. No details, just mood and light.',
  },
];

// ─── Concurrency limiter ─────────────────────────────────────────────

function createPool(concurrency) {
  let active = 0;
  const queue = [];

  function next() {
    if (queue.length === 0 || active >= concurrency) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    fn()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        active--;
        next();
      });
  }

  return function run(fn) {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
  };
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY environment variable.');
    console.error('Usage: GEMINI_API_KEY=your-key node scripts/generate-images.mjs');
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });
  const pool = createPool(5); // 5 concurrent to stay under 10 IPM

  console.log(`Generating ${images.length} images (5 concurrent)...\n`);

  const results = await Promise.allSettled(
    images.map((img) =>
      pool(async () => {
        const outPath = resolve(OUT_DIR, `${img.name}.png`);

        if (existsSync(outPath)) {
          console.log(`  ✓ ${img.name}.png (already exists, skipping)`);
          return { name: img.name, status: 'skipped' };
        }

        console.log(`  ⏳ ${img.name} — generating...`);

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: `Generate this image: ${img.prompt}`,
          config: {
            responseModalities: ['Text', 'Image'],
          },
        });

        // Find the image part in the response
        const parts = response?.candidates?.[0]?.content?.parts ?? [];
        const imagePart = parts.find((p) => p.inlineData);

        if (!imagePart) {
          console.log(`  ✗ ${img.name} — no image in response`);
          return { name: img.name, status: 'failed', error: 'No image in response' };
        }

        const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
        writeFileSync(outPath, buffer);
        console.log(`  ✓ ${img.name}.png (${(buffer.length / 1024).toFixed(0)} KB)`);
        return { name: img.name, status: 'ok', size: buffer.length };
      }),
    ),
  );

  // Summary
  console.log('\n─── Summary ───');
  const ok = results.filter((r) => r.status === 'fulfilled' && r.value?.status === 'ok').length;
  const skipped = results.filter((r) => r.status === 'fulfilled' && r.value?.status === 'skipped').length;
  const failed = results.length - ok - skipped;
  console.log(`  ${ok} generated, ${skipped} skipped, ${failed} failed`);

  if (failed > 0) {
    console.log('\nFailed:');
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.log(`  ✗ ${images[i].name}: ${r.reason?.message ?? r.reason}`);
      } else if (r.value?.status === 'failed') {
        console.log(`  ✗ ${r.value.name}: ${r.value.error}`);
      }
    });
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
