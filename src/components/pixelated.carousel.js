
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getXHRData, generateURL } from './pixelated.api'
import { mergeDeep } from './pixelated.functions'
import '../css/pixelated.carousel.css'

const divSelector = 'div.carousel-slider-container'
const tx100 = 'translateX(100%)'
const tx0 = 'translateX(0%)'
const txn100 = 'translateX(-100%)'

/* https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

/* ========== CAROUSEL ========== */
export class Carousel extends Component {
  /* Not using defaultProps as they are merged shallow, not deep
  https://stackoverflow.com/questions/40428847/react-component-defaultprops-objects-are-overridden-not-merged */
  static propTypes = {
    flickr: PropTypes.object,
    type: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      flickr: {
        baseURL: 'https://api.flickr.com/services/rest/?',
        urlProps: {
          method: 'flickr.photos.search',
          api_key: '882cab5548d53c9e6b5fb24d59cc321d',
          user_id: '15473210@N04',
          tags: 'pixelatedviewsgallery',
          extras: 'date_taken,description,owner_name',
          sort: 'date-taken-desc',
          per_page: 500,
          format: 'json',
          photoSize: 'Medium',
          nojsoncallback: 'true' /*,
          startPos: 0 */
        }
      },
      images: {},
      flickrSize: '',
      type: 'slider'
    }
    this.state.flickr = mergeDeep(this.state.flickr, this.props.flickr)
    if (this.props.type) {
      this.state.type = this.props.type
    }
  }

  componentDidMount () {
    this.setState({ flickrSize: this.flickrSize(this.state.flickr.urlProps.photoSize) })
    const myURL = generateURL(this.state.flickr.baseURL, this.state.flickr.urlProps)
    const myMethod = 'GET'
    getXHRData(myURL, myMethod, (flickrPhotos) => {
      const myFlickrImages = flickrPhotos.photos.photo
      // FIX FOR FLICKR API SORT BUG
      myFlickrImages.sort((a, b) => {
        return new Date(b.datetaken) - new Date(a.datetaken)
      }) // b - a for reverse sort
      this.setState({ images: myFlickrImages })
    })
  }

  flickrSize (size) {
    switch (size) {
      case 'Square' : return '_s' // 75
      case 'Large Square' : return '_q' // 150
      case 'Thumbnail' : return '_t' // 100
      case 'Small' : return '_m' // 240
      case 'Small 320' : return '_n' // 320
      case 'Medium' : return '' // 500
      case 'Medium 640' : return '_z' // 640
      case 'Medium 800' : return '_c' // 800
      case 'Large' : return '_b' // 1024
        // case "Large2" : return "_h"; // 1600 + secret
        // case "Large3" : return "_k"; // 2048 + secret
        // case "XL3K" : return "_3k"; // 3072 + secret
        // case "XL4K" : return "_4k"; // 4096 + secret
        // case "XLF" : return "_f"; // 4096 + secret - only 2:1 aspect ratio
        // case "XL5K" : return "_5k"; // 5120 + secret
        // case "XL6K" : return "_6k"; // 6144 + secret
        // case "Original" : return "_o"; // secret + EXIF data; not rotated, ? ext
      default : return ''
    }
  }

  render () {
    if (this.state.type === 'slider') {
      return (
        <CarouselSlider flickrData={ this.state } />
      )
    } else if (this.state.type === 'hero') {
      return (
        <CarouselHero flickrData={ this.state } />
      )
    } else {
      return null
    }
  }
}

