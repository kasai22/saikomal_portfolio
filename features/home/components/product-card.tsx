import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { ParallaxImage } from "@/components/ui/parallax-image";
import type { Product } from "@/features/home/types";

interface ProductCardProps {
  product: Product;
}

/**
 * One entry in the catalogue, in the reference's card grammar:
 * CATEGORY → name → tagline → description → ENTER. Products without a
 * case study simply have no ENTER affordance and render as a plain
 * record — they are still part of the catalogue.
 */
export function ProductCard({ product }: ProductCardProps) {
  const body = (
    <Panel
      level={product.href ? 2 : 1}
      className="group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-ink/35"
    >
      <div className="relative h-36 shrink-0 overflow-hidden border-b border-ink/[0.09] bg-paper-sunk">
        {product.image ? (
          <ParallaxImage
            src={product.image}
            alt={`${product.name} — interface`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-dots flex h-full w-full items-center justify-center" aria-hidden="true">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
              No public visual
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline gap-2">
          <span className="t-eyebrow text-brand-ink">{product.category}</span>
          <span className="t-eyebrow ml-auto text-ink/60">{product.year}</span>
        </div>
        <h3 className="t-h3 text-ink">{product.name}</h3>
        <p className="t-meta text-ink/70">{product.tagline}</p>
        <p className="t-meta flex-1 text-ink/60">{product.description}</p>

        {product.href ? (
          <span className="t-action flex items-center gap-1.5 pt-1 text-brand-ink transition-all duration-200 group-hover:gap-2.5">
            Enter
            <ArrowRightIcon className="h-3 w-3" />
          </span>
        ) : (
          <span className="t-action pt-1 text-ink/60">No public case study</span>
        )}
      </div>
    </Panel>
  );

  if (!product.href) return body;

  return (
    <Link href={product.href} data-cursor="view" className="block h-full">
      {body}
    </Link>
  );
}
