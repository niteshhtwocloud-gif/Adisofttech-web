import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the ADISOFTTECH website and services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <h1 className="text-3xl font-extrabold text-[#0f172a]">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: January 2025</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          By using this website, you agree to the following terms. Please read
          them carefully before submitting any information to ADISOFTTECH.
        </p>
        <div>
          <h2 className="mb-2 text-lg font-bold text-[#0f172a]">Use of this site</h2>
          <p>
            This website is provided for informational purposes to help you learn
            about ADISOFTTECH&apos;s services and get in touch with our team. You
            agree not to misuse the site or attempt to disrupt its normal
            operation.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold text-[#0f172a]">Service engagements</h2>
          <p>
            Any project, quote or service engagement discussed through this
            website is subject to a separate written agreement between
            ADISOFTTECH and the client.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold text-[#0f172a]">Contact us</h2>
          <p>
            Questions about these terms can be sent to adisofttech22@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}
