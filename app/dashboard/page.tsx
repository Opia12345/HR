import {
  Briefcase01Icon,
  Calendar01Icon,
  Clock01Icon,
  DashboardSquare01Icon,
  Logout01Icon,
  Notification01Icon,
  Search01Icon,
  Target01Icon,
  Task01Icon,
  UserCircleIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import ProfileModal from "./profile-modal";
import UserName from "./user-name";

const menu = [
  { label: "Dashboard", icon: DashboardSquare01Icon, active: true },
  { label: "Hiring", icon: Briefcase01Icon },
  { label: "Department OKR", icon: Briefcase01Icon },
  { label: "Dept Attendance", icon: Clock01Icon },
  { label: "Dept Employees", icon: UserGroupIcon },
  { label: "Big Audacious Goals", icon: Target01Icon },
  { label: "Appraisal", icon: Target01Icon },
  { label: "OKR Entry", icon: Task01Icon },
  { label: "Daily Tasks", icon: Task01Icon },
  { label: "Leave Application", icon: Calendar01Icon },
];

const okrs = [
  "Run CIM as a dependable, well-supported system that site, store and finance teams can trust daily",
  "Define clear, agreed requirements for the Real Estate automation system so design can start on solid ground.",
  "Redesign the Real Estate website to give visitors a modern, fast and easy experience",
];

const announcements = [
  { title: "Location Maintenance keep clocking in", date: "Sep 7, 2025" },
  { title: "AUGUST APPRAISALS", date: "Aug 27, 2025" },
  { title: "Attendance Maintenance", date: "Jul 22, 2025" },
];

const today = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(new Date());

const DashboardPage = () => (
  <div className="flex min-h-screen bg-gray-50 text-gray-800">
    <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="flex items-center gap-3 border-b border-gray-100 p-6">
        <Image src="/casalavoroLogon.png" width={48} height={48} alt="CasaLavoro" />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Portal</p>
          <p className="font-bold text-black">Employee Hub</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Main Menu</p>
        {menu.map(({ label, icon, active }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
              active ? "bg-orange-50 font-medium text-orange-500" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <HugeiconsIcon icon={icon} className="size-5" />
            {label}
          </div>
        ))}
      </nav>
      <Link href="/login" className="flex items-center gap-3 border-t border-gray-100 p-6 text-sm text-gray-600">
        <HugeiconsIcon icon={Logout01Icon} className="size-5" /> Log out
      </Link>
    </aside>

    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex w-full max-w-md items-center gap-2 rounded-md bg-gray-100 px-3 py-2">
          <HugeiconsIcon icon={Search01Icon} className="size-5 text-gray-500" />
          <input className="w-full bg-transparent text-sm focus:outline-none" placeholder="Search" />
        </div>
        <div className="flex items-center gap-4">
          <HugeiconsIcon icon={Notification01Icon} className="size-6" />
          <HugeiconsIcon icon={UserCircleIcon} className="size-9" />
          <span className="hidden text-sm font-medium uppercase sm:block"><UserName /></span>
        </div>
      </header>

      <main className="grid flex-1 gap-6 p-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-500">{today}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Department of the month", "Employee of the month"].map((t) => (
              <div key={t} className="flex h-48 flex-col justify-between rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest">{t}</p>
                <div>
                  <p className="text-2xl font-extrabold">COMING SOON</p>
                  <p className="text-sm text-gray-300">We appreciate you</p>
                </div>
              </div>
            ))}
          </div>

          <section className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-semibold text-black">My OKRs</h2>
            <div className="space-y-3">
              {okrs.map((o) => (
                <div key={o} className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm">{o}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <HugeiconsIcon icon={Clock01Icon} className="size-4" /> Due: 30/11/2026
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Total Employees</p>
              <p className="text-4xl font-extrabold text-black">264</p>
              <p className="text-sm text-green-600">+2% from last month</p>
            </div>
            <HugeiconsIcon icon={UserGroupIcon} className="size-10 text-orange-500" />
          </section>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="bg-orange-400 p-5 text-white">
              <p className="text-xs uppercase">Welcome back</p>
              <p className="text-xl font-bold uppercase"><UserName /></p>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold uppercase tracking-wide text-gray-500">Status</span>
                <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">Opportunity List</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 rounded-lg bg-gray-400 py-3 text-white">Clocked In</button>
                <button className="flex-1 rounded-lg bg-red-500 py-3 text-white">Clock Out</button>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-semibold text-black">Announcements</h2>
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.title} className="rounded-lg border border-yellow-300 bg-yellow-50/40 p-4">
                  <p className="text-sm">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.date}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>

    <ProfileModal />
  </div>
);

export default DashboardPage;
