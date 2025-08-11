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
        margin: 0,
        padding: 0
      }}
      onContextMenu={(e) => e.preventDefault()} // disable right click on container
    >
      <iframe
        src={`${apiBase.replace(/\/$/, "")}/view-question-file/${file}`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
}
