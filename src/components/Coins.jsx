import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinsCard from './CoinsCard'

function Coins() {
  const[coins,setCoins]=useState([])
  const[loading,setloading]=useState(true)
  const[error,seterror]=useState(false)
  const[page,setpage]=useState(1)
  const[currency,setCurrency]=useState('inr')

  const currencySymbol=currency==='inr'?'₹':currency==='eur'?'€':'$'

  const changePage=(page)=>{
    setpage(page)
    setloading(true)
  }

  const btnarr=new Array(132).fill(1)

  useEffect(()=>{
    const getCoin=async()=>{
      try {
        const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
      setCoins(data)
      setloading(false)
      } catch (error) {
        seterror(true)
        setloading(false)
        
      }
    }
    getCoin()
  },[currency,page])


  if(error) return <ErrorComponent message={'Error while Fetching coins'}/>
  return (

    <Container maxW={'container.xl'}>
      {
        loading? <Loader/>:<>


          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value='inr'>INR</Radio>
              <Radio value='usd'>USD</Radio>
              <Radio value='eur'>EUR</Radio>
            </HStack>
          </RadioGroup>


        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {coins.map((i)=>(
            <CoinsCard id={i.id} price={i.current_price} key={i.id}  name={i.name} image={i.image} symbol={i.symbol} currencySymbol={currencySymbol}/>
          ))}
        </HStack>



        <HStack w={'full'} overflowX={'auto'} p={'10'}>
          {
            btnarr.map((item,index)=>(
              <Button key={index} bgColor={'blackAlpha.700'} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>
            ))
          }
        </HStack>


        </>
      }
      
    </Container>
  )
}





export default Coins
