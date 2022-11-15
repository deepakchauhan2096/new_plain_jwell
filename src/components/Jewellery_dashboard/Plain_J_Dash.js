import React, { useEffect, useState, useContext } from "react";
import { dataContext } from "../helpers/context";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";

const Plain_J_Dash = () => {
  const navigate = useNavigate();
  const [alllist, setAllList] = useState();
  const [popularlist, setPopularList] = useState();
  const [hit, setHit] = useState(false);
  const [show, setShow] = useState(false);
  const [ispopular, setIspopular] = useState(false);
  const [agreePrice, setAgreePrice] = useState("");
  const { productValue, setProdctValue } = useContext(dataContext);
  const [body, setBody] = useState([]);
  const [formValues, setFormValues] = useState([]);

  let finalArray = [];
  let value2;
  let Total_price;
  let perGram;
  let gpp;

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

    console.log(alllist, "all products list");
  }, []);

  var to_Delete = "";
  const delete_element = (cellValues) => {
    console.log("element", cellValues);
    to_Delete = cellValues;
    console.log(to_Delete, "to delete");
    var filteredArray = formValues.filter(function (e) {
      return e.ct_number != to_Delete.code;
    });
    setFormValues(filteredArray);
    console.log(filteredArray);
  };

  const rouundoff = (value) => {
    var return_value = Math.round((value + Number.EPSILON) * 100) / 100;
    return return_value;
  };

  const insertObject = (jsonbody) => {
    finalArray = [...finalArray, jsonbody];
    setBody((prev) => {
      return [...prev, jsonbody];
    });
    console.log(finalArray, "final");
    console.log(body, "state value");
    setShow(false);
  };

  const change_value = () => {
    if (value2) {
      if (formValues?.find((o) => o.ct_number === value2)) {
        alert("Product is selected, please choose diffrent product");
      } else {
        setShow(true);
        var one_row = alllist.find((o) => o.ct_number == value2);
        console.log(one_row, "one roww");
        console.log(formValues);

        setFormValues([...formValues, one_row]);
        console.log(formValues);
        console.log(value2, " list value");
      }
    } else {
      alert("Please select a valid option");
    }
  };

  const handle_input = (value, cellValues) => {
    const newArr = formValues.map((obj) => {
      if (obj.ct_number === cellValues.code) {
        return { ...obj, edit_dec: value };
      }
      return obj;
    });
    setFormValues(newArr);
    console.log(newArr, "newarr");
  };
  const handle_unitPrice = (value, cellValues) => {
    Total_price = +value + +((value / 100) * 20);
    perGram = rouundoff(cellValues.metal_weight_gm / value);
    gpp = rouundoff(
      (value - cellValues.retail_price) / cellValues.retail_price
    );
    const newArr = formValues.map((obj) => {
      if (obj.ct_number === cellValues.code) {
        return {
          ...obj,
          unit_price: value,
          total_price: Total_price,
          per_gm: perGram,
          gpp: gpp,
        };
      }

      return obj;
    });
    setFormValues(newArr);
    console.log(newArr, "newarr");
  };

  const handle_ok = () => {
    // console.log(alllist,"alllist")
    setProdctValue(formValues);
    navigate("/Plain_J_Invoice");
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      renderCell: (cellValues) => (
        <button
          style={{
            padding: 5,
            background: "#ff3d3d",
            color: "#fff",
            borderRadius: 10,
            border: "none",
          }}
          onClick={() => {
            delete_element(cellValues.row);
          }}
        >
          Delete
        </button>
      ),
    },
    { field: "code", headerName: "ct_number", width: 120 },
    { field: "metal_category", headerName: "metal_category", width: 120 },
    { field: "product_category", headerName: "product_category", width: 150 },
    { field: "metal_type", headerName: "metal_type", width: 120 },
    { field: "detail_product_des", headerName: "description", width: 120 },
    {
      field: "descr",
      headerName: "Edit_Description",
      width: 120,
      renderCell: (cellValues) => (
        <>
          <input
            style={{ width: "100%", height: "60%" }}
            onChange={(e) => handle_input(e.target.value, cellValues.row)}
          />
        </>
      ),
    },

    {
      field: "unit",
      headerName: "Unit price",
      width: 120,
      renderCell: (cellValues) => (
        <>
          <input
            style={{ width: "100%", height: "60%" }}
            onChange={(e) => handle_unitPrice(e.target.value, cellValues.row)}
          />
        </>
      ),
    },
    { field: "metal_weight_gm", headerName: "Gross_weight", width: 120 },
    { field: "retail_price", headerName: "retail_price", width: 120 },

    { field: "Total_price", headerName: "Total_price", width: 100 },
    { field: "product_id", headerName: "product_id", width: 120 },
    { field: "per_gm", headerName: "Per/Gm pc", width: 100 },
    { field: "gpp", headerName: "GPP%", width: 100 },
  ];

  const rows = formValues?.map((row) => ({
    code: row.ct_number,
    metal_category: row.metal_category,
    product_category: row.product_category,
    metal_type: row.metal_type,
    detail_product_des: row.detail_product_dsc,
    metal_weight_gm: row.metal_weight_gm,
    retail_price: row.retail_price,
    Total_price: row.total_price,
    product_id: row.product_id,
    per_gm: row.per_gm,
    gpp: row.gpp,
  }));

  return (
    <div style={{ padding: 20 }}>
      {/* <Navbar /> */}
      <Sidebar />

      <select
        style={{
          color: "black",
          fontSize: 20,
          width: 200,
          height: 40,
          border: "1.5px solid #267ED4",
          borderRadius: 15,
          margin: 4,
        }}
        onChange={(e) => (value2 = e.target.value)}
        className="select-option"
      >
        <option selected disabled>
          CT Number
        </option>
        {alllist?.map((value) => (
          <>
            <option value={value.ct_number}>{value.ct_number}</option>
          </>
        ))}
      </select>

      <button
        onClick={change_value}
        style={{
          padding: 5,
          color: "#fff",
          background: "#267ED4",
          border: "none",
          borderRadius: 10,
        }}
      >
        Select
      </button>

      <button
        style={{
          border: "none",
          marginLeft: "0.5%",
          background: "#267E",
          color: "#fff",
          padding: 5,
          width: "10%",
          borderRadius: 10,
        }}
        onClick={handle_ok}
      >
        NEXT
      </button>

      <DataGrid
        style={{ height: "28rem", width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={20}
        getRowId={(row) => row.code}
        rowsPerPageOptions={[20]}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default Plain_J_Dash;
