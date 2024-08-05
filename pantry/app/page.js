'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";




export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')


  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      })

    })

    setPantry(pantryList)
    //console.log(pantryList)
  }

  const removeItem = async (name) => {
    const docRef = doc(collection(firestore, 'pantry'), name)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()){
      const {quantity} = docSnapshot.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updatePantry()
  }

  const addItem = async (name) => {
    const docRef = doc(collection(firestore, 'pantry'), name)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()){
      const {quantity} = docSnapshot.data()
      await setDoc(docRef, {quantity: quantity + 1})

    }
    else{
      await setDoc(docRef, {quantity: 1})
    }

    await updatePantry()
  }

  useEffect(() =>{
    updatePantry()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
    >

      <Modal
        open={open}
        onClose={handleClose}
        
      >

        <Box
          position={'absolute'}
          top="50%"
          left="50%"
          
          width={400}
          bgcolor="white"
          border={'2px solid #000'}
          boxShadow={24}
          p={4}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          sx={{
            transform:"translate(-50%, -50%)"
          }}
        
        >

          <Typography variant="h6">Add Item</Typography>

          <Stack width={300} direction={"row"} spacing={2}>
            <TextField 
              variant="outlined" 
              fullWidth 
              value={itemName}
              onChange={(e)=>{
                setItemName(e.target.value)
              }}
            
            ></TextField>

            <Button 
              variant="outlined"
              onClick={()=>{
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add

            </Button>
          </Stack>

        </Box>
      
      </Modal>
      
      
      <Button
        variant="contained"
        onClick={()=>{
          handleOpen()
        }}
      
      > Start</Button>

      <Box border="1px solid #333">
        <Box width="800px" height="100px" bgcolor="#ADD8E6">
          <Typography 
            variant="h2" 
            color="#333" 
            display={'flex'}
            alignItems={'center'} 
            justifyContent={'center'}
            >
            Pantry Items
          </Typography>

        </Box>

      </Box>

      <Stack width="800px" height="300px" spacing={2}overflow={'auto'}>
        
        <Typography>Hello</Typography>

      </Stack>
      

    </Box>
  );
}
