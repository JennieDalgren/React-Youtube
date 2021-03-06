import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/searchbar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_details'
import API_KEY from '../config'

const SEARCH_DELAY = 300

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('surfboards')
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, SEARCH_DELAY)
    return (
      <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
        videos={this.state.videos}
      />
    </div>
    )
  }

}

ReactDOM.render(<App />, document.querySelector('.container'))