/* ========== CAROUSEL SLIDER ========== */
export class CarouselSlider extends Component {
  static propTypes = {
    flickrData: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
      direction: 'next'
    }
    this.drag = {
      draggable: false,
      dragMoving: false,
      eType: null,
      startX: 0, /* start left of object */
      firstX: 0, /* first mouse x */
      previousX: 0, /* prevous mouse x */
      currentX: 0, /* current mouse x */
      directionX: 0,
      momentumX: 0, /* maximum diff of current and previous */
      moveX: 0, /* total mouse x distance */
      newX: 0, /* new left of object */
      minDistance: 50,
      dragStyles: {},
      debug: false
    }
  }

  previousImage = () => {
    if (this.state.activeIndex === 0) {
      this.setState({ activeIndex: this.props.flickrData.images.length - 1, direction: 'prev' })
    } else {
      this.setState({ activeIndex: this.state.activeIndex - 1, direction: 'prev' })
    }
  }

  nextImage = () => {
    if (this.state.activeIndex === this.props.flickrData.images.length - 1) {
      this.setState({ activeIndex: 0, direction: 'next' })
    } else {
      this.setState({ activeIndex: this.state.activeIndex + 1, direction: 'next' })
    }
  }

  animate = (elem) => {
    // eslint-disable-next-line no-undef
    requestAnimationFrame(this.animate)
    elem.style.left = (this.drag.newX + this.drag.momentumX) + 'px'
    return true
  }

  /* https://gist.github.com/hartzis/b34a4beeb5ceb4bf1ed8659e477c4191
  https://www.kirupa.com/html5/drag.htm */

  dragStart = (e) => {
    if (this.drag.debug) { console.log('Drag Start - ' + e.type) }
    // var elem = e.currentTarget ;
    if ((typeof e.target.className === 'string') &&
    (e.target.className.includes('carousel-slider-container') ||
    e.target.className.includes('carousel-slider-image'))) {
      e.preventDefault()
      e.stopPropagation()
      const elem = e.target.closest(divSelector)
      this.drag.draggable = true
      this.drag.eType = e.type
      this.drag.firstX = Math.round((this.drag.eType === 'touchstart') ? e.touches[0].pageX : e.pageX)
      this.drag.previousX = this.drag.firstX
      this.drag.currentX = this.drag.firstX
      this.drag.startX = elem.offsetLeft
      /* Add existing drag styles to array - save for later */
      this.drag.dragStyles.transform = elem.style.transform
      this.drag.dragStyles.transition = elem.style.transition

      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', e.currentTarget.id)
        // eslint-disable-next-line no-undef
        const img = new Image()
        // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs='
        e.dataTransfer.setDragImage(img, 0, 0)
      }

      if (this.drag.debug) { console.log(JSON.stringify(this.drag)) }
    }
  }

  draggable = (e) => {
    this.drag.dragMoving = true
    if (this.drag.draggable) {
      e.preventDefault()
      e.stopPropagation()
      const elem = e.target.closest(divSelector)
      this.drag.eType = e.type
      this.drag.previousX = this.drag.currentX
      this.drag.currentX = Math.round((this.drag.eType === 'touchmove') ? e.touches[0].pageX : e.pageX)
      /* Set Momentum to max value */
      const _momentumX = Math.round(Math.abs(this.drag.previousX - this.drag.currentX))
      this.drag.momentumX = (_momentumX > this.drag.momentumX) ? _momentumX : this.drag.momentumX
      this.drag.moveX = Math.round(Math.abs(this.drag.firstX - this.drag.currentX))
      /* Right to Left or Left to Right */
      this.drag.directionX = (this.drag.firstX > this.drag.currentX) ? -1 : 1
      this.drag.newX = this.drag.startX + (this.drag.moveX * this.drag.directionX)
      if (this.drag.debug) { console.log(JSON.stringify(this.drag)) }
      elem.style.left = this.drag.newX + 'px'
      /* Remove styles that conflict with dragging */
      elem.style.transition = ''
      elem.style.transform = ''
    }
  }

  dragEnd = (e) => {
    if (!this.drag.dragMoving) {
      const thisImg = this.props.flickrData.images[this.state.activeIndex]
      const thisImgURL = 'https://farm' + thisImg.farm + '.static.flickr.com/' + thisImg.server + '/' + thisImg.id + '_' + thisImg.secret + '_b.jpg'
      // var thisImgURL2 =  "http://flickr.com/photo.gne?id=" + thisImg.id + "_" + thisImg.secret  + ".jpg" ;
      window.open(thisImgURL, '_blank')
    }
    if (this.drag.draggable) {
      if (this.drag.debug) { console.log('Drag End - ' + e.type) }
      const elem = e.target.closest(divSelector)

      /* Add styles back */
      for (const property in this.drag.dragStyles) {
        elem.style[property] = this.drag.dragStyles[property]
      }

      /* Determine drag distance */
      this.drag.eType = e.type
      this.drag.previousX = this.drag.currentX
      this.drag.currentX = Math.round((this.drag.eType === 'touchend') ? e.changedTouches[0].pageX : e.pageX)
      this.drag.moveX = Math.round(Math.abs(this.drag.firstX - this.drag.currentX))
      const farEnough = this.drag.moveX > this.drag.minDistance

      /* Add momentum at the end of the slide */
      elem.style.transition = 'all 0.5s ease-out 0.0s' /* ease-in */
      elem.style.transform = 'translateX(' + ((this.drag.newX + (this.drag.momentumX)) * this.drag.directionX) + ')'

      /* roll in the next / previous image */
      if (farEnough && this.drag.directionX !== 0) {
        (this.drag.directionX < 0) ? this.nextImage() : this.previousImage()
      }

      if (this.drag.debug) { console.log(JSON.stringify(this.drag)) }

      /* Reset drag variables */
      this.drag.draggable = false
      this.drag.dragMoving = false
      this.drag.eType = null
      this.drag.startX = 0
      this.drag.firstX = 0
      this.drag.previousX = 0
      this.drag.currentX = null
      this.drag.momentumX = 0
      this.drag.moveX = 0
      this.drag.newX = 0
      this.drag.dragStyles = {}

      // e.preventDefault();
    }
  }

  transitionEnd = (e) => {
    if (this.drag.debug) { console.log('Transition End - ' + e.type) }
    const elem = e.target
    if (elem.matches(divSelector)) {
      elem.style.left = '0px'
    }
  }

  componentDidMount () {
    document.addEventListener('touchstart', this.dragStart, { passive: false })
    document.addEventListener('touchmove', this.draggable, { passive: false })
    document.addEventListener('touchend', this.dragEnd, { passive: true })
    document.addEventListener('mousedown', this.dragStart, { passive: false })
    document.addEventListener('mousemove', this.draggable, { passive: false })
    document.addEventListener('mouseup', this.dragEnd, { passive: true })
    document.addEventListener('transitionend', this.transitionEnd, { passive: true })
  }

  componentWillUnmount () {
    document.removeEventListener('touchstart', this.dragStart, { passive: false })
    document.removeEventListener('touchmove', this.draggable, { passive: false })
    document.removeEventListener('touchend', this.dragEnd, { passive: true })
    document.removeEventListener('mousedown', this.dragStart, { passive: false })
    document.removeEventListener('mousemove', this.draggable, { passive: false })
    document.removeEventListener('mouseup', this.dragEnd, { passive: true })
    document.removeEventListener('transitionend', this.transitionEnd, { passive: true })
  }

  render () {
    if (this.props.flickrData.images.length > 0) {
      const myActiveIndex = this.state.activeIndex
      return (
        <div className='section-container'>
          <div className='carousel-container'>
            <CarouselSliderArrow
              direction='left'
              clickFunction={ this.previousImage }
              glyph='&#9664;' />
            { this.props.flickrData.images.map((image, i) => (
              <CarouselSliderImage
                key={image.id}
                direction={this.state.direction}
                activeIndex={myActiveIndex} index={i}
                imagesLength={this.props.flickrData.images.length}
                image={image}
                size={this.props.flickrData.flickrSize} />
            ))}
            <CarouselSliderArrow
              direction='right'
              clickFunction={ this.nextImage }
              glyph='&#9654;' />
            <CarouselSliderDetails
              index={this.state.activeIndex + 1}
              length={this.props.flickrData.images.length}
              image={this.props.flickrData.images[myActiveIndex]} />
          </div>
        </div>
      )
    } else {
      return (
        <div className='carousel'></div>
      )
    }
  }
}

