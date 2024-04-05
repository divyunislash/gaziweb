import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useGetData(url) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        if (!res.data.access) {
          navigate("/");
        }
        return res.data;
      })
      .then((data) => {
        setData(data);
      });
  }, [url, navigate]);

  return data;
}
