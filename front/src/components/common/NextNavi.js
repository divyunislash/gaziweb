import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NextNavi({ url }) {
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
        <NavigateNextIcon
          color="disabled"
          sx={{ fontSize: 100 }}
        ></NavigateNextIcon>
      </IconButton>
    </Tooltip>
  );
}
