import { Container, HStack, Radio, RadioGroup, Box, VStack, Text, Image, Img } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../index'

function CoinDetails() {

  const [coin, setCoin] = useState({})
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [currency, setCurrency] = useState('inr')

  const params = useParams()

  useEffect(() => {
    const getCoinD = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        setCoin(data)
        console.log(data)
        setloading(false)
      } catch (error) {
        seterror(true)
        setloading(false)

      }
    }
    getCoinD(params.id)
  }, [])

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$'


  return (
    <Container maxW={"container.xl"} >
      {
        loading ? <Loader /> :
          <>

            <Box borderWidth={1} width={"full"}>
              agaya!

            </Box>

            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
              <HStack spacing={'4'}>
                <Radio value='inr'>INR</Radio>
                <Radio value='usd'>USD</Radio>
                <Radio value='eur'>EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} p={"6"} alignItems={'flex-start'}>
              <Text fontSize={"small"} alignSelf={'center'} opacity={0.7}>
                Last updated on {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Img src={coin.image.large} w={"16"} h={16} objectFit={"contain"}/>
            </VStack>


          </>
      }

    </Container>
  )
}

export default CoinDetails