/* ========== CAROUSEL SLIDER IMAGE ========== */
export class CarouselSliderImage extends Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    imagesLength: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.myImage = React.createRef()
    this.state = {
    }
  }

  render () {
    const myImg = this.props.image
    const myZindex = this.props.imagesLength - this.props.index
    const styles = {
      zIndex: myZindex /* ,
      left: '0px' */
    }

    // if (this.props.direction === 'next') {
    /* Use transition all instead of transform to affect left property */
    styles.transition = 'all 1.0s ease 0.1s' /* ease-in */
    // } else if (this.props.direction === 'prev') {
    // styles.transition = 'all 1.0s ease 0.1s'; /* ease-out */
    // }
    if (this.props.index > this.props.activeIndex) {
      styles.transform = tx100
      /* styles.msTransform = tx100;
      styles.WebkitTransform = tx100; */
    } else if (this.props.index === this.props.activeIndex) {
      styles.transform = tx0
      /* styles.msTransform = tx0;
      styles.WebkitTransform = tx0; */
    } else if (this.props.index < this.props.activeIndex) {
      styles.transform = txn100
      /* styles.msTransform = txn100;
      styles.WebkitTransform = txn100; */
    }

    return (
      <div id={'c-' + myImg.id} className='carousel-slider-container' style={styles} draggable='true'>
        <img className='carousel-slider-image' draggable='false'
          src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server + '/' + myImg.id + '_' + myImg.secret + this.props.size + '.jpg'}
          id={myImg.id} alt={myImg.title} title={myImg.title} />
      </div>
    )
  }
}

