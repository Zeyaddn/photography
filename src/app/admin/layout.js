export const metadata = {
  title: "Admin Dashboard | Lens of Creativity",
  description: "Secure administrative dashboard for managing photography galleries and projects.",
  alternates: {
    canonical: "https://lensofcreativity.com/admin",
  },

};

import { Suspense } from "react";
import AdminClientLayout from "./AdminClientLayout";

export default function AdminLayout({ children }) {
  return (
    <Suspense fallback={<div className="bg-dark min-vh-100"></div>}>
      <AdminClientLayout>
        {children}
      </AdminClientLayout>
    </Suspense>
  );
}
