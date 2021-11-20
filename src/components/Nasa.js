import { useState, useEffect } from 'react';

const Nasa = (props) => {
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    let img = new Image();
    const fetchImage = async () => {
        await fetch(`https://api.nasa.gov/planetary/earth/imagery?dim=0.05&lon=${props.lng}&lat=${props.lat}&date=2014-02-01&api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU`)
            //404 fetch ::: await fetch(`https://api.nasa.gov/planetary/earth/imagery?dim=0.05&lon=-22&lat=-22&date=2014-02-01&api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU`)
            .then((result) => {
                if (result.status == '200') {
                    setSatImage(result.url);
                }
                else if (result.status == '404') {
                    fetchKitties();
                    loadingOff('Sorry, we couldn\'t find satellite imagery of your location. Please have a cat instead:', false);
                }
            })

    }

    const setSatImage = (imagePath) => {
        img.onload = (() => loadingOff('Satellite imagery of your location:', true));
        img.src = imagePath;
    }

    const loadingOff = (message, isSat) => {
        setMessage(message);
        if (isSat) {
            img.classList.add('sat-img');
            img.id = 'sat-img';
            document.getElementById('image-container').appendChild(img)
        }
        document.getElementById('load-container').style.display = 'none';
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
            <div id='image-container'>
                <img id='sat-img' className='sat-img' src={image} alt='' />
            </div>
            <div id='load-container'>
                <div id='load' className="spinner-border text-light" role="status"></div>
            </div>
        </>
    );
};

export default Nasa;