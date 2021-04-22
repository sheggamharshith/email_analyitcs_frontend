import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import AnalyticsPage from "../../pages/analyticsPage";
import DashBoardPage from "../../pages/Dashboard";
import InboxPage from "../../pages/inboxPage";
import MailViewSingle from "../../pages/MailViewSingle";
import NavBarNav from "../NavBar/NavBarNav";

const DashBoardLayout = () => {
  const url = useRouteMatch();

  return (
    <div className="flex flex-col h-screen border border-double overflow-y-auto ">
      <NavBarNav />
      <Route path={`${url.path}/main`} component={DashBoardPage} />
      <Route exact path={`${url.path}/inbox`} component={InboxPage} />
      <Route path={`${url.path}/analytics`} component={AnalyticsPage} />
      <Route
        path={`${url.path}/inbox/:message_id`}
        component={MailViewSingle}
      />
    </div>
  );
};

export default DashBoardLayout;
