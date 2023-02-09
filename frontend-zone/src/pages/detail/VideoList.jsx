import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {

    const {category} = useParams();
    const iframeRef = useRef(null);
    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);
    return (
        <>
        <div className="video">
            <div className="video__title">
            </div>
            {/* https://www.youtube.com/embed/uhlBqFj9kDw */}
            <iframe
                // src={`https://dood.wf/e/${props.lnk}`}
                src='https://www.youtube.com/embed/uhlBqFj9kDw'
                ref={iframeRef}
                width="100%"
                title="video"
                allowFullScreen="true"
            ></iframe>
            
        </div>
            
        </>
    );
}

const Video = props => {

    const item = props.item;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://dood.wf/e/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
                allowfullscreen="true"
            ></iframe>
        </div>
    )
}

export default VideoList;
