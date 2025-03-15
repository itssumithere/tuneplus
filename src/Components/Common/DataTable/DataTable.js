
import React, { useEffect, useState } from 'react'
import { endpoint } from '../../../Constants/Data.constant'
import { getData, postData, putData } from '../../../Services/Ops'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal, Typography } from '@mui/material';
  
export default function DataTable(props) {
    const {columns, height,width='100%',rows,checkboxSelection=false,columnNo=10}=props;
   
    const paginationModel = { page: 0, pageSize: columnNo };


    return ( 
        <Paper  >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10,20,50,70,100]}
                checkboxSelection={checkboxSelection}
                fontWeight={20}
                sx={{
                    border: 0,
                    color: "white", // Customize text color
                    width:width,
                    backgroundColor:'#000',
                    '& .MuiDataGrid-cell': {
                            backgroundColor: 'black !important', // Cell background
                            color: 'white !important',
                            // fontWeight: 'bold !important',
                            fontSize: '14px', // Column header font size
                        },
                        '& .MuiDataGrid-columnHeader': {
                                backgroundColor: 'black !important', // Individual column header cells
                                color: 'white !important',
                                fontWeight: 'bold !important',
                                textAlign: 'center !important',
                                fontWeight: 'bold !important',
                                fontSize: '14px', // Column header font size
                                
                            },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #333", // Cell border color
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#1d1d1d", // Header background color
                      color: "#ffffff", // Header text color
                      fontWeight: 700,
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "#1d1d1d", // Footer background color
                      borderTop: "1px solid #333", // Footer border color
                      color:'#fff'
                    },
                    "& .MuiTablePagination-actions":{
                         
                        color:'#fff'
                    },
                    "& . MuiButtonBase-root Mui-disabled MuiIconButton-root Mui-disabled MuiIconButton-colorInherit MuiIconButton-sizeMedium css-cdtzx3-MuiButtonBase-root-MuiIconButton-root":{
                        color:'#fff'
                    },
                    "& MuiInputBase-root MuiInputBase-colorPrimary MuiTablePagination-input css-oegngy-MuiInputBase-root-MuiTablePagination-select":{
                        backgroundColor:'#fff'
                    }
                  }}
                // sx={{
                //     border: 0,
                    
                    // backgroundColor:'black',
                    // color:'#fff'
                    // '& .MuiDataGrid-columnHeaders': {
                    //     backgroundColor: 'black !important', // Header row background
                    //     fontWeight: 'bold !important',
                    //     fontSize: '14px', // Column header font size
                    //     background: "bisque"
                    // },
                    // '& .MuiDataGrid-columnHeader': {
                    //     backgroundColor: 'black !important', // Individual column header cells
                    //     color: 'white !important',
                    //     fontWeight: 'bold !important',
                    //     textAlign: 'center !important',
                    //     fontWeight: 'bold !important',
                    //     fontSize: '14px', // Column header font size
                        
                    // },
                    // '& .MuiDataGrid-cell': {
                    //     backgroundColor: 'black !important', // Cell background
                    //     color: 'white !important',
                    //     // fontWeight: 'bold !important',
                    //     fontSize: '14px', // Column header font size
                    // },
                    // '& .MuiDataGrid-row': {
                    //     backgroundColor: 'black !important', // Row background
                    //     '&:hover': {
                    //         backgroundColor: '#333 !important', // Hover effect
                    //     },
                    //     // fontWeight: 'bold !important',
                    //     fontSize: '14px', // Column header font size
                    // },
                    
                // }}
            />
        </Paper>


    )
} 