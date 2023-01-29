import React from "react";
import moment from "moment";

type SubHeaderPostType = {
  createdAt: Date;
  position?: string;
};

const SubHeaderPost: React.FC<SubHeaderPostType> = ({
  createdAt,
  position,
}) => {
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div>
      {position} &bull; {timeAgo}
    </div>
  );
};

export default SubHeaderPost;
