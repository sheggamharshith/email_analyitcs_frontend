import React from "react";
import { Route, Switch } from "react-router-dom";
import AnalyticsPage from "../../pages/analyticsPage";
import DashBoardPage from "../../pages/Dashboard";
import InboxPage from "../../pages/inboxPage";

const DashBoardLayout = () => {
  return (
    <>
      <Route path="dashboard/main" component={DashBoardPage} />
      <Route path="dashboard/first" component={InboxPage} />
      <Route path="dashboard/second" component={AnalyticsPage} />
    </>
  );
};

export default DashBoardLayout;
