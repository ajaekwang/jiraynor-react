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
  //const { testData, setTestData } = useState<string>("");

  const getBoard = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get("http://3.35.167.70:4040/api/board/list", requestOption)
      .then((response) => {
        setBoardResponse(response.data);
        
      })
      .catch((error) => console.log(error));
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
      {user ? <BoardMain /> : <Authentication />}
    </>
  );
}
