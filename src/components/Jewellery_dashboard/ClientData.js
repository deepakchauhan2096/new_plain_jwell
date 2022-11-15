import React, { useContext, useState } from 'react'
import Sidebar from '../Sidebar'
import styled from 'styled-components'
import { dataContext } from '../helpers/context'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import { auth, firebase } from '../../firebase';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
// import  "firebase/app";

// import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";

// const phoneNumber = getPhoneNumberFromUserTextField();




const ClientData = () => {
    const { globleData, setGlobleData } = useContext(dataContext);


    const [formData, setFormData] = useState({
        title: "Mr",
        client_id: "XXXXXXX",
        first_name: "",
        surname: "",
        house_name: "",
        address_l2: "",
        city_and_town: "",
        postcode: "",
        telephone: "",
        mobile: "",
        email: "",


        // other_details

        relation_OD: "",
        name_OD: "",
        surname_OD: "",
        comments_OD: "",
        email_OD: "",
        mobile_OD: "",
        consent: true

    })

    const [formDataError, setFormDataError] = React.useState({
        first_nameErr: false,
        surnameErr: false,
        emailErr: false,
        mobileErr: false,
        telephoneErr: false
    });
    const [orderData, setOrderData] = useState({ customer_info: {}, products: [] })
    const [mynumber, setnumber] = useState("7206685433");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    const [loader, setLoader] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    console.log(globleData, "globleData")
    console.log("location : ", location.state)
    const Select = styled.select`
    width:100%;
    padding:0;
    margin:0;
    `
    const Option = styled.option`
    padding:0;
    margin:0;
    `

    //     const configureCaptcha = () => {
    //         window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //             'size': 'invisible',
    //             'callback': (response) => {
    //                 // reCAPTCHA solved, allow signInWithPhoneNumber.
    //                 this.onSignInSubmit();
    //                 console.log("Recaptca varified")
    //             },
    //             defaultCountry: "IN"
    //         });
    //     }


    //     const onSignInSubmit = (e) => {
    //         // e.preventDefault()
    //         configureCaptcha()
    //         const phoneNumber = "+91" + mynumber
    //         console.log(phoneNumber)
    //         const appVerifier = window.recaptchaVerifier;
    //         firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //             .then((confirmationResult) => {
    //                 // SMS sent. Prompt user to type the code from the message, then sign the
    //                 // user in with confirmationResult.confirm(code).
    //                 window.confirmationResult = confirmationResult;
    //                 console.log("OTP has been sent")
    //                 // ...
    //             }).catch((error) => {
    //                 // Error; SMS not sent
    //                 // ...
    //                 console.log("SMS not sent")
    //             });
    //     }
    //     const onSubmitOTP = (e) => {
    //         // e.preventDefault()
    //         const code = this.state.otp
    //         console.log(code)
    //         window.confirmationResult.confirm(code).then((result) => {
    //             // User signed in successfully.
    //             const user = result.user;
    //             console.log(JSON.stringify(user))
    //             alert("User is verified")
    //             // ...
    //         }).catch((error) => {
    //             // User couldn't sign in (bad verification code?)
    //             // ...
    //         });
    //     }



    //    const handleClick = () => {
    //         let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    //         let number = '+917206685433';
    //         firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
    //             let code = prompt('enter the otp', '');
    //             if (code == null) return;
    //             e.confirm(code).then(function (result) {
    //                 console.log(result.user, 'user');
    //                 document.querySelector('label').textContent = result.user.phoneNumber + "Number Verified";

    //             }).catch((error) => {
    //                 console.log("error : ", error)
    //             })

    //         })
    //     }

    const signin = () => {
        // const auth = getAuth();

        console.log("mynumber : ", mynumber, auth)
        // console.log("window.recaptchaVerifier : ",window.recaptchaVerifier)
        // window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        //     'size': 'invisible',
        //     'callback': (response) => {
        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //     //   onSignInSubmit();
        //     console.log("done")
        //     }
        //   }, auth);

        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        //   const appVerifier = window.verify;

        auth.signInWithPhoneNumber(mynumber, verify)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // window.confirmationResult = confirmationResult;
                // ...
                console.log("otp sent", confirmationResult)
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log("error : ", error)
            });


    }


    // const saveDataInDB =  () => {
    //     console.log("formData : ", formData)

    //     setLoader(true)
    //    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
    //         method: "post",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData)
    //     }
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("save client data > ", data)
    //             if (data.success == false) {
    //                 alert("API failed (save client data)")
    //                 setLoader(false)
    //             } else {
    //                 alert("Data Insert Successfully")


    //                 setFormData((prev) => {
    //                     return { ...prev, client_id: parseInt(data.res.rows[0].client_id) }
    //                 })
    //                 fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/createorder`, {
    //                     method: "post",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify({ customer_info: { ...formData, client_id: parseInt(data.res.rows[0].client_id) }, products: location.state })
    //                 }
    //                 )
    //                     .then((res) => res.json())
    //                     .then((response) => {
    //                         console.log("craete order data > ", response)
    //                         if (response.success == false) {
    //                             alert("API failed (create order)")
    //                             setLoader(false)
    //                         } else {
    //                             alert("Order created Successfully")




    //                                 navigate('/PDF_Creation', { state: { products: location.state, customer_info: { ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id) } } })

    //                             setLoader(false)
    //                         }
    //                     }).catch((err) => {
    //                         console.log(err);
    //                         alert("API not working (createorder)")
    //                         setLoader(false)
    //                     });

    //                 //    navigate('/PDF_Creation',{state:{products:location.state,customer_info:formData}})

    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //             alert("API not working (insertclientdata)")
    //             setLoader(false)
    //         });

    //     console.log("end")
    // }
    const saveDataInDB = () => {
        console.log("formData : ", formData)

        setLoader(true)
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("save client data > ", data)
                if (data.success == false) {
                    alert("API failed (save client data)")
                    setLoader(false)
                } else {
                    alert("Your data is Inserted Successfully")
                    setLoader(false)
                    navigate('/')
                    // setFormData((prev) => {
                    //     return { ...prev, client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate }
                    // })
                    // fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/createorder`, {
                    //     method: "post",
                    //     headers: { "Content-Type": "application/json" },
                    //     body: JSON.stringify({ customer_info: { ...formData, client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate }, products: location.state })
                    // }
                    // )
                    //     .then((res) => res.json())
                    //     .then((response) => {
                    //         console.log("craete order data > ", response)
                    //         if (response.success == false) {
                    //             alert("API failed (create order)")
                    //             setLoader(false)
                    //         } else {
                    //             alert("Order created Successfully")


                                // setGlobleData({ ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate })
                                // console.log("trigger")
                                // navigate('/PDF_Creation', { state: { products: location.state, customer_info: { ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id),TodayDate:location.state[0].TodayDate } } })

                            //     setLoader(false)
                            // }
                        // }).catch((err) => {
                        //     console.log(err);
                        //     alert("API not working (createorder)")
                        //     setLoader(false)
                        // });

                    //    navigate('/PDF_Creation',{state:{products:location.state,customer_info:formData}})

                }
            }).catch((err) => {
                console.log(err);
                alert("API not working (insertclientdata)")
                setLoader(false)
            });

        console.log("end")
    }


    const columns = [

        {
            field: "item", headerName: "ITEM", width: 120,

        },
        {
            field: "item_type", headerName: "ITEM TYPE", width: 120,


        },
        {
            field: "product_sub_category", headerName: "PRODUCT SUB CATEGORY", width: 120,

        },
        { field: "Wt_est", headerName: "WT EST", width: 120 },

        {
            field: "ref_su", headerName: "REF SU", width: 120,

        },
        {  

            field: "product_ref", headerName: "PRODUCT REF", width: 120 

        },
        {   

            field: "price", headerName: "PRICE", width: 120

        },
        {

            field: "product_size", headerName: "PRODUCT SIZE", width: 120,

        },
        {

            field: "metal_selected", headerName: "Metal", width: 120,

        },
        {

            field: "TodayDate", headerName: "Time & Date", width: 120,

        },
        {

            field: "notes_selected", headerName: "Notes", width: 120,

        }


    ];

    const rows = location.state?.map((row) => ({

        item_id: row.item_id,
        TodayDate: row.TodayDate,
        item: row.item,
        dropdown: row.item_type_selected,
        item_type: row.item_type_selected,
        product_sub_category: row.product_sub_cat_selected,
        ref_su: row.supplier_selected,
        Wt_est: row.Wt_est,
        product_ref: row.product_ref,
        price: row.price,
        product_size_dropdown: row.product_size_selected,
        metal_selected: row.metal_selected,
        notes_selected: row.notes_selected,
        product_size: row.product_size_selected
    }));
    return (
        <>
            <Sidebar />
            <div className='container-fluid' style={{ backgroundColor: "" }}>
                <div className="row">
                    <p className='bg-secondary text-white py-2'>Client Data</p>
                </div>



                {location.state ? (
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
                        <h2>Loading.... </h2>
                    </center>
                )}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "25px"
                }}>
                    <Button variant="contained"

                        onClick={() => {
                            console.log("button : ", formData)
                            //    navigate.goback()
                            navigate(-1)
                        }}
                    >Go Back</Button>
                    <Button variant="contained"
                        disabled={!formData.consent}
                        onClick={() => {

                            setOrderData({ customer_info: formData, products: location.state })
                            saveDataInDB()

                        }}
                    >SUBMIT</Button>
                </div>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default ClientData