/* ========== CAROUSEL SLIDER DETAILS ========== */
export class CarouselSliderDetails extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='carousel-slider-details text-outline-halo'>
        {this.props.index} of {this.props.length} - {this.props.image.title} <br/>
        by {this.props.image.ownername} on {this.props.image.datetaken}
      </div>
    )
  }
}

/* ========== CAROUSEL SLIDER ARROW ========== */
export class CarouselSliderArrow extends Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
    clickFunction: PropTypes.func.isRequired,
    glyph: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={'carousel-arrow text-outline-halo ' + this.props.direction}
        onClick={ this.props.clickFunction }>
        { this.props.glyph }
      </div>
    )
  }
}

/* ========== CAROUSEL HERO ========== */
export class CarouselHero extends Component {
  static propTypes = {
    flickrData: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.debug = false
    this.state = {
      activeIndex: 0,
      direction: 'up',
      timeout: 5000
    }
    if (this.props.flickrData) {
      this.state = mergeDeep(this.state, this.props.flickrData)
    }
  }

  nextImage = () => {
    if (this.state.activeIndex === this.props.flickrData.images.length - 1) {
      this.setState({ activeIndex: 0, direction: (this.state.direction === 'up' ? 'down' : 'up') })
    } else {
      this.setState({ activeIndex: this.state.activeIndex + 1, direction: (this.state.direction === 'up' ? 'down' : 'up') })
    }
  }

  render () {
    if (this.props.flickrData.images.length > 0) {
      if (this.state.timeout > 0) {
        setTimeout(function () {
          this.nextImage()
        }
          .bind(this),
        this.state.timeout)
      }

      return (
        <Fragment >
          { this.props.flickrData.images.map((image, i) => (
            <CarouselHeroImage
              key={image.id}
              direction={this.state.direction}
              activeIndex={this.state.activeIndex}
              index={i}
              imagesLength={this.props.flickrData.images.length}
              image={image}
              size={this.props.flickrData.flickrSize} />
          ))}
          <CarouselHeroDetails
            index={this.state.activeIndex + 1}
            length={this.props.flickrData.images.length}
            image={this.props.flickrData.images[this.state.activeIndex]} />
        </Fragment>
      )
    } else {
      return (
        <div className='carousel'></div>
      )
    }
  }
}

/* ========== CAROUSEL HERO IMAGE ========== */
export class CarouselHeroImage extends Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    imagesLength: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired
  }

  render () {
    const myImg = this.props.image
    const myZindex = this.props.imagesLength - this.props.index
    const styles = {
      zIndex: myZindex
    }
    let classes = 'carousel-hero-image'

    if (this.props.index > this.props.activeIndex) {
      classes += ' carousel-hero-hidden'
    } else if (this.props.index === this.props.activeIndex - 1) {
      classes += ' carousel-hero-hide'
    } else if (this.props.index === this.props.activeIndex) {
      classes += ' carousel-hero-visible'
    } else if (this.props.index < this.props.activeIndex) {
      classes += ' carousel-hero-hidden'
    }

    return (
      <img className={classes}
        style={styles}
        src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server + '/' + myImg.id + '_' + myImg.secret + this.props.size + '.jpg'}
        alt={myImg.title}
        title={myImg.title} />
    )
  }
}

/* ========== CAROUSEL HERO DETAILS ========== */
export class CarouselHeroDetails extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='section-container'>
        <div className='carousel-hero-details text-outline-halo'>
          <div className='carousel-hero-details-left'>
            <div>{this.props.index} of {this.props.length}</div>
            <div>{this.props.image.title}</div>
          </div>
          <div className='carousel-hero-details-right'>
            <div>by {this.props.image.ownername}</div>
            <div>{this.props.image.datetaken}</div>
          </div>
        </div>
      </div>
    )
  }
}
