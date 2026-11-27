const originals = import.meta.glob<string>("../assets/*.webp", { eager: true, import: "default" });
const resized = import.meta.glob<string>("../assets/responsive/*.webp", {
  eager: true,
  import: "default",
});

const sources = new Map(
  Object.entries(originals).map(([path, src]) => {
    const name = path.split("/").pop()?.replace(".webp", "");
    const small = resized[`../assets/responsive/${name}-480.webp`];
    const medium = resized[`../assets/responsive/${name}-800.webp`];
    const mobile = resized[`../assets/responsive/${name}-mobile.webp`];
    return [
      src,
      {
        srcSet:
          small && medium
            ? `${small} 480w, ${medium} 800w, ${src} ${name === "wedding-cover" || name === "ganesh-opening" ? 1024 : 1536}w`
            : undefined,
        mobile,
      },
    ];
  }),
);

export function artworkSources(src: string) {
  return sources.get(src);
}
