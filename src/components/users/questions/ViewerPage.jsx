import { useSearchParams } from "react-router-dom";

export default function ViewerPage() {
  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");
  const apiBase = import.meta.env.VITE_API_URL;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
        zIndex: 9999,
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
      onContextMenu={(e) => e.preventDefault()} // disable right click
    >
      <iframe
        src={`${apiBase.replace(/\/$/, "")}/view-question-file/${file}`}
        style={{
          width: "400%", // increase width so scaling still fills screen
          height: "400%", // increase height proportionally
          transform: "scale(0.25)", // zoom out to 25%
          transformOrigin: "0 0", // scale from top-left
          border: "none",
        }}
        title="PDF Viewer"
      />
    </div>
  );
}
