import React from "react";
import moment from "moment";

type SubHeaderPostType = {
  createdAt: Date;
};

const SubHeaderPost: React.FC<SubHeaderPostType> = ({ createdAt }) => {
  const timeAgo = moment(createdAt).fromNow();
  return <div>Full stack developer &bull; {timeAgo}</div>;
};

export default SubHeaderPost;
