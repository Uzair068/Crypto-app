import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

function Exchanges() {
  const[exchanges,setExchanges]=useState([])
  const[loading,setloading]=useState(true)
  const[error,seterror]=useState(false)

  useEffect(()=>{
    const getExchanges=async()=>{
      try {
        const {data}=await axios.get(`${server}/exchanges`)
      setExchanges(data)
      setloading(false)
      } catch (error) {
        seterror(true)
        setloading(false)
        
      }
    }
    getExchanges()
  },[])


  if(error) return <ErrorComponent message={'Error while Fetching Exchanges'}/>
  return (

    <Container maxW={'container.xl'}>
      {
        loading? <Loader/>:<>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {exchanges.map((i)=>(
            <ExchangeCard key={i.id}  name={i.name} image={i.image} rank={i.trust_score_rank} url={i.url}/>
          ))}
        </HStack>
        </>
      }
      
    </Container>
  )
}

const ExchangeCard=({name,image,rank,url})=>(
<a href={url} target='blank'>
  <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{'&:hover':{transform:'scale(1.05)'}}}>
    <Image src={image} w={'10'} h={'10'} objectFit={'contain'} alt='exc'/>
    <Heading size={'md'} noOfLines={1}>{rank}</Heading>
    <Text  noOfLines={1}>{name}</Text>
  </VStack>
</a>
)

export default Exchanges
