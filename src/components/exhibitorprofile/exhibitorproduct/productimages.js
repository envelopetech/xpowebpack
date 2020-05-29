import React, { Component } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {customPopUp} from '../../../shared/utility'

// const photos = [
//   {
//     src: "https://source.unsplash.com/2ShvY8Lf6l0",
//     width: 4,
//     height: 3
//   },
//   {
//     src: "https://source.unsplash.com/Dm-qxdynoEc",
//     width: 1,
//     height: 1
//   },
//   {
//     src: "https://source.unsplash.com/qDkso9nvCg0",
//     width: 3,
//     height: 4
//   },
//   {
//     src: "https://source.unsplash.com/iecJiKe_RNg",
//     width: 3,
//     height: 4
//   },
//   {
//     src: "https://source.unsplash.com/epcsn8Ed8kY",
//     width: 3,
//     height: 4
//   },
//   {
//     src: "https://source.unsplash.com/NQSWvyVRIJk",
//     width: 4,
//     height: 3
//   },
//   {
//     src: "https://source.unsplash.com/zh7GEuORbUw",
//     width: 3,
//     height: 4
//   },
//   {
//     src: "https://source.unsplash.com/PpOHJezOalU",
//     width: 4,
//     height: 3
//   },
//   {
//     src: "https://source.unsplash.com/I1ASdgphUH4",
//     width: 4,
//     height: 3
//   }
// ];
export default class productimages extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      viewerIsOpen: false,
      currentImage: 0
    }
  }
  openLightbox = (event, { photo, index }) => {
    this.setState({ viewerIsOpen: true, currentImage: index });
  }
  closeLightbox = () => {
    this.setState({ currentImage: 0, viewerIsOpen: false });
  }
  render() {
    let list = [];
    let finaldata = []
    list = this.props.imagedata;
    if (list.length > 0) {
      list.map((item, i) => {
        let myobj1 = {};
        myobj1 = {
          "src": item.product_pic_url,
          "sizes": ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
          "width": 1,
          "height": 1
        }
        return (
          finaldata.push(myobj1)
        )
      })
    }
    return (
      <div>
        <Gallery photos={finaldata} onClick={this.openLightbox} />
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox} styles={customPopUp}>
              <Carousel
                currentIndex={this.state.currentImage}
                views={finaldata.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}    