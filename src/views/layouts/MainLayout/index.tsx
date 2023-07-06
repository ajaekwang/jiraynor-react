import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../../Navigation";
import Authentication from "../../Authentication";
import BoardMain from "../../Authentication/BoardMain";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";

export default function MainLayout() {
  const [boardResponse, setBoardResponse] = useState<string>("");
  const [cookies] = useCookies();
  const { user } = useUserStore();
  
  console.log(user);

  const getBoard = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get("http://localhost:4000/api/board/", requestOption)
      .then((response) => {
        setBoardResponse(response.data);
      })
      .catch((error) => "");
  };

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      getBoard(token);
    } else {
      setBoardResponse('');
    }
  }, [cookies.token]);

  return (
    <>
      <Navigation />
      {user? <BoardMain /> : <Authentication />}
    </>
  );
}
