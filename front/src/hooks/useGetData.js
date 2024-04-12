import { axiosInstance } from "../config/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useGetData(url) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(url)
      .then((res) => {
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
