import Image from "next/image";
import Link from "next/link";

import { Reveal } from "~/app/_components/ui/reveal";
import { POSTS } from "~/config/posts";

/**
 * Health tips. Covers are placeholder gradients with one of the stage illustrations
 * until real photos exist; the articles themselves are written elsewhere and must be
 * doctor-written or doctor-reviewed before publishing.
 */
export function HealthTips() {
  return (
    <section id="blog" aria-labelledby="blog-title" className="section-y">
      <div className="site-container">
        <div className="section-inner">
          <Reveal className="text-center">
            <h2 id="blog-title" className="section-title">
              Health tips from our doctors
            </h2>
            <p className="section-support mx-auto mt-3">
              Plain answers to questions families ask us most.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
            {POSTS.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 90} className="h-full">
                  <article className="border-line group h-full overflow-hidden rounded-[26px] border bg-white transition-transform duration-300 hover:-translate-y-1">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="flex h-full flex-col"
                    >
                      <div className="from-brand-tint-1 to-brand-soft relative aspect-[16/10] overflow-hidden bg-gradient-to-br">
                        {post.cover ? (
                          <Image
                            src={post.cover}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 92vw, 360px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={post.illustration}
                            alt=""
                            width={224}
                            height={224}
                            sizes="96px"
                            className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <span className="text-ink absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[0.72rem] font-bold">
                          {post.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-ink group-hover:text-brand-deep line-clamp-2 text-[1.2rem] leading-snug font-extrabold">
                          {post.title}
                        </h3>
                        <p className="text-charcoal mt-2 line-clamp-2 text-[0.95rem]">
                          {post.summary}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-5 text-[0.85rem]">
                          <span className="text-charcoal">
                            {post.readMinutes} min read
                          </span>
                          <span className="text-brand-deep font-bold underline underline-offset-4">
                            Read more
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={180} className="mt-8 text-center">
            <Link
              href="/blogs"
              className="text-brand-deep decoration-brand-soft text-[0.95rem] font-bold underline underline-offset-4 hover:decoration-current"
            >
              See all articles
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
