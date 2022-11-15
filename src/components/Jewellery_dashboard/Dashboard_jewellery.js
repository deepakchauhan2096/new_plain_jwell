import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useNavigate
} from "react-router-dom";

const Dashboard_jewellery = () => {
  const [data2, setData] = useState([{
    item_id: 1,
    item: "9CT CZ JEWELLERY"
  }, {
    item_id: 2,
    item: "9CT JEWELLERY PLAIN"
  }]);
  const [formValues, setFormValues] = useState([]);
  const [hit, setHit] = useState(false);
  const [value, setValue] = useState();
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [ispopular, setIspopular] = useState(false);
  const [productDropdown, setProductDropdown] = useState([])
  const [fieldData, setFieldData] = useState({
    items_arr: ["9CT JEWELLERY PLAIN", "9CT CZ JEWELLERY", "18CT JEWELLERY PLAIN", "22CT JEWELLERY", "22CT JEWLLERY CZ /STONE", "SILVER"],

    item_type: ["RING", "PENDANT", "S CHAIN", "H CHAIN", "BRACELET"],
    product_sub_cat: [{
      item_type: "RING",
      dropdown: ["PLAIN", "STONE SET"],

    },
    {
      item_type: "PENDANT",
      dropdown: ["FILIGREE", "S", "M", "L"],

    }],
    supplier: ["THC", "CTS", "BAB", "DLP", "JJ", "MJ"],
    product_size: [{
      item_type: "RING",
      dropdown: ["F", "G+", "F"],

    },
    {
      item_type: "PENDANT",
      dropdown: ["F", "G+", "F"],

    }],
  })

  const [fieldValue_Selected, setFieldValue_Selected] = useState({
    item: "",
    item_type: "",
    dropdown_of_product_sub_cat: []

  })
  const [selectedData, setSelectedData] = useState([])
  const [todayDate, setTodayDate] = useState()
  const [storeBulkData, setStoreBulkData] = useState([])
  const [storeSupplierData, setStoreSupplierData] = useState([])
  const [storePriceFromAPI, setStorePriceFromAPI] = useState([
    {
      "metal": "Gold",
      "TimeStemp": "2022-09-28 12:03:15.385082",
      "currency": {
        "GBP": {
          "bid": "",
          "offer": ""
        }
      }
    },
    {
      "metal": "Silver",
      "TimeStemp": "2022-09-28 12:03:15.385082",
      "currency": {
        "GBP": {
          "bid": "",
          "offer": ""
        }
      }
    },
    {
      "metal": "Platinum",
      "TimeStemp": "2022-09-28 12:03:15.385082",
      "currency": {
        "GBP": {
          "bid": "",
          "offer": ""
        }
      }
    },
    {
      "metal": "Palladium",
      "TimeStemp": "2022-09-28 12:03:15.385082",
      "currency": {
        "GBP": {
          "bid": "",
          "offer": ""
        }
      }
    },
    {
      "metal": "Rhodium",
      "TimeStemp": "2022-09-28 12:03:15.385082",
      "currency": {
        "GBP": {
          "bid": "",
          "offer": ""
        }
      }
    }
  ])


  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {

    try {

      let date = new Date();
      setTodayDate(date.toLocaleDateString())
      const alldata = () => {


        console.log(process.env.REACT_APP_SERVER_IP, "SERVER_IP")
        setLoader(true)
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/dropdown`)
          .then((res) => res.json())
          .then((data) => {
            console.log("data > ", data)
            setStoreBulkData([{
              items_arr: data[0].item,
              item_size: data[0].item_size,
              product_sub_cat: data[0].sub_category,
              supplier: data[0].supplier_code,
              item_type: data[0].sub_category.map((e) => {
                return e.ITEM_TYPE
              })
            }])
            let tempData = data[0].item.map((e, i) => {
              return {
                item_id: i + 1,
                item: e
              }
            })
            console.log("tempData : ", tempData)
            setData(tempData)
            setProductDropdown(data[0].item)

            setLoader(false)
            supplier_data();
          }).catch((err) => {
            alert("API not working");
            setLoader(false)
            throw Error(err)
          });

      };

      const getPriceFromAPI = () => {
        setLoader(true)
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/liveprice`)
          .then((res) => res.json())
          .then((data) => {
            console.log("data supplier > ", data)

            let uniqueElements = [...new Set(data.map(item => item.metal))];
            console.log(uniqueElements)

            let temp = []
            uniqueElements.map((el) => {
              temp.push(data.filter((e) => e.metal == el).filter((e) => Object.keys(e.currency)[0] == "GBP")[0])

              console.log("temp : ", temp)
            })

            setStorePriceFromAPI(temp)
            setLoader(false)

          }).catch((err) => {
            console.log("err : ", err)
            setLoader(false)
          });
      };

      const supplier_data = () => {
        setLoader(true)
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/plainstock`)
          .then((res) => res.json())
          .then((data) => {
            console.log("data supplier > ", data)
            setStoreSupplierData(data)
            setLoader(false)
            getPriceFromAPI()
          }).catch((err) => {
            setLoader(false)
          });
      };



      alldata();

    } catch (err) {
      setLoader(false)
      alert("Some Error Occurred");

    }
    const interval = setInterval(() => {
      setHit(true);
    }, 300000);

    return () => clearInterval(interval);
  }, []);


  var to_Delete = "";
  const delete_element = (cellValues) => {
    console.log("element", cellValues);
    to_Delete = cellValues;
    console.log(to_Delete, "to delete");
    var filteredArray = formValues.filter(function (e) {
      return e.item_id !== to_Delete.item_id;
    });
    setFormValues(filteredArray);
    console.log(formValues);
  };

  const change_value = () => {
    console.log(value, "value");
    console.log(storeBulkData, "storeBulkData");
    if (value) {
      if (formValues?.find((o) => o.item === value)) {
        alert("Product is selected, please choose diffrent product");
      } else {
        console.log("data2 : ", data2)
        var one_row = data2.find((o) => o.item === value);
        console.log(one_row, "one roww");

        setFormValues([...formValues,
        {
          ...one_row,
          TodayDate: todayDate,
          item: fieldValue_Selected.item,
          dropdown: storeBulkData[0].item_type,
          product_sub_cat_dropdown: [],
          supplier_dropdown: storeBulkData[0].supplier,
          Wt_est: "0",
          product_ref: "",
          price: "0",
          product_size_dropdown: [],
          item_type_selected: "Select Option",
          product_sub_cat_selected: "Select Option",
          supplier_selected: "Select Option",
          product_size_selected: "Select Option",
          metal_selected: "Select Option",
          notes_selected: ""

        }]);


        console.log(formValues);
      }
    } else {
      alert("Please select a valid option (jew)");
    }
  };




  const columns = [
    {
      field: "action",
      headerName: "Action",
      renderCell: (cellValues) => (
        <button
          style={{
            padding: 10,
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
    {
      field: "item", headerName: "ITEM", width: 120,

    },
    {
      field: "item_type", headerName: "ITEM TYPE", width: 120,


      renderCell: (cellValues) => {
        console.log("item_type : ", cellValues)
        return <>
          <select
            style={{
              color: "black",
              fontSize: 15,
              width: 100,
              height: 40,
              border: "1.5px solid #267ED4",
              borderRadius: 15,
              margin: 4,
            }}

            onChange={(e) => {
              console.log("e : ", e.target.value, cellValues)
              console.log("formValues : ", formValues)


              const newArr = formValues.map((obj) => {

                if (obj.item_id === cellValues.row.item_id) {

                  return {
                    ...obj,
                    product_sub_cat_dropdown: storeBulkData[0].product_sub_cat.filter((elem) => elem.ITEM_TYPE == e.target.value)[0].DROPDOWN,
                    product_size_dropdown: storeBulkData[0].item_size.filter((elem) => elem.ITEM_TYPE == e.target.value)[0].DROPDOWN,
                    item_type_selected: e.target.value

                  };
                }
                return obj;
              });

              console.log(newArr, "newarr");
              setFormValues(newArr)

            }

            }
            className="select-option"
          >
            <option selected disabled>select Option </option>
            {cellValues.row.dropdown.map((e) => <option value={e}>{e}</option>)}

          </select>
        </>
      },
    },
    {
      field: "product_sub_category", headerName: "PRODUCT SUB CATEGORY", width: 120,
      renderCell: (cellValues) => {
        console.log("renderCell : ", cellValues)
        return <>
          <select
            style={{
              color: "black",
              fontSize: 15,
              width: 100,
              height: 40,
              border: "1.5px solid #267ED4",
              borderRadius: 15,
              margin: 4,
            }}
            onChange={(e) => {

              let newArr = formValues.map((obj) => {

                if (obj.item_id === cellValues.row.item_id) {

                  return {
                    ...obj,
                    product_sub_cat_selected: e.target.value

                  };
                }
                return obj;
              });

              console.log(newArr, "newarr");
              setFormValues(newArr)
            }}
            className="select-option"
          >
            <option selected disabled>select Option </option>
            {cellValues.row.product_sub_category.map((e) => <option >{e}</option>)}

          </select>
        </>
      },
    },
    { field: "Wt_est", headerName: "WT EST", width: 120 },

    {
      field: "ref_su", headerName: "REF SU", width: 120,
      renderCell: (cellValues) => {
        console.log("renderCell : ", cellValues)
        return <>
          <select
            style={{
              color: "black",
              fontSize: 15,
              width: 100,
              height: 40,
              border: "1.5px solid #267ED4",
              borderRadius: 15,
              margin: 4,
            }}
            onChange={(e) => {

              let newArr2 = formValues.map((obj) => {

                if (obj.item_id === cellValues.row.item_id) {

                  return {
                    ...obj,
                    Wt_est: storeSupplierData.filter((el) => el.supplier_id == e.target.value)[0].metal_weight_gm,
                    product_ref: storeSupplierData.filter((el) => el.supplier_id == e.target.value)[0].product_id,
                    price: storeSupplierData.filter((el) => el.supplier_id == e.target.value)[0].total_cost,
                    supplier_selected: e.target.value

                  };

                }
                return obj;
              });

              console.log(newArr2, "newarr2");
              setFormValues(newArr2)
            }}
            className="select-option"
          >
            <option selected disabled>select Option </option>
            {cellValues.row.ref_su.map((e) => <option >{e}</option>)}

          </select>
        </>
      },
    },
    { field: "product_ref", headerName: "PRODUCT REF", width: 120 },
    { field: "price", headerName: "PRICE", width: 120 },
    {
      field: "product_size", headerName: "PRODUCT SIZE", width: 120,
      renderCell: (cellValues) => {
        console.log("renderCell : ", cellValues)
        return <>
          <select
            style={{
              color: "black",
              fontSize: 15,
              width: 100,
              height: 40,
              border: "1.5px solid #267ED4",
              borderRadius: 15,
              margin: 4,
            }}

            onChange={(e) => {
              let newArr = formValues.map((obj) => {

                if (obj.item_id === cellValues.row.item_id) {

                  return {
                    ...obj,
                    product_size_selected: e.target.value
                  };

                }
                return obj;
              });

              console.log(newArr, "newarr");
              setFormValues(newArr)

            }}
            className="select-option"
          >
            <option selected disabled>select Option</option>
            {cellValues.row.product_size_dropdown.map((e) => <option >{e}</option>)}

          </select>
        </>
      },
    },
    {
      field: "metal", headerName: "Metal", width: 120,
      renderCell: (cellValues) => {
        console.log("renderCell : ", cellValues)
        return <>
          <select
            style={{
              color: "black",
              fontSize: 15,
              width: 100,
              height: 40,
              border: "1.5px solid #267ED4",
              borderRadius: 15,
              margin: 4,
            }}
            onChange={(e) => {

              let newArr = formValues.map((obj) => {

                if (obj.item_id === cellValues.row.item_id) {

                  return {
                    ...obj,
                    metal_selected: e.target.value

                  };

                }
                return obj;
              });

              console.log(newArr, "newarr");
              setFormValues(newArr)

            }}
            className="select-option"
          >
            <option selected disabled>select Option</option>
            <option >18YG</option>
            <option >18WG</option>
            <option >18RG</option>
            <option >22YG</option>
            <option >9YG</option>
            <option >9RG</option>
            <option >9WG</option>



          </select>
        </>
      },
    },
    {
      field: "TodayDate", headerName: "Time & Date", width: 120,
    },
    {
      field: "notes", headerName: "Notes", width: 120,
      renderCell: (cellValues) => (

        <>
          <TextField

            id="outlined-size-small"

            size="small"
            multiline
            value={cellValues.row.notes_selected}
            onChange={(e) => {
              let newArr = formValues.map((obj) => {

                if (obj.item_id === cellValues.row.item_id) {

                  return {
                    ...obj,

                    notes_selected: e.target.value

                  };

                }
                return obj;
              });

              console.log(newArr, "newarr");
              setFormValues(newArr)

            }}
          />
        </>
      )
    }


  ];

  const rows = formValues?.map((row) => ({

    ...row,
    item_id: row.item_id,
    TodayDate: row.TodayDate,
    item: row.item,
    dropdown: row.dropdown,
    item_type: row.item_type,
    product_sub_category: row.product_sub_cat_dropdown,
    ref_su: row.supplier_dropdown,
    Wt_est: row.Wt_est,
    product_ref: row.product_ref,
    price: row.price,
    product_size_dropdown: row.product_size_dropdown,

  }));

  let color;
  let color2;
  if (ispopular) {
    color2 = "#66cc66";
    color = "#e6e6e6";
  } else {
    color = "#66cc66";
    color2 = "#e6e6e6";
  }
  return (
    <>
      <div style={{ padding: 20 }}>
        <Sidebar />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <select
              style={{
                color: "black",
                fontSize: 20,
                width: 300,
                height: 40,
                border: "1.5px solid #267ED4",
                borderRadius: 15,
                margin: 4,
              }}
              onChange={(e) => {

                setValue(e.target.value)
                setFieldValue_Selected((prev) => {
                  return {
                    ...prev,
                    item: e.target.value,

                  }
                }
                )
              }

              }
              className="select-option"
            >
              <option selected disabled>All Option </option>
              {productDropdown.map((item) => {
                return <option value={item}>{item}</option>
              })}
            </select>

            <button
              onClick={change_value}
              style={{
                padding: 8,
                color: "#fff",
                background: "#267ED4",
                border: "none",
                borderRadius: 10,
              }}
            >
              Select
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <table>
              <thead>

                <tr>
                  <th style={{ fontSize: "13px" }}></th>
                  {storePriceFromAPI.map((e) => {
                    return <th>
                      <p style={{ fontSize: "13px", margin: "0" }}>{e.metal}</p>
                    </th>
                  })}


                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontSize: "13px", margin: "0" }}>bid</td>

                  {storePriceFromAPI.map((e) => {
                    return <td>
                      <p style={{ fontSize: "13px", margin: "0" }}>{e.currency.GBP.bid}</p>
                    </td>
                  })}
                </tr>
                <tr>
                  <td style={{ fontSize: "13px", margin: "0" }}>Offer</td>

                  {storePriceFromAPI.map((e) => {
                    return <td>
                      <p style={{ fontSize: "13px", margin: "0" }}>{e.currency.GBP.offer}</p>
                    </td>
                  })}
                </tr>
              </tbody>
            </table>

          </div>

        </div>
        {formValues ? (
          <DataGrid
            style={{ height: "28rem", width: "100%" }}
            rows={rows}
            columns={columns}
            pageSize={20}
            getRowId={(row) => row.item_id}
            rowsPerPageOptions={[20]}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <center>
            <h2>Loading....</h2>
          </center>
        )}

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "inherit"
        }}>
          {rows.length == 0 ?
            <Button disabled variant="contained">Next</Button>
            : 
            <Button variant="contained"
              onClick={() => {
                navigate('/ClientData', { state: formValues })
              }
              }
            >Next</Button>

          }

        </div>
      </div>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}

      >
        <CircularProgress color="inherit" />
      </Backdrop>


    </>
  );
};

export default Dashboard_jewellery;
