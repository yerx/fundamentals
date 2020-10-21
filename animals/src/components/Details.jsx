import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  state = { loading: true };

  componentDidMount() {
    // adding an error to test Error Boundary component
    // throw new Error("lol");
    // eslint-disable-next-line
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    // grab media from this.state
    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`} </h2>
          <ThemeContext.Consumer>
            {/* to use Context inside of a class use .Consumer and wrap it inside a function */}
            {([theme]) => (
              // use destructuring to pull the theme out of the themeHook array
              // alt. would be (themeHook) => { <button style={{backgroundColor: themeHook[0]}}} at 0 index to grab the first item which is theme, which is the state
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

/*
 * to use error boundary, it needs to wrap around the Details component
 * use the spread ...props to pass all the props to the children components
 */
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
