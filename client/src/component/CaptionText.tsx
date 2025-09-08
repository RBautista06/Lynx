import { useState } from "react";
type CaptionTextProps = {
  text?: string;
  limit?: number;
  size?: string;
};
const CaptionText = ({
  text = "",
  limit = 150,
  size = "text-sm ",
}: CaptionTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const shouldTruncate = text.length > limit;

  const displayText =
    isExpanded || !shouldTruncate ? text : text.slice(0, limit).trimEnd();

  return (
    <p className={`${size} leading-tight`}>
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
