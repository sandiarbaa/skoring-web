import React from "react";

type inboxProps = {
  data: string;
};

const ContentDashboardInbox = ({ data }: inboxProps) => {
  return (
    <div>
      <div>haloo</div>
      <div>{data}</div>
    </div>
  );
};

export default ContentDashboardInbox;
