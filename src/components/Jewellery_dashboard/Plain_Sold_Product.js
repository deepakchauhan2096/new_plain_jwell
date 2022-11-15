import React,{useEffect,useState} from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";

const Plain_Sold_Product = () => {

    const [alllist, setAllList] = useState();



useEffect(() => {
    const allListdata = () => {  
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/sold_product`)
          .then((res) => res.json())
          .then((data) =>
            setAllList(data)
          );
        console.log(alllist, "alllist");
      };
      allListdata();
}, [])

  const columns = [
    { field: "client_id", headerName: "client_id", width: 100 },
    { field: "first_name", headerName: "first_name", width: 120 },
    { field: "surname", headerName: "surname", width: 100 },
    { field: "postcode", headerName: "postcode", width: 100 },
    { field: "mobile", headerName: "mobile", width: 120 },
    { field: "email", headerName: "email", width: 100 },
    { field: "products", headerName: "product ct", width: 100 },

    // {
    //     field: "product",
    //     headerName: "Product",
    //     width: 120,
    //     renderCell: (cellValues) => (
    //       <>
    //         {alllist.map((e)=>e.products[0].map((e)=>e.CT_number))}
    //       </>
    //     ),
    //   },
  ];

  const rows = alllist?.map((row) => ({

    client_id: row.client_id,
    first_name: row.first_name,
    surname: row.surname,
    postcode: row.postcode,
  //  products: row.products.products_data.map((e)=>e.CT_number),
    mobile: row.mobile,
    email: row.email,
  }));

  return (
    <div>
      <Sidebar />
   <center> <h4>Orders</h4></center>  

{alllist?
      <DataGrid
        style={{ height: "28rem", width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={20}
        getRowId={(row) => row.client_id}
        rowsPerPageOptions={[20]}
        components={{ Toolbar: GridToolbar }}
      />:null}

    </div>
  )
}

export default Plain_Sold_Product