import Link from "next/link";

export default function OfficerSidebar() {
  return (
    <aside className="w-64 bg-[#08111F] border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold text-blue-400">
        NAYANK
      </h1>

      <nav className="mt-10 flex flex-col gap-3 text-slate-300">

        <Link href="/officer/dashboard">
          Dashboard
        </Link>

        <Link href="/officer/evidence">
          Evidence
        </Link>

        <Link href="/officer/nethrai">
          NETRAI
        </Link>

        <Link href="/officer/sanket">
          SANKET
        </Link>

        <Link href="/officer/reports">
          Reports
        </Link>

      </nav>
    </aside>
  );
}