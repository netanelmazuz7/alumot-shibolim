import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "מאמר לא נמצא" };
  return {
    title: `${post.title} - אלומת שיבולים`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[idx + 1];
  const prev = posts[idx - 1];

  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-bl from-primary via-primary-dark to-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors mb-6 font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לבלוג
          </Link>
          <span className="inline-block bg-gold/20 text-gold font-bold px-3 py-1 rounded-full text-sm mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{post.dateLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-wheat-dark/10 p-8 md:p-12">
            <p className="text-xl text-primary/80 leading-relaxed font-medium mb-8 pb-8 border-b border-wheat-dark/20">
              {post.excerpt}
            </p>
            <div className="space-y-6">
              {post.content.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="text-2xl md:text-3xl font-black text-primary mt-10 mb-4"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="border-r-4 border-gold bg-gold/5 pr-6 py-4 my-6 italic text-lg text-primary"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul key={i} className="space-y-2 list-disc pr-6">
                      {block.items?.map((it, j) => (
                        <li
                          key={j}
                          className="text-primary/80 leading-relaxed"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-primary/80 leading-relaxed text-lg"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center justify-center gap-3 text-primary/60">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">אהבת את המאמר? שתף אותו עם חבר</span>
          </div>
        </div>
      </article>

      {/* Navigation between posts */}
      {(prev || next) && (
        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4">
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-md border-2 border-wheat-dark/10 hover:shadow-xl transition-all"
                >
                  <div className="text-gold-dark text-sm font-bold mb-2 flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" />
                    מאמר קודם
                  </div>
                  <div className="font-bold text-primary">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className={`bg-white rounded-2xl p-6 shadow-md border-2 border-wheat-dark/10 hover:shadow-xl transition-all ${
                    !prev ? "md:col-start-2" : ""
                  }`}
                >
                  <div className="text-gold-dark text-sm font-bold mb-2 flex items-center gap-1 justify-end">
                    מאמר הבא
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-primary text-left">
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-bl from-gold via-gold-dark to-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            מוכן לבדוק התאמה?
          </h2>
          <p className="text-lg text-white/80 mb-6">
            הבדיקה חינם, לוקחת 3 דקות, וללא התחייבות.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-3 bg-white text-primary font-black px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            בדיקת התאמה לקהילה
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
