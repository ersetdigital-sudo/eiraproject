"use client";

import { useEffect } from "react";

export default function PageScripts() {
  useEffect(() => {
    /* WhatsApp: tambahkan sumber klik ke pesan yang sudah terisi otomatis */
    (function () {
      var cta = document.getElementById("wa-cta") as HTMLAnchorElement | null;
      if (!cta) return;
      var src =
        new URLSearchParams(location.search).get("utm_source") ||
        "bio link Instagram";
      try {
        var u = new URL(cta.href);
        var text = u.searchParams.get("text") || "";
        if (text.indexOf("(Dikirim dari ") === -1) {
          u.searchParams.set(
            "text",
            text + "\n\n(Dikirim dari " + src + ")"
          );
          cta.href = u.toString();
        }
      } catch (e) {}
    })();

    /* reveal on scroll */
    (function () {
      var els = document.querySelectorAll(".reveal");
      if (!("IntersectionObserver" in window)) {
        els.forEach(function (el) {
          el.classList.add("in");
        });
        return;
      }
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var el = e.target as HTMLElement;
            var d = parseInt(el.dataset.delay || "0", 10);
            setTimeout(function () {
              el.classList.add("in");
            }, d);
            io.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach(function (el) {
        io.observe(el);
      });
    })();
  }, []);

  return null;
}
