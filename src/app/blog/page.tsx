import Link from "next/link";
import { BookOpen, Clock, ArrowLeft, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "./posts";

export const metadata = {
  title: "בלוג - אלומת שיבולים",
  description:
    "מאמרים, מדריכים ותובנות על עתיד שוק ההגנה על הרכב, מודלים חדשניים של עזרה הדדית, וטכנולוגיה שמשנה את הכללים.",
};

export default function BlogPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-bl from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, #d4a843 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">הבלוג שלנו</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            רעיונות שמשנים את הכללים
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            מחשבות, מדריכים ותובנות על עתיד ההגנה על הרכב, טכנולוגיה שמייצרת
            שקיפות, והדרך שבה קהילות משנות את העולם הפיננסי.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group bg-white rounded-3xl shadow-xl border-2 border-wheat-dark/10 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`bg-gradient-to-bl from-gold/20 via-wheat-light to-cream p-10 ${
                    i === 0 ? "md:p-14" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-primary/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2
                    className={`font-black text-primary mb-3 group-hover:text-gold-dark transition-colors ${
                      i === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {post.title}
                  </h2>
                  <p className="text-primary/70 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary/60 text-sm">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <span className="text-primary/30">•</span>
                      <span>{post.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gold-dark font-bold group-hover:gap-2 transition-all">
                      קרא עוד
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-bl from-gold via-gold-dark to-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            רוצה לקבל את המאמרים הבאים?
          </h2>
          <p className="text-lg text-white/80 mb-6">
            אנחנו שולחים עדכון אחד בחודש בלבד - מאמרים ומסקנות מעניינות. בלי
            ספאם, בלי שיווק אגרסיבי.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-primary font-black px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            הירשמות לעדכונים
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
