import React from "react";

export default class Carousel extends React.Component {
  state = {
    photos: [],
    // set default to 0, the first item in the array
    active: 0,
  };

  // the parent component is going to pass a lot of different size // photos small, medium, large. We only want the large photos.
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      // if there are photos in the media object, only grab the large photos
      // now photos will be an array of strings of urls
      photos = media.map(({ large }) => large);
    }
    // return whatever object you want to be emrged into the state
    return { photos };
    /*
     * another option is to go down to the img element and chnage
     * media.map to this.props.media.map
     * change key={photo} to key={photo.large}
     * change src={photo} to src={photo.large}
     */
  }

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleClick}
              // if someone clicks on the image, pull off the index
              data-index={index}
              src={photo}
              // if the index is equal to the active class then set it to active
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
