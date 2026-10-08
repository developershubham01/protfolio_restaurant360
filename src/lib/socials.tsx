import * as React from "react";
import type { ElementType } from "react";
import { Linkedin, Instagram, Youtube, Facebook } from "lucide-react";

export function XIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export type SocialLink = {
  platform: "linkedin" | "instagram" | "twitter" | "youtube" | "facebook" | string;
  label: string;
  handle: string;
  href: string;
};

export const SOCIALS: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", handle: "ABWcurious", href: "https://in.linkedin.com/company/abwcurious?trk=public_post_feed-actor-name" },
  { platform: "instagram", label: "Instagram", handle: "@abwcurious", href: "https://www.instagram.com/abwcurious?igsh=b2o3eGxxbGtlM2pu" },
  { platform: "twitter", label: "X (Twitter)", handle: "@abwcurious", href: "https://x.com/abwcurious?t=Y6CfDuM_ljg1gNvd7ByVQA&s=09" },
  { platform: "youtube", label: "YouTube", handle: "ABWcurious Studio", href: "https://www.youtube.com/@ABWcurious" },
  { platform: "facebook", label: "Facebook", handle: "ABWcurious", href: "https://www.facebook.com/share/1aTRdmi65g/" },
];

export const SOCIAL_ICONS: Record<string, ElementType> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: XIcon,
  x: XIcon,
  youtube: Youtube,
  facebook: Facebook,
};
