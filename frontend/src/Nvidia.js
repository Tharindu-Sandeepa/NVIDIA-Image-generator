import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, CircularProgress, Container, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import NvidiaLogo from './new.png';

const Nvidia = () => {
    const [text, setText] = useState('');
    const [generating, setGenerating] = useState(false);
    const [image, setImage] = useState(null);

    const invokeUrl = 'http://localhost:5002/generate';

    const generateImage = async () => {
        const payload = {
            "text_prompts": [
                { "text": text, "weight": 1 },
                { "text": "", "weight": -1 }
            ],
            "cfg_scale": 5,
            "sampler": "K_DPM_2_ANCESTRAL",
            "seed": 0,
            "steps": 25
        };
  
        try {
            setGenerating(true);
            setImage(null);
            const res = await axios.post(invokeUrl, payload);
            const imageData = res.data.artifacts[0].base64;
            setImage(`data:image/jpeg;base64,${imageData}`);
            setGenerating(false);
        } catch (error) {
            console.log("Error generating image: ", error);
            setGenerating(false);
        }
    };

    const handleInput = (e) => setText(e.target.value);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = 'generated_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container
            maxWidth="md"
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: { xs: '1rem', md: '3rem' },
            
            }}
        >
           <Box mb={3} textAlign="center">
    <img
        src={NvidiaLogo}
        alt="NVIDIA Logo"
        style={{ height: 'auto' }}
        sx={{
            width: { xs: '10%', md: '100%' }, 
            maxWidth: { xs: '50px', md: '500px' } 
        }}
    />
</Box>
            <Typography variant="h5" sx={{ color: '#76B900', mb: 2, fontWeight: 'bold' }}>
                IMAGE GENERATOR
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Describe your image"
                value={text}
                onChange={handleInput}
                multiline
                minRows={2}
                maxRows={5}
                inputProps={{ style: { color: 'white', fontWeight: 'bold' } }}
                sx={{ 
                    mb: 2, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#76B900',
                        },
                        '&:hover fieldset': {
                            borderColor: '#5ea900',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#5ea900',
                        },
                    },
                    '@media (min-width: 600px)': {
                        minWidth: '500px',
                    },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={generateImage}
                disabled={generating}
                sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                        backgroundColor: '#d4d4d4',
                    },
                    mb: 2,
                    '@media (min-width: 600px)': {
                        maxWidth: '200px',
                    },
                }}
            >
                {generating ? <CircularProgress size={24} color="inherit" /> : "Generate"}
            </Button>
            {image && (
                <Box
                    mt={3}
                    textAlign="center"
                    width="100%"
                    position="relative"
                    sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                >
                    <img
                        className='generated-image'
                        src={image}
                        alt="Generated artwork"
                        style={{ width: '100%', maxWidth: '600px', borderRadius: '16px' }}
                    />
                    <IconButton
                        onClick={handleDownload}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <DownloadIcon />
                    </IconButton>
                </Box>
            )}
        </Container>
    );
};

export default Nvidia;