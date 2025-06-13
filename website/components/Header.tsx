"use client";
import Script from "next/script";
import Link from "next/link";

// Check which browser is being used
const userAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";
const isChrome =
  userAgent.includes("Chrome") && !userAgent.includes("Chromium");

export default function Header() {
  return (
    <>
      <header className="text-white w-full p-5 sm:px-10 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <Link href="/">
          <div className="text-2xl font-bold e">Dora-BamBot</div>
          <div className="text-xl e text-red-500">
            {isChrome
              ? ""
              : "This browser is not supported! Please use Chrome."}
          </div>
        </Link>
        <div className="text-2xl e">
          <a href="https://shop.wowrobo.com/products/so-arm101-diy-kit-assembled-version-1?sca_ref=8999006.W1G76EYstQkFoP">
            <Link
              href={
                "https://shop.wowrobo.com/products/so-arm101-diy-kit-assembled-version-1?sca_ref=8999006.W1G76EYstQkFoP"
              }
            >
              Buy assembled SO101 with 5% Discount on WowRobo with the code:{" "}
              <span className="text-red-500"> 1ms.ai</span>
            </Link>
          </a>
        </div>
        <a
          className="github-button"
          href="https://github.com/dora-bambot/dora-bambot.github.io"
          // data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Star timqian/bambot on GitHub"
        >
          Star
        </a>
      </header>

      {/* Script for GitHub buttons */}
      <Script async defer src="https://buttons.github.io/buttons.js" />
    </>
  );
}
