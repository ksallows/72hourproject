import { useState, useEffect } from 'react';

const Nasa = (props) => {
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('')

    const fetchImage = async () => {
        await fetch(`https://api.nasa.gov/planetary/earth/imagery?dim=0.05&lon=${props.lng}&lat=${props.lat}&date=2014-02-01&api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU`)
            //SAMPLE 404 -> await fetch(`https://api.nasa.gov/planetary/earth/imagery?dim=0.05&lon=-22&lat=-22&date=2014-02-01&api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU`)
            .then((result) => {
                if (result.status == '200') {
                    setImage(result.url);
                    setMessage('Satellite imagery of your location:');
                }
                else if (result.status == '404') {
                    fetchKitties();
                    setMessage('Sorry, we couldn\'t find satellite imagery of your location. Please have a cat instead.')
                }
            })

    }

    const fetchKitties = () => {
        fetch(`https://api.thecatapi.com/v1/images/search`)
            .then(result => result.json())
            .then((result) => setImage(result[0].url))
    }

    useEffect(() => {
        if (props.lat !== '' && props.lng !== '') fetchImage();
    }, [props.lng])

    return (
        <>
            <h1>Sattelite Imagery</h1>
            <h5>{message}</h5>
            <img className='sat-img' src={image} alt='' />
        </>
    );
};

export default Nasa;