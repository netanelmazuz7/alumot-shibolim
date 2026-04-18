import { Heart } from "lucide-react";
import WheatParableAnimation from "./WheatParableAnimation";

export default function StrengthInUnity() {
  return (
    <section className="py-24 bg-gradient-to-bl from-wheat-light via-cream to-wheat overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 text-gold-dark" />
            <span className="text-sm font-bold text-gold-dark">
              המשל הישן שמאחורי השם
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            שיבול אחד - נשבר. אלומה - עומדת.
          </h2>
          <p className="text-xl text-primary/60 max-w-2xl mx-auto">
            המשל של אבי השבטים על יחידות קהילתית - כל אחד מאיתנו לבד, שביר. יחד,
            אנחנו בלתי ניתנים לשבירה.
          </p>
        </div>

        {/* Single continuous animation */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-wheat-dark/10 p-6 md:p-10 mb-12 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <WheatParableAnimation />
          </div>
        </div>

        {/* Story section */}
        <div className="max-w-3xl mx-auto bg-gradient-to-l from-primary to-primary-dark rounded-3xl p-10 text-center shadow-2xl">
          <p className="text-gold text-sm font-bold mb-3 tracking-wider">
            המשל של אבי השבטים
          </p>
          <blockquote className="text-white text-xl leading-relaxed italic">
            &ldquo;אב זקן קרא לבניו לפני מותו, נתן לכל אחד שיבול אחד וביקש שישברו
            אותו - וכל אחד שבר בקלות. אז כרך את כל השיבולים יחד לאלומה וביקש
            שישברו - אף אחד לא הצליח. אמר להם: &apos;כשאתם מאוחדים - אתם בלתי
            ניתנים לשבירה&apos;.&rdquo;
          </blockquote>
          <p className="text-gold/70 text-sm mt-6">
            זה הרעיון שעומד בבסיס אלומת שיבולים.
          </p>
        </div>
      </div>
    </section>
  );
}
