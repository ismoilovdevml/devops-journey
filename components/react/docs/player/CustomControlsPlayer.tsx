// import {
//   ControlsContainer,
//   PictureInPictureButton,
//   PlayButton,
//   Poster,
//   Progress,
//   TimeDisplay,
//   Title,
//   Volume,
// } from '@livepeer/react';

// import Image from 'next/image';

// import { DocsDemoPlayer } from './DocsDemoPlayer';
// import blenderPoster from '../../../../public/images/blender-poster-2.png';

// const PosterImage = () => {
//   return <Image src={blenderPoster} layout="fill" objectFit="cover" />;
// };

// const title = 'Agent 327: Operation Barbershop';

// export const CustomControlsPlayer = () => {
//   return (
//     <DocsDemoPlayer title={title} playbackId="f5eese9wwl88k4g8">
//       <ControlsContainer
//         poster={<Poster content={<PosterImage />} title={title} />}
//         top={<Title content={title} />}
//         middle={<Progress />}
//         left={
//           <>
//             <PlayButton />
//             <Volume showSlider={false} />
//             <TimeDisplay />
//           </>
//         }
//         right={<PictureInPictureButton />}
//       />
//     </DocsDemoPlayer>
//   );
// };
