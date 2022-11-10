import { useNavigate } from "react-router-dom";

export default function EditFile() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/")}>go to scan page</button>
      <div>Edit file</div>
    </>
  );
}
