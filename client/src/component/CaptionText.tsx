import { useState } from "react";

const CaptionText = ({
  text,
  limit = 150,
}: {
  text: string;
  limit?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const shouldTruncate = text.length > limit;

  const displayText =
    isExpanded || !shouldTruncate ? text : text.slice(0, limit).trimEnd();

  return (
    <p className="text-sm leading-tight">
      {displayText}
      {shouldTruncate && !isExpanded && (
        <span
          className="opacity-50 cursor-pointer inline ml-1"
          onClick={handleToggle}>
          ...See more
        </span>
      )}
      {isExpanded && shouldTruncate && (
        <span
          className="opacity-50 cursor-pointer inline ml-1"
          onClick={handleToggle}>
          See less
        </span>
      )}
    </p>
  );
};

export default CaptionText;
