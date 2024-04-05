import "../../style/AccountsList.scss";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const columns = [
  { id: "rownum", label: "No.", minWidth: 50 },
  { id: "account_date", label: "날짜", minWidth: 110 },
  { id: "category_nm", label: "카테고리", minWidth: 100, align: "right" },
  {
    id: "account_title",
    label: "타이틀",
    minWidth: 100,
    align: "right",
  },
  {
    id: "account_mount",
    label: "금액",
    minWidth: 90,
    align: "right",
  },
  {
    id: "account_cd",
    align: "right",
  },
];

export default function AccountsList({ accountsList }) {
  const rows = accountsList;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function deleteData(data) {
    const account_cd = JSON.stringify({ account_cd: data });

    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .post("/delete_account", account_cd, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          alert(response.data);
          window.location.reload();
        })
        .catch((error) => console.log(error.response));
    }
  }

  return (
    <div className="accountsList">
      <Paper sx={{ overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.rownum}
                    >
                      {columns.map((column) => {
                        const id = column.id;
                        const value = row[id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {id !== "account_cd" ? (
                              value
                            ) : (
                              <IconButton
                                aria-label="delete"
                                onClick={() => deleteData(value)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
