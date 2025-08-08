import { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Pagination from "../../components/Pagination"; // You'll need to create this component

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const apiBase = import.meta.env.VITE_API_URL;

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(`${apiBase}/api/users?page=${page}`, {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.data || []);
      setPagination({
        current_page: data.meta?.current_page || 1,
        last_page: data.meta?.last_page || 1,
        per_page: data.meta?.per_page || 10,
        total: data.meta?.total || 0,
      });
    } catch (err) {
      setErrors({ general: err.message });
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  return (
    <>
      <title>Users - 1staccess Home Care</title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>All Users</h3>
                    <p className="mb-2">User management dashboard</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home</a>
                    <span><i className="ri-arrow-right-s-line" /></span>
                    <a href="#">All Users</a>
                  </div>
                </div>
              </div>
            </div>
            
            {errors.general && (
              <div className="alert alert-danger">{errors.general}</div>
            )}

            <div className="row">
              <div className="col-12">
                <div className="card transparent">
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="rtable rtable--5cols rtable--collapse">
                          <div className="rtable-row rtable-row--head bg-transparent">
                            <div className="rtable-cell topic-cell column-heading text-dark">
                              <strong>Name</strong>
                            </div>
                            <div className="rtable-cell id-cell column-heading text-dark">
                              <strong>Email</strong>
                            </div>
                            <div className="rtable-cell date-cell column-heading text-dark">
                              <strong>Date</strong>
                            </div>
                            <div className="rtable-cell amount-cell column-heading text-dark">
                              <strong>Privacy</strong>
                            </div>
                            <div className="rtable-cell card-cell column-heading text-dark">
                              <strong>Role</strong>
                            </div>
                            <div className="rtable-cell receipt-cell column-heading text-dark">
                              <strong>Actions</strong>
                            </div>
                          </div>

                          {users.map((user) => (
                            <div className="rtable-row" key={user.id}>
                              <div className="rtable-cell topic-cell">
                                <div className="rtable-cell--content title-content">
                                  <h5>{user.name}</h5>
                                </div>
                              </div>
                              <div className="rtable-cell id-cell">
                                <div className="rtable-cell--content">
                                  {user.email}
                                </div>
                              </div>
                              <div className="rtable-cell date-cell">
                                <div className="rtable-cell--content">
                                  {new Date(user.created_at).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="rtable-cell amount-cell">
                                <div className="rtable-cell--content">
                                  {user.privacy_level || 'Standard'}
                                </div>
                              </div>
                              <div className="rtable-cell card-cell">
                                <div className="rtable-cell--content">
                                  {user.role}
                                </div>
                              </div>
                              <div className="rtable-cell receipt-cell">
                                <div className="rtable-cell--content">
                                  <button className="btn btn-sm btn-primary">
                                    <i className="ri-eye-line" /> View
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Pagination
                          currentPage={pagination.current_page}
                          totalPages={pagination.last_page}
                          onPageChange={handlePageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}