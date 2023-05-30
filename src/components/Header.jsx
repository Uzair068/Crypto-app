import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return <HStack p={'4'} shadow={"base"} bgColor={'blackAlpha.900'}>

    <Button variant={'unstyled'} color={'white'} px={"6"}>
        <Link to={'/'}>Home</Link>
    </Button>
    <Button variant={'unstyled'} color={'white'}>
        <Link to={'/exchange'}>Exchanges</Link>
    </Button>
    <Button variant={'unstyled'} color={'white'} px={"6"}>
        <Link to={'/coins'}>Coins</Link>
    </Button>
  </HStack>
}

export default Header
