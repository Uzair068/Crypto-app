import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

function ErrorComponent({message}) {
  return (
    <Alert status='error' position={'fixed'} top={'20'} left={'12%'} transform={'translateX(-50%'} w={'container.lg'}>
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default ErrorComponent
