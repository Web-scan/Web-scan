import { useNavigate } from "react-router-dom";
import { TfiFiles } from "react-icons/tfi";

import { GREY_150 } from "../../constants/color";

export default function FileIcon() {
  const navigate = useNavigate();

  return (
    <TfiFiles
      size="42"
      color={GREY_150}
      onClick={() => navigate("/edit")}
      data-testid="file-icon"
    />
  );
}
