"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

const PropertyGallery = ({ data }) => {
  // Ensure data.images is defined and is an array
  const images = Array.isArray(data.images) ? data.images : [data.image];

  // Limit the number of displayed images to 4
  const displayedImages = images.slice(0, 4);

  // Hidden images are those not displayed
  const hiddenImages = images.slice(4);

  return (
    <Gallery>
      <div className="row">
        {displayedImages.length === 1 ? (
          <div className="col-sm-12">
            <div className="sp-img-content mb15-md">
              <div className="popup-img preview-img-1 sp-img">
                <Item
                  original={images[0]}
                  thumbnail={images[0]}
                  width={890}
                  height={510}
                >
                  {({ ref, open }) => (
                    <Image
                      src={images[0]}
                      width={890}
                      height={510}
                      ref={ref}
                      onClick={open}
                      alt={data.title}
                      role="button"
                      className="w-100 h-100 cover"
                    />
                  )}
                </Item>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="col-sm-9">
              <div className="sp-img-content mb15-md">
                <div className="popup-img preview-img-1 sp-img">
                  <Item
                    original={images[0]}
                    thumbnail={images[0]}
                    width={890}
                    height={510}
                  >
                    {({ ref, open }) => (
                      <Image
                        src={images[0]}
                        width={890}
                        height={510}
                        ref={ref}
                        onClick={open}
                        alt={data.title}
                        role="button"
                        className="w-100 h-100 cover"
                      />
                    )}
                  </Item>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row">
                {displayedImages.slice(1).map((image, index) => (
                  <div className="col-sm-12 ps-lg-0" key={index}>
                    <div className="sp-img-content">
                      <div
                        className={`popup-img preview-img-${index + 2} sp-img mb10`}
                      >
                        <Item
                          original={image}
                          thumbnail={image}
                          width={890}
                          height={510}
                        >
                          {({ ref, open }) => (
                            <Image
                              width={270}
                              height={250}
                              className="w-100 h-100 cover"
                              ref={ref}
                              onClick={open}
                              role="button"
                              src={image}
                              alt={`${data.title} - ${index + 2}`}
                            />
                          )}
                        </Item>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add only hidden images to the gallery to avoid duplication */}
      {hiddenImages.map((image, index) => (
        <Item
          key={index}
          original={image}
          thumbnail={image}
          width={890}
          height={510}
        >
          {({ ref, open }) => (
            <Image
              src={image}
              width={1}
              height={1}
              ref={ref}
              onClick={open}
              alt={`${data.title} - ${index + 5}`}
              style={{ display: 'none' }}
            />
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default PropertyGallery;
