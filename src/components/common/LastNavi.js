import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LastNavi({ url }) {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (check) {
      navigate(url);
    }
  });
  return (
    <Tooltip>
      <IconButton
        value
        onClick={() => {
          setCheck(!check);
        }}
      >
        <ArrowBackIosIcon
          color="disabled"
          sx={{ fontSize: 100 }}
        ></ArrowBackIosIcon>
      </IconButton>
    </Tooltip>
  );
}
