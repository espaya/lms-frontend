import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Cookies from "js-cookie";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function UsersLocation() {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`${apiBase}/api/dashboard/users-location`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });

      const data = await res.json();
      const result = Array.isArray(data) ? data : data.data;

      setLocations(result || []);
    };

    fetchLocations();
  }, []);

  // ✅ match state to map
  const getStateUsers = (geo) => {
    if (!geo?.properties?.name) return 0;

    const match = locations.find(
      (l) =>
        l.state &&
        l.state.toLowerCase() === geo.properties.name.toLowerCase()
    );

    return match ? match.count : 0;
  };

  // ✅ heatmap colors
  const getColor = (count) => {
    if (count > 100) return "#084298";
    if (count > 50) return "#0d6efd";
    if (count > 20) return "#6ea8fe";
    if (count > 5) return "#cfe2ff";
    return "#f8f9fa";
  };

  // ✅ totals
  const totalUsers = locations.reduce((sum, l) => sum + l.count, 0);

  // ✅ sorted list
  const sortedLocations = [...locations].sort((a, b) => b.count - a.count);
  const max = sortedLocations[0]?.count || 1;

  return (
    <div className="col-lg-6 col-xl-9">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Users Location</h4>
        </div>

        <div className="card-body text-center">
          {/* TOTAL */}
          <h5 className="mb-3">Total Users: {totalUsers}</h5>

          {/* MAP */}
          <div style={{ position: "relative" }}>
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{ scale: 1000 }}
              width={800}
              height={500}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const count = getStateUsers(geo);

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() =>
                          setHovered({
                            state: geo.properties.name,
                            users: count,
                          })
                        }
                        onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                          setSelected({
                            state: geo.properties.name,
                            users: count,
                          })
                        }
                        style={{
                          default: {
                            fill: getColor(count),
                            outline: "1px solid #fff",
                            transition: "all 0.3s ease",
                          },
                          hover: {
                            fill: "#ffc107",
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: "#dc3545",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* TOOLTIP */}
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "#000",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                {hovered.state} — {hovered.users} users
              </div>
            )}
          </div>

          {/* SELECTED STATE */}
          {selected && (
            <div className="mt-3">
              <h5>{selected.state}</h5>
              <p>{selected.users} users</p>
            </div>
          )}

          {/* STATE LIST */}
          <div className="mt-4 text-start">
            {sortedLocations.map((loc, i) => (
              <div
                key={i}
                className="d-flex align-items-center justify-content-between border-bottom py-2"
              >
                <span style={{ width: "120px" }}>{loc.state}</span>

                <div style={{ flex: 1, margin: "0 10px" }}>
                  <div
                    style={{
                      height: "6px",
                      background: "#e9ecef",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: `${(loc.count / max) * 100}%`,
                        height: "100%",
                        background: "#0d6efd",
                        borderRadius: "4px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                <strong>{loc.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}