export default function SteamAnimation() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <path
        className="steam-path steam-1"
        d="M25,110 C25,90 45,85 40,65 C35,45 20,40 22,20 C24,5 35,0 35,0"
      />
      <path
        className="steam-path steam-2"
        d="M60,110 C60,88 80,82 75,62 C70,42 52,36 55,16 C57,2 68,0 68,0"
      />
      <path
        className="steam-path steam-3"
        d="M95,110 C95,90 78,85 82,65 C86,45 100,40 98,20 C96,5 88,0 88,0"
      />
    </svg>
  );
}
