
import React, { useState, useEffect, useContext } from 'react'
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material'
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation,useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';


 
const Image = styled('img')({
    width: "100%",
    height: "50vh",
    objectFit: 'cover'
})

const Container = styled(Box)(({theme})=>({
    margin:'50px 100px',
    [theme.breakpoints.down('md')]:{
      margin:0
    }
}))

const StyledForm = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row`

const InputTextField = styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:25px`

const Textarea = styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {


    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const navigate=useNavigate();


    const location = useLocation();
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    useEffect(() => {
        console.log(file)
        const getImage = async () => {
            if (file) {
                console.log('first')
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        console.log("adf")
        console.log(account)
        console.log(account.username)
        console.log(post.username)
        console.log(post)
    }, [file])

    const handlechange = (e) => {
        // console.log("jgjhg");
        setPost({ ...post, [e.target.name]: e.target.value });
    }   

    const savePost=async()=>{
        let response =await API.createPost(post)
        console.log(post)
        if(response.isSuccess){
            navigate('/');
        }
    }

    return (
        <Container>
            <Image src={url} alt="banner" />

            <StyledForm>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                
                <InputTextField placeholder='Title' onChange={(e) => handlechange(e)} name='title' />
                <Button variant='contained' onClick={()=>savePost()}>Publish</Button>
            </StyledForm>

            <Textarea
                minRows={5}
                placeholder="Tell your story....."
                onChange={(e) => handlechange(e)}
                name='description'
            />
        </Container>
    )
}

export default CreatePost