import { PillHeading } from "@/components/case-study/pill-heading";
import { ROLE_ITEMS } from "@/features/case-study-hsl/constants/data";

export function MyRoleSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
      <PillHeading
        pillWidth={189}
        segments={[
          { text: "My", accent: false },
          { text: " Role", accent: true },
        ]}
      />
      <ul className="grid w-full max-w-5xl grid-cols-2 justify-items-center gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
        {ROLE_ITEMS.map((role) => (
          <li
            key={role.label}
            className="flex min-h-[72px] w-full max-w-max items-center justify-center rounded-2xl bg-[#212121] px-6 py-4 shadow-[0px_2px_10px_#0000001a]"
          >
            <p className="text-center font-body text-lg text-white sm:text-xl md:text-2xl">
              {role.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
