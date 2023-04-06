import React from 'react'
import { Button, TableBody, TableHead, TableCell, Table, TableRow, styled } from '@mui/material'
import { categories } from '../../constants/data'
import { Link,useSearchParams } from 'react-router-dom'


const StyledTable = styled(Table)`
    border:1px solid rgba(224,224,224,1);
    `

const StyledButton = styled(Button)`
    margin:20px;
    width:85%;
    background:#6495ED;
    color:#fff;
    `
const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit`

const Categories = () => {

    const [searchParmas]=useSearchParams();
    const category=searchParmas.get('category');

    return (
        <div>
            <StyledLink to={`/create?category=${category||''}`} >
                <StyledButton variant='contained'>Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableCell>
                        <StyledLink to='/'>
                            All Categories
                        </StyledLink>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </div>
    )
}

export default Categories