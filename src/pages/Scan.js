import { useNavigate } from "react-router-dom";

export default function Scan() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/edit")}>go to edit file</button>
      <div>Scan page</div>
    </>
  );
}
