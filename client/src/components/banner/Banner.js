import React from 'react'
import {Box ,Typography,styled} from '@mui/material';
import { style } from '@mui/system';

const Image =styled(Box)`
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    width:100%;
    height:50vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    
`

const Heading =styled(Typography)`
    font-size:70px;
    color:#FFFFFF;
    line-hegith:1;
    `

const SubHeading=styled(Typography)`
    font-size:20px;
    background:#FFFFFF;
    `


const Banner = () => {
  return (
    <Image>
        <Heading>Blog</Heading>
        <SubHeading>Code for Interview</SubHeading>
    </Image>
  )
}

export default Banner