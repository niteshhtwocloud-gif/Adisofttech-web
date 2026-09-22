import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ADISOFTTECH collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <h1 className="text-3xl font-extrabold text-[#0f172a]">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: January 2025</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          ADISOFTTECH (&quot;we&quot;, &quot;us&quot;) respects your privacy. This
          page explains what information we collect through this website and how
          we use it.
        </p>
        <div>
          <h2 className="mb-2 text-lg font-bold text-[#0f172a]">Information we collect</h2>
          <p>
            When you submit our contact form, we collect your name, email, phone
            number, company name, the service you&apos;re interested in, and the
            message you send us. This information is stored securely in our
            MongoDB Atlas database.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold text-[#0f172a]">How we use it</h2>
          <p>
            We use the information you provide solely to respond to your inquiry
            and, where relevant, to follow up about our services. We do not sell
            or share your information with third parties for marketing purposes.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold text-[#0f172a]">Contact us</h2>
          <p>
            If you have questions about this policy, reach out to us at
            adisofttech22@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}
