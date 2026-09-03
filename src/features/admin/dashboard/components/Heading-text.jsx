import React from 'react'

export function Headingtext() {
  return (
    <>
    <Heading  as="h1"  fontSize={{ base: '3xl', md: '5xl' }} 
     fontWeight="bold"  color="#061A1C"  letterSpacing="-1px"> {title}
    </Heading>
            {description && (
              <Text  fontSize={{ base: 'sm', md: 'md' }}  color="#564238"  mt={1}  maxW="2xl"  lineHeight="1.6">
                {description}
              </Text>
            )}
     </>
  )
}

export default Heading-text