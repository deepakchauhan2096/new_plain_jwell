import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";

const All_stock = () => {
  const [alllist, setAllList] = useState();

  useEffect(() => {
    const allListdata = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/plainstock`)
        .then((res) => res.json())
        .then((data) =>
          setAllList(
            data.filter((value) => {
              return value.ct_number !== null && value.sold != "True";
            })
          )
        );
      console.log(alllist, "alllist");
    };
    allListdata();
  }, []);

  const columns = [{ field: "ct_number", headerName: "ct_number", width: 100 }];

  const rows = alllist?.map((row) => ({
    ct_number: row.ct_number,
  }));

  return (
    <div>
      <Sidebar />
      <center>
        {" "}
        <h4 style={{margin:"2%"}} >Available Stock</h4>
      </center>
      {/* <button onClick={console.log(alllist)} >print</button> */}
      {alllist ? (
        <DataGrid
          style={{ height: "28rem", width: "100%" }}
          rows={rows}
          columns={columns}
          pageSize={20}
          getRowId={(row) => row.ct_number}
          rowsPerPageOptions={[20]}
          components={{ Toolbar: GridToolbar }}
        />
      ) : null}
    </div>
  );
};

export default All_stock;
