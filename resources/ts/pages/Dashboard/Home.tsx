import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import { useAuthStore } from "@store/auth";
import { Navigate } from "react-router";

export default function Home() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <PageMeta title="Panel | ERP Plantilla" />
            <PageBreadcrumb pageTitle="Panel" />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    {/* <EcommerceMetrics /> */}

                    {/* <MonthlySalesChart /> */}
                </div>

                <div className="col-span-12 xl:col-span-5">
                    {/* <MonthlyTarget /> */}
                </div>

                <div className="col-span-12">{/* <StatisticsChart /> */}</div>

                <div className="col-span-12 xl:col-span-5">
                    {/* <DemographicCard /> */}
                </div>

                <div className="col-span-12 xl:col-span-7">
                    {/* <RecentOrders /> */}
                </div>
            </div>
        </>
    );
}
