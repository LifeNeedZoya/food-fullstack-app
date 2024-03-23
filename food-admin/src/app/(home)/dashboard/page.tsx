import React from "react";

import dynamic from "next/dynamic";

const AppView = dynamic(() => import("@/components/sections/appView"), {
  ssr: false,
});

const DashboardPage = () => {
  return <AppView />;
};

export default DashboardPage;
