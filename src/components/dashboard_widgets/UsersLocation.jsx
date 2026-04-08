import { useEffect, useState } from "react";

export default function UsersLocation() {
  const [locations, setLocations] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(`${apiBase}/dashboard/users-location`);
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="col-lg-6 col-xl-9">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Users Location</h4>
        </div>

        <div className="card-body text-center">

          {/* MAP (UNCHANGED) */}
          <div id="world-map" style={{ position: "relative" }}>
            {/* Your existing SVG stays exactly the same */}
          </div>

          {/* LOCATION STATS */}
          <div className="mt-4">
            {locations.map((loc, i) => (
              <div
                key={i}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <span>{loc.country}</span>
                <strong>{loc.count} users</strong>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}