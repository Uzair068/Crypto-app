import { Container, HStack, Radio, RadioGroup, Box, VStack, Badge, Text, Img, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Progress } from '@chakra-ui/react'
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

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$'

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


  if (error) return <ErrorComponent message={'Error while Fetching coins'} />


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

            <VStack spacing={'5'} p={"7"} alignItems={'flex-start'}>
              <Text fontSize={"small"} alignSelf={'center'} opacity={0.7}>
                Last updated on {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Img src={coin.image.large} w={"16"} h={16} objectFit={"contain"} />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>

                <StatHelpText>
                  <StatArrow type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'} />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge fontSize={'2xl'} bgColor={"blackAlpha.700"} color={"white"}>{`#${coin.market_cap_rank}`}</Badge>

              <CoustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
               low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>

               <Box>
                <Item title={"MAX SUPPLY"} value={coin.market_data.max_supply}/>
                <Item title={"CIRCULATING SUPPLY"} value={coin.market_data.circulating_supply}/>
                <Item title={"MARKET CAP"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                <Item title={"ALL TIME LOW"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                <Item title={"ALL TIME HIGH"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
               </Box>

            </VStack>
          </>
      }

    </Container>
  );
};

const Item=({title,value})=>(
<HStack justifyContent={"space-between"} w={"full"} my={'4'}>
  <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
    {title}
  </Text>
  <Text>
    {value}
  </Text>
</HStack>
)


const CoustomBar = ({ high, low }) => 
  (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H RANGE</Text>
        <Badge children={high} colorScheme={"blue"} />
      </HStack>
    </VStack>
  );


export default CoinDetails
