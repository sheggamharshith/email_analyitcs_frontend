import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import AnalyticsPage from "../../pages/analyticsPage";
import DashBoardPage from "../../pages/Dashboard";
import InboxPage from "../../pages/inboxPage";
import NavBarNav from "../NavBar/NavBarNav";

const DashBoardLayout = () => {
  const url = useRouteMatch();
  return (
    <div className="main-dasboard">
      <NavBarNav />
      <Route path={`${url.path}/main`} component={DashBoardPage} />
      <Route path={`${url.path}/inbox`} component={InboxPage} />
      <Route path={`${url.path}/analytics`} component={AnalyticsPage} />
    </div>
  );
};

export default DashBoardLayout;
