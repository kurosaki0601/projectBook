
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import img1 from "../assets/images/00314427-1920x533.webp"
import img2 from "../assets/images/00314925-1920x533.webp"
import img3 from "../assets/images/00315882-1920x533.webp"




const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}
const slideImages = [
  {
    url: img1  },
  {
    url: img2
    
  },
  {
    url: img3
  },
];

const SlideShow = () => {
    return (
      <div className="slide-container">
        <Slide duration={2500}>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
               
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}
export default SlideShow;