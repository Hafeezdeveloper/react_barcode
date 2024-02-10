import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import "./Login.css";
import BSInputFull from '../Inputs/BSInputFull';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const BSLogin = () => {
  const [barcodeImage, setBarcodeImage] = useState(null);


  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .matches(/@gmail\.com$/, 'Must contain correct email')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required *'),
  });

  // login api  https://gentle-calf-pajamas.cyclic.app/api/v1/user/login

  fronm backend barcode images  =====>
  const fetchBarcodeImage = async () => {
    try {
        const response = await axios.post('http://192.168.1.103:5000/api/v1/admin/generateBarcode', { barcodeValue: '96385074' }, { responseType: 'arraybuffer' });
        const base64Image = btoa(
            new Uint8Array(response.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        setBarcodeImage(base64Image);
    } catch (error) {
        console.error('Error fetching barcode image:', error);
    }
};

// var Barcode = require('react-barcode');
// <Barcode value="barcode-example" />;
// {
  width: 2,
  height: 100,
  format: "CODE128",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined
}

  return ( 
    <Box className='login_page'>
      <Box sx={{
        height: "450px",
        width: "625px",
        margin: "0 auto",
        padding: "20px",
      }} className='login_box'>
        <Box>
          <img style={{ display: "block", margin: "0 auto", width: "125px", height: "125px" }} src={require("../../Assest/StoreLogo.jpeg")} alt="Store Logo" />
          <Box sx={{ width: { md: '360px', sm: '325px', xs: '100%' } }} className='m-auto ' >
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={values => {
                // same shape as initial values

                console.log(values);
              }}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                  <BSInputFull
                    label={"Email"}
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    width={"w-100"}
                  />
                  {touched.email && errors.email && (
                    <div className='d-flex'>
                      <p className='text-danger'>{errors.email} </p>
                      <p className='text-danger ps-2'>*</p>
                    </div>
                  )}
                  <div className='mt-2'>
                    <BSInputFull
                      label={"Password"}
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width={"w-100"}
                    />
                    {touched.password && errors.password &&
                      <div className='d-flex '>
                        <p className='text-danger'>{errors.password} </p>
                      </div>
                    }
                  </div>
                  <div className='mt-2'>
                    <Button className='w-100 text-white ' style={{ backgroundColor: "#6244a6 " }} type='submit'>Login</Button>
                    <div>
                      <button onClick={fetchBarcodeImage}>Fetch Barcode</button>
                      {barcodeImage && <img src={`data:image/png;base64,${barcodeImage}`} alt="Barcode" />}
                      {console.log("Aa" ,barcodeImage)}
                    </div>

                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}

export default BSLogin;
