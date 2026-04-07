import AdminLayout from "../../components/AdminLayout"

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>
          Welcome to the admin dashboard! Here you can manage products,
          categories, and view sales data.
        </p>
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          HALAMAN INI CUMA SEBAGAI PLACEHOLDER. TOLONG DILANJUTKAN MAS.
        </h1>
      </div>
    </AdminLayout>
  )
}
