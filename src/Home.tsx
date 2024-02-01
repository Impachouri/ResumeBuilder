import { useAnimate } from "framer-motion";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={30}
      rotationRange={35}
      images={[
        "photos/image1.jpg",
        "photos/image2.jpg",
        "photos/image3.jpg",
        "photos/image4.jpg",
        "photos/image5.jpg",
        "photos/image6.jpg",
        "photos/image7.jpg",
        "photos/image8.jpg",
        "photos/image9.jpg",
        "photos/image10.jpg",
      ]}
    >
    <div className="relative w-full h-screen flex flex-col items-center">
      <div className=" text-[#CBD5E1] h-screen font-black text-[150px] leading-none whitespace-nowrap">
        <div className="h-[25vh]">
          <span className="inline-block animate-textScrolling">Elevate Transform&nbsp;</span>
          <span className="inline-block animate-textScrolling">Achieve Succeed&nbsp;</span>
        </div>
        <div className="h-[25vh]">
          <span className="inline-block animate-textScrollingReverse">Shine Impress&nbsp;</span>
          <span className="inline-block animate-textScrollingReverse">Build Craft&nbsp;</span>
        </div>
        <div className="h-[25vh]">
          <span className="inline-block animate-textScrolling">Accelerate Excel&nbsp;</span>
          <span className="inline-block animate-textScrolling">Dynamic Advance&nbsp;</span>
        </div>
        <div className="h-[25vh]">
          <span className="inline-block animate-textScrollingReverse">Professionalism Strive&nbsp;</span>
          <span className="inline-block animate-textScrollingReverse">Master Rise&nbsp;</span>
        </div>
      </div>
      <div className="absolute top-[35%] left-0  text-black text-[80px] font-black ">
        <span>Building Resumes</span><br/>
        <span>Building <span className="text-primary">Future</span>
        </span>
      </div>
  `</div>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}: {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector) as HTMLElement;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.3, delay: 2 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-10 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={uuidv4()}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default Home;

// images={[
//     "photos/image1.jpg",
//     "Images/1654105836844.jpg",
//     "Images/1654105836854.jpg",
//     "Images/1654105836865.jpg",
//     "Images/1654105836875.jpg",
//     "Images/1654105836918.jpg",
//     "Images/1654105836929.jpg",
//     "Images/1654105836941.jpg",
//     "Images/1654105836951.jpg",
//     "Images/1654105836961.jpg",
//     "Images/1654105836972.jpg",
//     "Images/1654105836982.jpg",
//     "Images/1654105837002.jpg",
//     "Images/1654105837034.jpg",
//     "Images/1654105837055.jpg",
//     "Images/1654105837065.jpg",
//     "Images/1654105837076.jpg",
//     "Images/1654105837086.jpg",
//     "Images/1654105837097.jpg",
//     "Images/1654105837107.jpg",
//     "Images/1654105837065.jpg",
//     "Images/1654105837118.jpg",
//     "Images/1654105837128.jpg",
//     "Images/1654105837139.jpg",
//     "Images/1654105837150.jpg",
//     "Images/1654105837192.jpg"
//   ]}


//     <div class="relative flex overflow-x-hidden">
//   <div class="py-12 animate-marquee whitespace-nowrap">
//     <span class="text-4xl mx-4">Marquee Item 1</span>
//     <span class="text-4xl mx-4">Marquee Item 2</span>
//     <span class="text-4xl mx-4">Marquee Item 3</span>
//     <span class="text-4xl mx-4">Marquee Item 4</span>
//     <span class="text-4xl mx-4">Marquee Item 5</span>
//   </div>

//   <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
//     <span class="text-4xl mx-4">Marquee Item 1</span>
//     <span class="text-4xl mx-4">Marquee Item 2</span>
//     <span class="text-4xl mx-4">Marquee Item 3</span>
//     <span class="text-4xl mx-4">Marquee Item 4</span>
//     <span class="text-4xl mx-4">Marquee Item 5</span>
//   </div>
// </div>