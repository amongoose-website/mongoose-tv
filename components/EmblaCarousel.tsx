import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { PrevButton, NextButton } from './EmblaCarouselButtons';
import VideoThumbnail, { DvdThumbnail } from './VideoThumbnail'

const EmblaCarousel = (
    { items, template, className }: {
        items: any,
        template: typeof VideoThumbnail | typeof DvdThumbnail,
        className: string
    }
) => {
    const MyTemplate = template
    const [viewportRef, embla] = useEmblaCarousel({ 
        containScroll: "trimSnaps",
        dragFree: true,
        slidesToScroll: 2
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<any>([]);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback((index: any) => embla && embla.scrollTo(index), [
      embla
    ]);

    const onSelect = useCallback(() => {
      if (!embla) return;
      setSelectedIndex(embla.selectedScrollSnap());
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    }, [embla, setSelectedIndex]);

    useEffect(() => {
      if (!embla) return;
      onSelect();
      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
    }, [embla, setScrollSnaps, onSelect]);

    if (items.length === 1) {
        for (let i = 0; i <= 10; i++) {
            items.push(items[0])
        }
    }

    return (
      <>
        <div className={`${className} embla`}>
          <div className='embla__viewport' ref={viewportRef}>
            <div className='embla__container'>
              {items.map((item: any, i: number) => ( <>
              
                { item.hasOwnProperty('isDvd') && <>
                  <MyTemplate key={i} video={item} />
                </>}
                {
                  !item.hasOwnProperty('isDvd') && <>
                    <MyTemplate key={i} dvd={item} />
                  </>
                }
              
              </>))}
            </div>
          </div>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </>
    );
};

export default EmblaCarousel;
