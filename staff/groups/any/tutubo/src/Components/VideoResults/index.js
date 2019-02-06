import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass'

class VideoRasults extends Component {

    state = { videos: [] }

    componentDidMount() {
        console.log('monuterds')

        const { props: { query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(props) {

        const { query } = props

        this.handleSearch(query)
    }

    handleSearch = query => {
        try {
            logic.searchVideo(query)
                .then(({ items }) => {
                    console.log(items)
                    this.setState({
                        videos: items
                    })
                })
                .catch(({ message }) => console.log(message))
        } catch ({ message }) {
            console.log(message)
        }
    }

    onVideoSelected = id => {

        const {props : { selectVideo }} = this

        selectVideo(id)
    }


    render() {

        const { onVideoSelected, state: { videos }, props: {mode} } = this

        return <section className="videolist">
            <div className={`${mode ? `searchVideoList searchVideoList-light` : 'searchVideoList searchVideoList-dark'}`}>
                {videos.map(({ id: { videoId }, snippet: { title, channelId, publishedAt, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className="videoResults" key={videoId} onClick={() => onVideoSelected(videoId)} >
                        <div className="resultsThumbnail"> 
                            <img src={url} />
                        </div>
                        <div className="searchResultsText">
                            <h2 className={`${mode ? 'videoSearchTitle videoSearchTitle-light' : 'videoSearchTitle-dark'}`}>{title.length > 50 ? title = `${title.substr(0, 50)}...`: title}</h2>
                            <p className={`${mode ? 'searchChannelTitle searchChannelTitle-light' : 'searchChannelTitle'}`} channel-id={channelId} onClick={() => console.log(channelId)}>{channelTitle} · {publishedAt = publishedAt.substr(0, 10)}</p>
                            <p className={`${mode ? 'searchDes searchDes-light' : 'searchDes'}`}>{description = description.substr(0, 100)}...</p>
                        </div>
                    </div>
                })}
            </div>
        </section>
    }
}

export default VideoRasults